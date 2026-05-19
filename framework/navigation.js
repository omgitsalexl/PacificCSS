const DESKTOP_MEDIA_QUERY = "(min-width: 781px)";
const PANEL_TRANSITION_MS = 220;
const CLOSE_DELAY_MS = 120;

class NavigationMenu {
  constructor(root) {
    this.root = root;
    this.dropdown = root.querySelector("[data-nav-dropdown]");
    this.dropdownInner = root.querySelector("[data-nav-dropdown-inner]");
    this.triggers = Array.from(root.querySelectorAll("[data-nav-trigger]"));
    this.panels = new Map();
    this.mobilePanels = new Map();
    this.desktopMedia = window.matchMedia(DESKTOP_MEDIA_QUERY);
    this.activeTrigger = null;
    this.activePanel = null;
    this.closeTimer = null;
    this.panelTimer = null;
    this.hideDropdownTimer = null;

    if (!this.dropdown || !this.dropdownInner || this.triggers.length === 0) {
      return;
    }

    this.handleDocumentPointerDown = this.handleDocumentPointerDown.bind(this);
    this.handleDocumentKeydown = this.handleDocumentKeydown.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);

    this.setupPanels();
    this.attachEvents();
    this.root.dataset.navigationReady = "true";
  }

  setupPanels() {
    this.triggers.forEach((trigger) => {
      const panelId = trigger.getAttribute("data-nav-panel");
      const panel = panelId ? this.root.querySelector(`#${panelId}`) : null;
      const mobilePanel = trigger.parentElement?.querySelector(".nav-mobile-panel") || null;

      if (panel) {
        panel.hidden = true;
        panel.setAttribute("role", "region");
        panel.setAttribute("aria-label", trigger.textContent.trim());
        this.panels.set(trigger, panel);
      }

      if (mobilePanel) {
        mobilePanel.hidden = true;
        this.mobilePanels.set(trigger, mobilePanel);
      }

      trigger.setAttribute("aria-expanded", "false");
    });
  }

  attachEvents() {
    this.triggers.forEach((trigger) => {
      trigger.addEventListener("mouseenter", () => {
        if (!this.isDesktop()) {
          return;
        }

        this.openDesktopPanel(trigger);
      });

      trigger.addEventListener("focus", () => {
        if (!this.isDesktop()) {
          return;
        }

        this.openDesktopPanel(trigger);
      });

      trigger.addEventListener("click", (event) => {
        if (this.isDesktop()) {
          event.preventDefault();

          if (this.activeTrigger === trigger && this.root.classList.contains("is-open")) {
            this.closeDesktop();
            return;
          }

          this.openDesktopPanel(trigger);
          return;
        }

        event.preventDefault();
        this.toggleMobilePanel(trigger);
      });
    });

    this.root.addEventListener("mouseenter", () => this.clearCloseTimer());
    this.root.addEventListener("mouseleave", () => {
      if (!this.isDesktop()) {
        return;
      }

      this.scheduleClose();
    });
    this.root.addEventListener("focusout", this.handleFocusOut);
    document.addEventListener("pointerdown", this.handleDocumentPointerDown);
    document.addEventListener("keydown", this.handleDocumentKeydown);

    if (typeof this.desktopMedia.addEventListener === "function") {
      this.desktopMedia.addEventListener("change", this.handleMediaChange);
    } else if (typeof this.desktopMedia.addListener === "function") {
      this.desktopMedia.addListener(this.handleMediaChange);
    }
  }

  isDesktop() {
    return this.desktopMedia.matches;
  }

  handleFocusOut() {
    window.setTimeout(() => {
      if (!this.root.contains(document.activeElement)) {
        this.closeDesktop();
      }
    }, 0);
  }

  handleDocumentPointerDown(event) {
    if (this.root.contains(event.target)) {
      return;
    }

    this.closeDesktop({ immediate: true });
    this.closeMobilePanels();
  }

  handleDocumentKeydown(event) {
    if (event.key !== "Escape") {
      return;
    }

    if (this.isDesktop() && this.root.classList.contains("is-open")) {
      event.preventDefault();
      const triggerToFocus = this.activeTrigger;
      this.closeDesktop({ immediate: true });

      if (triggerToFocus) {
        triggerToFocus.focus();
      }
      return;
    }

    if (!this.isDesktop()) {
      const expandedTrigger = this.triggers.find((trigger) => trigger.getAttribute("aria-expanded") === "true");

      if (expandedTrigger) {
        event.preventDefault();
        this.toggleMobilePanel(expandedTrigger, false);
        expandedTrigger.focus();
      }
    }
  }

  handleMediaChange() {
    if (this.isDesktop()) {
      this.closeMobilePanels();
      return;
    }

    this.closeDesktop({ immediate: true });
  }

  scheduleClose() {
    this.clearCloseTimer();
    this.closeTimer = window.setTimeout(() => this.closeDesktop(), CLOSE_DELAY_MS);
  }

  clearCloseTimer() {
    if (this.closeTimer) {
      window.clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  syncExpandedStates(activeTrigger = null) {
    this.triggers.forEach((trigger) => {
      trigger.setAttribute("aria-expanded", trigger === activeTrigger ? "true" : "false");
    });
  }

  openDesktopPanel(trigger) {
    const nextPanel = this.panels.get(trigger);

    if (!nextPanel) {
      return;
    }

    this.clearCloseTimer();

    if (this.hideDropdownTimer) {
      window.clearTimeout(this.hideDropdownTimer);
      this.hideDropdownTimer = null;
    }

    this.dropdown.hidden = false;
    this.root.classList.add("is-open");
    this.syncExpandedStates(trigger);

    if (this.activePanel === nextPanel) {
      this.activeTrigger = trigger;
      return;
    }

    if (this.panelTimer) {
      window.clearTimeout(this.panelTimer);
      this.panelTimer = null;
    }

    const previousPanel = this.activePanel;

    this.panels.forEach((panel) => {
      if (panel !== previousPanel && panel !== nextPanel) {
        panel.hidden = true;
        panel.classList.remove("is-active", "is-entering", "is-leaving");
      }
    });

    nextPanel.hidden = false;
    nextPanel.classList.remove("is-leaving");
    nextPanel.classList.add("is-entering");

    if (previousPanel) {
      previousPanel.hidden = false;
      previousPanel.classList.remove("is-active", "is-entering");
      previousPanel.classList.add("is-leaving");
    }

    this.activeTrigger = trigger;
    this.activePanel = nextPanel;

    window.requestAnimationFrame(() => {
      nextPanel.classList.add("is-active");
    });

    this.panelTimer = window.setTimeout(() => {
      nextPanel.classList.remove("is-entering");

      if (previousPanel && previousPanel !== nextPanel) {
        previousPanel.hidden = true;
        previousPanel.classList.remove("is-leaving");
      }
    }, PANEL_TRANSITION_MS);
  }

  closeDesktop(options = {}) {
    const { immediate = false } = options;

    this.clearCloseTimer();
    this.syncExpandedStates(null);
    this.root.classList.remove("is-open");

    if (this.panelTimer) {
      window.clearTimeout(this.panelTimer);
      this.panelTimer = null;
    }

    if (this.hideDropdownTimer) {
      window.clearTimeout(this.hideDropdownTimer);
    }

    const finishClose = () => {
      this.dropdown.hidden = true;

      this.panels.forEach((panel) => {
        if (panel !== this.activePanel) {
          panel.hidden = true;
        }

        panel.classList.remove("is-entering", "is-leaving");
      });
    };

    if (immediate) {
      finishClose();
    } else {
      this.hideDropdownTimer = window.setTimeout(finishClose, PANEL_TRANSITION_MS);
    }

    this.activeTrigger = null;
  }

  toggleMobilePanel(trigger, shouldOpen = null) {
    const panel = this.mobilePanels.get(trigger);

    if (!panel) {
      return;
    }

    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    const nextState = shouldOpen === null ? !isOpen : shouldOpen;

    this.triggers.forEach((itemTrigger) => {
      const itemPanel = this.mobilePanels.get(itemTrigger);
      const isTarget = itemTrigger === trigger;

      itemTrigger.setAttribute("aria-expanded", isTarget && nextState ? "true" : "false");

      if (!itemPanel) {
        return;
      }

      const panelShouldOpen = isTarget && nextState;
      itemPanel.hidden = !panelShouldOpen;
      itemPanel.classList.toggle("is-open", panelShouldOpen);
    });
  }

  closeMobilePanels() {
    this.triggers.forEach((trigger) => {
      const panel = this.mobilePanels.get(trigger);

      trigger.setAttribute("aria-expanded", "false");

      if (!panel) {
        return;
      }

      panel.hidden = true;
      panel.classList.remove("is-open");
    });
  }
}

document.querySelectorAll("[data-navigation]").forEach((root) => {
  new NavigationMenu(root);
});
