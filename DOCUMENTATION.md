# PacificCSS Framework

## Purpose

PacificCSS is a light-first CSS system for building Apple-style editorial and product pages.

It is based on three recurring patterns from the reference pages:

- typography leads the design
- whitespace and soft contrast do most of the visual work
- gradients appear selectively and only to provide emphasis

The framework is intentionally simple. It avoids heavy abstractions, clever selectors, and overly decorative defaults.

## Files

- [`index.html`](/Users/omgitsalexl/Developer/Projects/Apple-like%20CSS%20Template/index.html) is the demo template
- [`framework/pacific.css`](/Users/omgitsalexl/Developer/Projects/Apple-like%20CSS%20Template/framework/pacific.css) is the framework stylesheet
- [`framework/navigation.css`](/Users/omgitsalexl/Developer/Projects/Apple-like%20CSS%20Template/framework/navigation.css) is the optional navigation stylesheet
- [`framework/navigation.js`](/Users/omgitsalexl/Developer/Projects/Apple-like%20CSS%20Template/framework/navigation.js) enhances the shared navigation dropdown and mobile accordion behavior
- [`framework/carousel.css`](/Users/omgitsalexl/Developer/Projects/Apple-like%20CSS%20Template/framework/carousel.css) is the optional carousel stylesheet
- [`framework/carousel.js`](/Users/omgitsalexl/Developer/Projects/Apple-like%20CSS%20Template/framework/carousel.js) auto-initializes the highlights carousel primitive
- [`DOCUMENTATION.md`](/Users/omgitsalexl/Developer/Projects/Apple-like%20CSS%20Template/DOCUMENTATION.md) is this guide

## Design Intent

The framework is meant for pages that should feel polished, spacious, and calm.

Use it when you want:

- large editorial headlines
- soft white and grey surfaces
- rounded cards with minimal shadow
- mixed-size content grids
- one or two moments of visual emphasis

Do not treat every section like a hero. The Apple-like feeling comes from restraint.

## CSS Structure

The core stylesheet is organized in this order:

1. tokens
2. reset and base styles
3. layout primitives
4. typography primitives
5. surfaces and cards
6. page composition patterns
7. buttons and links
8. optional highlight treatments
9. utilities
10. responsive rules

Navigation lives in its own optional stylesheet and script so pages that do not need the richer dropdown behavior can skip both files.

## Tokens

The `:root` block contains the design tokens.

### Colors

- `--color-background` sets the page background
- `--color-surface` and `--color-surface-muted` control light section tones
- `--color-text` and `--color-text-muted` define contrast
- `--color-border` keeps edges readable on pale surfaces
- borders are opt-in through the `bordered` utility rather than built into the default surfaces
- `--color-gradient-*` support reusable Apple-like mesh gradient presets

### Spacing

Use the `--space-*` scale for section padding, gaps, and card interiors. The larger sizes are important because the framework depends on whitespace.

The framework now exposes spacing through dedicated utility classes so layout primitives can stay focused on structure:

- `gap-1` through `gap-8` for spacing in both directions
- `gap-x-1` through `gap-x-8` for horizontal spacing only
- `gap-y-1` through `gap-y-8` for vertical spacing only
- `pad-1` through `pad-8` for padding on all sides
- `pad-x-1` through `pad-x-8` for horizontal padding only
- `pad-y-1` through `pad-y-8` for vertical padding only

### Radius

The `--radius-*` values are intentionally large. This helps cards feel Apple-like without relying on strong shadows.

### Type

The `--step-*` tokens define the type scale. Keep the display and title sizes prominent, and let the body copy stay quieter.

## Core Classes

### Layout

- `container`
- `section`
- `section-tight`
- `grid`
- `grid-2`
- `grid-3`
- `stack`

These are the foundation of the framework. Start with them before you add component-specific classes.

`grid` and `stack` no longer set spacing on their own. Pair them with a spacing utility so the breathing room is explicit in the markup.

### Spacing Utilities

- `gap-*`
- `gap-x-*`
- `gap-y-*`
- `pad-*`
- `pad-x-*`
- `pad-y-*`

Recommended use:

- use `gap-*` on `stack` and `grid` containers to control overall rhythm
- use `gap-x-*` and `gap-y-*` when columns and rows should not share the same spacing
- use `pad-*` on cards, sections, and wrappers when the default interior spacing needs to change without adding a new component class

### Typography

- `eyebrow`
- `display`
- `title`
- `lead`
- `body`
- `caption`

Recommended use:

- `display` for hero headlines
- `title` for section or card headings
- `lead` for the most important supporting paragraph
- `body` for standard copy
- `caption` for small context or metadata

### Surfaces

- `card`
- `card-large`
- `card-muted`
- `gradient-card`
- `bordered`
- `inverted`

Recommended use:

- use `card` as the default white surface
- use `card-large` when the content needs more visual weight
- use `card-muted` for soft grey sections inside a mostly white page
- use `gradient-card` with a gradient preset when a card needs a clearer color lift
- use `bordered` only when a card or section needs extra edge definition
- use `inverted` when a card or section needs the framework’s darker surface and lighter text treatment

### Composition

- `hero`
- `bento`
- `feature-grid`

These help create the overall page rhythm seen in the demo. They are intended for editorial layouts rather than app UI.

### Optional carousel primitive

- `highlights-carousel`

The highlights carousel is intentionally split out from the core framework so pages that do not use it can skip both its stylesheet and its JavaScript.

### Optional navigation primitive

- `navigation-shell`
- `nav`
- `nav-links`
- `nav-link`
- `nav-item`
- `nav-dropdown`

The navigation system is also intentionally split out from the core framework. Use it when the header needs a mix of direct links and grouped submenu content.

### Actions

- `button`
- `button-primary`
- `button-secondary`
- `button-blue`
- `button-green`
- `button-yellow`
- `button-red`
- `button-outline`
- `link-arrow`

Keep actions understated. On Apple-style pages, the typography and spacing should remain more prominent than the buttons.

Recommended use:

- pair `button` with one tone class for the default filled style
- add `button-outline` when you want the outlined version that fills on hover
- use `button-primary` for the strongest neutral action
- use `button-secondary` for a softer neutral action on light or inverted surfaces
- use the color variants only when the content genuinely benefits from the extra emphasis

### Optional emphasis

- `text-gradient`
- `gradient-section`
- `gradient-sky`
- `gradient-iris`
- `gradient-peach`
- `gradient-mint`
- `gradient-sunset`
- `gradient-berry`
- `glass`
- `glass-bar`
- `glass-pill`
- `glass-round`

Use a gradient preset together with an application class:

- `text-gradient gradient-sky`
- `gradient-card gradient-iris`
- `gradient-section gradient-mint`

Glass classes work the same way:

- `glass glass-bar bordered`
- `glass glass-pill bordered`
- `glass glass-round bordered`

## Recommended Starter Structure

This is the best starting point for a new page:

```html
<header class="site-header">
  <div class="container">
    <div class="navigation-shell" data-navigation>
      <div class="nav glass glass-bar bordered">
        ...
      </div>
    </div>
  </div>
</header>

<main>
  <section class="hero">
    <div class="container feature-grid">
      ...
    </div>
  </section>

  <section class="section">
    <div class="container stack gap-5">
      ...
    </div>
  </section>
</main>
```

This structure gives you:

- a quiet top area
- a typography-led opening
- a flexible interior layout
- enough room to add bento cards and muted sections later

## How to Build a Page

### 1. Start with whitespace

Lay out the page with `container`, `section`, and `stack`, then add a `gap-*` utility before thinking about accents.

### 2. Let type establish the hierarchy

Use one strong `display`, then step down to `title`, `lead`, and `body`. Avoid turning every heading into a hero headline.

### 3. Add surfaces deliberately

Use `card` as the base content block. Introduce `card-muted` and `gradient-card` only where they improve pacing or contrast.

If a layout needs clearer edge definition, add `bordered` explicitly rather than relying on default borders.

If a layout needs a darker break in rhythm, add `inverted` to the card or section instead of creating a separate dark component.

### 4. Use bento sections with mixed scale

The `bento` pattern works best when one card is clearly larger or more important than the others. Avoid making every cell feel equal.

### 5. Add gradients last

Apply a preset first, then the surface type:

- `text-gradient` for headings or short phrases
- `gradient-card` for a card background
- `gradient-section` for one full-width highlight section

Suggested presets:

- `gradient-sky` for the clearest Apple-like blue
- `gradient-iris` for a cooler purple accent
- `gradient-peach` for a warmer editorial accent
- `gradient-mint` for a fresh full-width background treatment
- `gradient-sunset` for the most vivid warm feature moment
- `gradient-berry` for a deeper premium contrast accent

If too many elements use gradients, the page stops feeling Apple-like.

### 6. Add glass sparingly

The frosted glass utilities are meant to be accents.

Good uses:

- sticky or floating header bars
- pricing pills
- compact round icon controls

Avoid using glass on every large card or every section. The effect is strongest when it appears only in a few focused places.

## Navigation

The optional navigation primitive supports two kinds of top-level items:

- plain links for direct destinations
- button triggers for grouped submenus

Load it only on pages that need richer navigation:

```html
<link rel="stylesheet" href="framework/navigation.css" />
<script src="framework/navigation.js"></script>
```

### Behavior

- desktop submenu panels open in one shared dropdown card below the main nav bar
- the shared dropdown uses `inverted` so it reads as a separate surface
- opening a submenu fades and settles the card into view
- switching between submenu triggers blends panel content instead of hard-cutting it
- mobile collapses into stacked accordion sections instead of a floating dropdown
- `Escape` closes the current submenu and returns focus to its trigger
- reduced-motion users get the same structure with minimal animation

### Markup contract

```html
<div class="navigation-shell" data-navigation>
  <div class="nav glass glass-bar bordered">
    <a class="nav-brand" href="#top">Brand</a>

    <nav class="nav-links" aria-label="Primary">
      <a class="nav-link" href="#overview">Overview</a>

      <div class="nav-item">
        <button
          class="nav-link nav-link-trigger"
          type="button"
          data-nav-trigger
          data-nav-panel="nav-panel-patterns"
          aria-expanded="false"
          aria-controls="nav-panel-patterns"
        >
          Patterns
        </button>

        <div class="nav-mobile-panel">
          <div class="nav-mobile-group">
            <p class="eyebrow">Layout</p>
            <a href="#patterns">Pattern overview</a>
            <a href="#spacing">Spacing rhythm</a>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <div class="nav-dropdown card card-large inverted bordered" data-nav-dropdown hidden>
    <div class="nav-dropdown-inner" data-nav-dropdown-inner>
      <section class="nav-dropdown-panel" id="nav-panel-patterns" data-nav-panel aria-label="Patterns">
        <div class="nav-dropdown-column">
          <p class="eyebrow">Layout</p>
          <a class="nav-dropdown-link nav-dropdown-link-primary" href="#patterns">Pattern overview</a>
          <a class="nav-dropdown-link" href="#spacing">Spacing rhythm</a>
        </div>
      </section>
    </div>
  </div>
</div>
```

### Authoring notes

- use a plain anchor when the top-level item goes directly to one place
- use a button trigger only when the extra grouping makes the navigation easier to scan
- keep submenu content to grouped lists of links with optional short supporting copy
- keep the mobile panel content aligned with the shared desktop dropdown content
- include one `data-nav-panel` section for each trigger
- keep the dropdown content width within the same `container` as the top bar

### Accessibility notes

- submenu parents are buttons, not placeholder links
- the script maintains `aria-expanded` on each trigger
- the desktop dropdown closes on outside interaction and `Escape`
- mobile accordion sections can be opened and closed with the same trigger buttons

## Mesh Gradient Notes

The gradient presets use stacked radial gradients over a pale base instead of a simple two-color linear blend.

That gives them a closer feel to the multi-point mesh gradients used in current Apple design examples:

- stronger focal color
- softer edges at the perimeter
- more movement across the surface
- better reuse across text, cards, and full-width sections

In practice, each preset should be treated like a reusable color family rather than a one-off effect.

## Highlights Carousel

The highlights carousel is a declarative primitive for Apple-style product highlight rails.

Load it only on pages that need it:

```html
<link rel="stylesheet" href="framework/carousel.css" />
<script src="framework/carousel.js"></script>
```

It is auto-initialized by `framework/carousel.js` and supports multiple instances on the same page.

### Behavior

- autoplay begins only when the carousel enters view
- active bullet expands into a pill and fills over roughly `6150ms` by default
- manual bullet selection pauses autoplay
- the control button switches between play, pause, and replay states
- autoplay ends on the last card instead of looping
- reduced-motion users get manual navigation instead of timed autoplay

### Markup contract

```html
<div class="highlights-carousel card card-large bordered" data-highlights-carousel aria-label="Product highlights gallery">
  <div class="highlights-carousel-rail glass glass-bar bordered pad-x-2 pad-y-1" data-highlights-controls>
    <div class="highlights-carousel-tablist" data-highlights-nav></div>
    <button data-highlights-toggle></button>
  </div>

  <div class="highlights-carousel-panels" data-highlights-panels>
    <article class="highlights-carousel-slide" data-highlights-slide data-highlights-label="Battery">
      <div class="highlights-demo-media">...</div>
      <div class="highlights-carousel-caption">
        <p class="eyebrow">Battery</p>
        <p class="highlights-carousel-copy">Up to 24 hours of battery life.</p>
      </div>
    </article>
  </div>
</div>
```

### Optional authored attributes

- `data-autoplay-duration="5200"` overrides the default dwell time for one carousel
- `data-highlights-label="Battery"` provides the accessible bullet label for a slide
- `data-highlights-await-media` on a slide tells the autoplay logic to wait for active `video` or `audio` media in that slide before advancing

### Authoring notes

- keep one authored slide per highlight
- always provide a clear `data-highlights-label`
- use the shared spacing utilities on `.highlights-carousel-rail` when the bullets or toggle need more interior breathing room
- use static media, inline video, or custom art inside each slide
- include the script on any page that uses the primitive

## Example

```html
<section class="section">
  <div class="container stack gap-5">
    <p class="eyebrow">Overview</p>
    <h2 class="title">A quiet section with clear hierarchy.</h2>
    <p class="lead">Let the layout and typography do most of the work.</p>

    <div class="grid grid-2 gap-5">
      <article class="card card-muted stack gap-4">
        <h3 class="title">Muted card</h3>
        <p class="body">Soft grey surfaces help break up long pages.</p>
      </article>

      <article class="card gradient-card gradient-sky stack gap-4">
        <h3 class="title">Highlighted card</h3>
        <p class="body">Use this only when the content deserves extra emphasis.</p>
      </article>

      <article class="card bordered stack gap-4">
        <h3 class="title">Bordered card</h3>
        <p class="body">Add a border only when the page benefits from that extra definition.</p>
      </article>

      <article class="card inverted stack gap-4">
        <h3 class="title">Inverted card</h3>
        <p class="body">Use the same content classes on a darker surface without changing the markup structure.</p>
      </article>
    </div>
  </div>
</section>
```

## Inversion

The `inverted` class flips a surface to the framework’s dark treatment.

It is designed to work on:

- cards
- larger callouts
- full-width sections

Examples:

```html
<article class="card inverted">
  ...
</article>

<section class="section inverted">
  ...
</section>
```

`inverted` can also be combined with `bordered` when you want a darker surface with an explicit edge.

## Glass

The glass system is intentionally small and composable.

- `glass` adds the frosted treatment
- `glass-bar` shapes a wider rounded bar
- `glass-pill` shapes a compact pill
- `glass-round` shapes a circular control

Examples:

```html
<div class="glass glass-bar bordered">
  ...
</div>

<span class="glass glass-pill bordered">From $399</span>

<button class="glass glass-round bordered" type="button">
  &gt;
</button>
```

For the cleanest Apple-like result, use glass over gradients, color fields, or image-heavy surfaces rather than over plain white.

## Responsive Expectations

The framework is designed to:

- collapse multi-column grids to one column on smaller screens
- reduce padding slightly without losing the sense of space
- keep line lengths readable
- preserve the visual weight of large cards and headings

When extending the framework, prefer stacking over squeezing.

## Customization Guidance

### To shift the page warmer or cooler

Adjust the surface and gradient tokens first.

```css
:root {
  --color-surface-muted: #f2f0ec;
  --color-gradient-peach-end: #ffd4b0;
  --color-gradient-sunset-2: #ff5f98;
}
```

### To sharpen or soften the system

Change the radius scale and shadows.

```css
:root {
  --radius-large: 36px;
  --radius-xlarge: 48px;
  --shadow-card: 0 6px 18px rgba(15, 23, 42, 0.04);
}
```

### To create a quieter version

- reduce the number of highlighted cards
- remove `text-gradient` from headlines
- use white cards more often than muted cards

## Practical Rule of Thumb

If a page starts to feel like a UI kit demo, pull back on:

- the number of accents
- the number of equally important cards
- the amount of small interface decoration

Then increase:

- top and bottom padding
- headline clarity
- separation between quiet sections and emphasized ones

That balance is where the framework is meant to live.
