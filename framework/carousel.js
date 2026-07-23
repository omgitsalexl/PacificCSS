const DEFAULT_AUTOPLAY_DURATION = 6150;
const VIEWPORT_THRESHOLD = 0.6;

let carouselCount = 0;

class HighlightsCarousel {
  constructor(root) {
    this.root = root;
    this.panels = root.querySelector("[data-highlights-panels]");
    this.slides = Array.from(root.querySelectorAll("[data-highlights-slide]"));
    this.controls = root.querySelector("[data-highlights-controls]");
    this.nav = root.querySelector("[data-highlights-nav]");
    this.toggleButton = root.querySelector("[data-highlights-toggle]");
    this.instanceId = `highlights-carousel-${++carouselCount}`;
    this.autoplayDuration = this.readDuration();
    this.currentIndex = 0;
    this.progress = 0;
    this.isPlaying = false;
    this.isEnded = false;
    this.userPaused = false;
    this.isInView = false;
    this.isTransitioning = false;
    this.autoplayFrame = null;
    this.autoplayTimeout = null;
    this.autoplayStartedAt = 0;
    this.pendingMediaPromise = null;
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.generatedTabs = [];

    if (!this.panels || !this.controls || !this.nav || !this.toggleButton || this.slides.length === 0) {
      return;
    }

    this.root.style.setProperty("--highlights-count", String(this.slides.length));
    this.syncRootState();

    this.handleIntersection = this.handleIntersection.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleReducedMotionChange = this.handleReducedMotionChange.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleTabKeydown = this.handleTabKeydown.bind(this);

    this.setupStructure();
    this.renderSlide(0, { resetProgress: true });
    this.root.dataset.highlightsCarouselReady = "true";
    this.attachEvents();
    this.setupObserver();
  }

  readDuration() {
    const authoredValue = Number(this.root.getAttribute("data-autoplay-duration"));

    if (Number.isFinite(authoredValue) && authoredValue > 0) {
      return authoredValue;
    }

    return DEFAULT_AUTOPLAY_DURATION;
  }

  setupStructure() {
    this.root.setAttribute("role", "region");

    if (!this.root.hasAttribute("aria-label")) {
      this.root.setAttribute("aria-label", "Highlights carousel");
    }

    this.nav.setAttribute("role", "tablist");
    this.nav.setAttribute("aria-label", this.root.getAttribute("aria-label"));
    this.nav.setAttribute("aria-orientation", "horizontal");

    this.toggleButton.type = "button";
    this.toggleButton.classList.add("highlights-carousel-toggle-button");
    this.toggleButton.innerHTML = `
      <span class="highlights-carousel-toggle-icon highlights-carousel-toggle-icon-play" aria-hidden="true">
        <svg viewBox="0 0 56 56" focusable="false">
          <path d="m23.76 36.62c.45 0 .86-.13 1.42-.46l10.92-6.33c.86-.5 1.36-1.02 1.36-1.84 0-.81-.5-1.33-1.36-1.83l-10.92-6.33c-.56-.33-.97-.47-1.42-.47-.93 0-1.76.72-1.76 1.95v13.36c0 1.23.82 1.95 1.76 1.95z"></path>
        </svg>
      </span>
      <span class="highlights-carousel-toggle-icon highlights-carousel-toggle-icon-pause" aria-hidden="true">
        <svg viewBox="0 0 56 56" focusable="false">
          <path d="m21.73 36.67h2.53c1.15 0 1.73-.58 1.73-1.72v-13.9c0-1.12-.58-1.72-1.73-1.72h-2.53c-1.15 0-1.73.57-1.73 1.72v13.9c-.03 1.14.55 1.72 1.73 1.72zm10 0h2.53c1.15 0 1.73-.58 1.73-1.72v-13.9c0-1.12-.58-1.72-1.73-1.72h-2.53c-1.15 0-1.73.57-1.73 1.72v13.9c0 1.14.55 1.72 1.73 1.72z"></path>
        </svg>
      </span>
      <span class="highlights-carousel-toggle-icon highlights-carousel-toggle-icon-replay" aria-hidden="true">
        <svg viewBox="0 0 56 56" focusable="false">
          <path d="m36.24 26.64c-1.11 0-2.01.9-2.01 2.01 0 3.44-2.8 6.24-6.24 6.24s-6.24-2.8-6.24-6.24 2.8-6.24 6.24-6.24c.03 0 .05-.01.08-.01l-1.28 1.28c-.78.78-.78 2.05 0 2.84.39.39.9.59 1.42.59s1.03-.2 1.42-.59l4.44-4.44c.78-.78.78-2.05 0-2.84l-4.66-4.66c-.78-.78-2.05-.78-2.84 0-.78.78-.78 2.05 0 2.84l1 .99c-5.46.22-9.83 4.72-9.83 10.23 0 5.65 4.6 10.25 10.25 10.25s10.25-4.6 10.25-10.25c0-1.11-.9-2.01-2.01-2.01z"></path>
        </svg>
      </span>
    `;

    this.root.classList.toggle("is-reduced-motion", this.reducedMotion.matches);
    this.toggleButton.disabled = this.reducedMotion.matches;
    this.syncToggleLabel();
    this.buildTabs();
  }

  syncRootState() {
    this.root.classList.toggle("is-playing", this.isPlaying);
    this.root.classList.toggle("is-ended", this.isEnded);
    this.root.classList.toggle("is-paused", !this.isPlaying && !this.isEnded);
  }

  buildTabs() {
    this.nav.innerHTML = "";

    this.generatedTabs = this.slides.map((slide, index) => {
      const slideId = slide.id || `${this.instanceId}-panel-${index + 1}`;
      const tabId = `${this.instanceId}-tab-${index + 1}`;
      const label =
        slide.getAttribute("data-highlights-label") ||
        slide.getAttribute("aria-label") ||
        `Slide ${index + 1}`;

      slide.id = slideId;
      slide.setAttribute("role", "tabpanel");
      slide.setAttribute("aria-labelledby", tabId);
      slide.setAttribute("tabindex", index === 0 ? "0" : "-1");
      slide.setAttribute("aria-hidden", index === 0 ? "false" : "true");
      slide.toggleAttribute("inert", index !== 0);

      const button = document.createElement("button");
      button.type = "button";
      button.id = tabId;
      button.className = "highlights-carousel-tab";
      button.setAttribute("role", "tab");
      button.setAttribute("aria-controls", slideId);
      button.setAttribute("aria-selected", index === 0 ? "true" : "false");
      button.setAttribute("tabindex", index === 0 ? "0" : "-1");
      button.dataset.highlightsIndex = String(index);
      button.innerHTML = `
        <span class="sr-only">${label}</span>
        <span class="highlights-carousel-tab-track" aria-hidden="true">
          <span class="highlights-carousel-tab-fill"></span>
        </span>
      `;

      button.addEventListener("click", () => {
        this.userPaused = true;
        this.goTo(index, { userInitiated: true, focusTab: false });
      });

      this.nav.appendChild(button);
      return button;
    });
  }

  attachEvents() {
    this.toggleButton.addEventListener("click", this.handleToggleClick);
    this.nav.addEventListener("keydown", this.handleTabKeydown);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);

    if (typeof this.reducedMotion.addEventListener === "function") {
      this.reducedMotion.addEventListener("change", this.handleReducedMotionChange);
    } else if (typeof this.reducedMotion.addListener === "function") {
      this.reducedMotion.addListener(this.handleReducedMotionChange);
    }
  }

  setupObserver() {
    if (this.reducedMotion.matches || typeof IntersectionObserver === "undefined") {
      this.isInView = true;
      return;
    }

    this.observer = new IntersectionObserver(this.handleIntersection, {
      threshold: VIEWPORT_THRESHOLD,
    });

    this.observer.observe(this.root);
  }

  handleIntersection(entries) {
    const entry = entries[0];

    if (!entry) {
      return;
    }

    this.isInView = entry.isIntersecting && entry.intersectionRatio >= VIEWPORT_THRESHOLD;

    if (this.isInView) {
      if (!this.userPaused && !this.isEnded) {
        this.play();
      }
    } else if (this.isPlaying) {
      this.pause({ userInitiated: false });
    }
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.pause({ userInitiated: false });
      return;
    }

    if (!this.reducedMotion.matches && this.isInView && !this.userPaused && !this.isEnded) {
      this.play();
    }
  }

  handleReducedMotionChange() {
    if (this.reducedMotion.matches) {
      this.pause({ userInitiated: false });
      this.userPaused = true;
      this.isEnded = false;
      this.syncRootState();
      this.root.classList.add("is-reduced-motion");
      this.toggleButton.disabled = true;
      this.syncToggleLabel();
      return;
    }

    this.root.classList.remove("is-reduced-motion");
    this.toggleButton.disabled = false;
    this.userPaused = false;

    if (this.isInView && !this.isEnded) {
      this.play();
    }
  }

  handleToggleClick() {
    if (this.reducedMotion.matches) {
      return;
    }

    if (this.isEnded) {
      this.replay();
      return;
    }

    if (this.isPlaying) {
      this.userPaused = true;
      this.pause({ userInitiated: true });
    } else {
      this.userPaused = false;
      this.play();
    }
  }

  handleTabKeydown(event) {
    const currentTab = event.target.closest("[role='tab']");

    if (!currentTab) {
      return;
    }

    let nextIndex = Number(currentTab.dataset.highlightsIndex);

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = Math.min(this.generatedTabs.length - 1, nextIndex + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = Math.max(0, nextIndex - 1);
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = this.generatedTabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    this.userPaused = true;
    this.goTo(nextIndex, { userInitiated: true, focusTab: true });
  }

  goTo(index, { userInitiated = false, focusTab = false, resetProgress = true } = {}) {
    const nextIndex = Math.max(0, Math.min(index, this.slides.length - 1));

    if (this.isTransitioning) {
      return;
    }

    this.isTransitioning = true;
    this.stopAutoplayClock();

    this.isEnded = false;
    this.syncRootState();
    this.currentIndex = nextIndex;
    this.renderSlide(nextIndex, { resetProgress });

    if (focusTab) {
      this.generatedTabs[nextIndex]?.focus();
    }

    if (userInitiated) {
      this.pause({ userInitiated: true });
    } else if (!this.reducedMotion.matches && this.isInView && !this.userPaused) {
      this.play();
    }

    this.isTransitioning = false;
  }

  renderSlide(activeIndex, { resetProgress = true } = {}) {
    this.slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("tabindex", isActive ? "0" : "-1");
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
      slide.toggleAttribute("inert", !isActive);
    });

    this.generatedTabs.forEach((button, index) => {
      const isActive = index === activeIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
      button.setAttribute("tabindex", isActive ? "0" : "-1");

      if (!isActive) {
        this.setTabProgress(button, 0);
      }
    });

    if (resetProgress) {
      this.progress = 0;
      this.setTabProgress(this.generatedTabs[activeIndex], 0);
    }

    this.syncToggleLabel();
  }

  play() {
    if (this.reducedMotion.matches || this.isPlaying || this.isEnded || !this.isInView) {
      return;
    }

    this.isPlaying = true;
    this.syncRootState();
    this.syncToggleLabel();
    this.startAutoplayClock();
  }

  pause({ userInitiated = false } = {}) {
    if (!this.isPlaying && !this.isEnded) {
      this.syncRootState();
      this.syncToggleLabel();
      return;
    }

    this.stopAutoplayClock();
    this.isPlaying = false;

    if (userInitiated) {
      this.userPaused = true;
    }

    this.syncRootState();
    this.syncToggleLabel();
  }

  replay() {
    this.userPaused = false;
    this.isEnded = false;
    this.syncRootState();
    this.goTo(0, { userInitiated: false, focusTab: false, resetProgress: true });
  }

  end() {
    this.stopAutoplayClock();
    this.isPlaying = false;
    this.isEnded = true;
    this.progress = 1;
    this.setTabProgress(this.generatedTabs[this.currentIndex], 1);
    this.syncRootState();
    this.syncToggleLabel();
  }

  startAutoplayClock() {
    this.stopAutoplayClock();

    const remaining = this.autoplayDuration * (1 - this.progress);
    const activeTab = this.generatedTabs[this.currentIndex];

    this.autoplayStartedAt = performance.now() - this.progress * this.autoplayDuration;

    const updateProgress = (now) => {
      if (!this.isPlaying) {
        return;
      }

      const elapsed = now - this.autoplayStartedAt;
      this.progress = Math.max(0, Math.min(elapsed / this.autoplayDuration, 1));
      this.setTabProgress(activeTab, this.progress);

      if (this.progress < 1) {
        this.autoplayFrame = window.requestAnimationFrame(updateProgress);
      }
    };

    this.autoplayFrame = window.requestAnimationFrame(updateProgress);
    this.autoplayTimeout = window.setTimeout(async () => {
      await this.handleAutoplayAdvance();
    }, remaining);
  }

  stopAutoplayClock() {
    if (this.autoplayFrame) {
      window.cancelAnimationFrame(this.autoplayFrame);
      this.autoplayFrame = null;
    }

    if (this.autoplayTimeout) {
      window.clearTimeout(this.autoplayTimeout);
      this.autoplayTimeout = null;
    }
  }

  async handleAutoplayAdvance() {
    if (!this.isPlaying) {
      return;
    }

    const mediaPromise = this.waitForActiveMedia();

    if (mediaPromise) {
      this.pendingMediaPromise = mediaPromise;
      await mediaPromise;
      this.pendingMediaPromise = null;
    }

    if (!this.isPlaying) {
      return;
    }

    if (this.currentIndex >= this.slides.length - 1) {
      this.end();
      return;
    }

    this.currentIndex += 1;
    this.renderSlide(this.currentIndex, { resetProgress: true });
    this.startAutoplayClock();
  }

  waitForActiveMedia() {
    const activeSlide = this.slides[this.currentIndex];

    if (!activeSlide || !activeSlide.hasAttribute("data-highlights-await-media")) {
      return null;
    }

    const media = activeSlide.querySelector("video, audio");

    if (!media || media.paused || media.ended) {
      return null;
    }

    return new Promise((resolve) => {
      const finish = () => {
        media.removeEventListener("ended", finish);
        media.removeEventListener("pause", finish);
        resolve();
      };

      media.addEventListener("ended", finish, { once: true });
      media.addEventListener("pause", finish, { once: true });
    });
  }

  setTabProgress(button, value) {
    if (!button) {
      return;
    }

    button.style.setProperty("--highlights-progress", String(value));
  }

  syncToggleLabel() {
    if (this.isEnded) {
      if (this.reducedMotion.matches) {
        this.toggleButton.setAttribute("aria-label", "Autoplay disabled because reduced motion is enabled");
        return;
      }

      this.toggleButton.setAttribute("aria-label", "Replay highlights gallery");
      return;
    }

    if (this.reducedMotion.matches) {
      this.toggleButton.setAttribute("aria-label", "Autoplay disabled because reduced motion is enabled");
      return;
    }

    if (this.isPlaying) {
      this.toggleButton.setAttribute("aria-label", "Pause highlights gallery");
      return;
    }

    this.toggleButton.setAttribute("aria-label", "Play highlights gallery");
  }
}

function initializeHighlightsCarousels() {
  const carousels = document.querySelectorAll("[data-highlights-carousel]");

  carousels.forEach((root) => {
    if (!root._highlightsCarousel) {
      root._highlightsCarousel = new HighlightsCarousel(root);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeHighlightsCarousels, { once: true });
} else {
  initializeHighlightsCarousels();
}
