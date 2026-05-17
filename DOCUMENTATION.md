# Apple Editorial CSS Framework

## Purpose

This framework is a light-first CSS system for building Apple-style editorial and product pages.

It is based on three recurring patterns from the reference pages:

- typography leads the design
- whitespace and soft contrast do most of the visual work
- gradients appear selectively and only to provide emphasis

The framework is intentionally simple. It avoids heavy abstractions, clever selectors, and overly decorative defaults.

## Files

- [`index.html`](/Users/omgitsalexl/Developer/Projects/Apple-like%20CSS%20Template/index.html) is the demo template
- [`framework/apple.css`](/Users/omgitsalexl/Developer/Projects/Apple-like%20CSS%20Template/framework/apple.css) is the framework stylesheet
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

The stylesheet is organized in this order:

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

Use the `--space-*` scale for section padding, grid gaps, and card interiors. The larger sizes are important because the framework depends on whitespace.

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

### Actions

- `button`
- `button-primary`
- `button-secondary`
- `link-arrow`

Keep actions understated. On Apple-style pages, the typography and spacing should remain more prominent than the buttons.

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
  <div class="container nav">
    ...
  </div>
</header>

<main>
  <section class="hero">
    <div class="container feature-grid">
      ...
    </div>
  </section>

  <section class="section">
    <div class="container stack">
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

Lay out the page with `container`, `section`, and `stack` before thinking about accents.

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

## Mesh Gradient Notes

The gradient presets use stacked radial gradients over a pale base instead of a simple two-color linear blend.

That gives them a closer feel to the multi-point mesh gradients used in current Apple design examples:

- stronger focal color
- softer edges at the perimeter
- more movement across the surface
- better reuse across text, cards, and full-width sections

In practice, each preset should be treated like a reusable color family rather than a one-off effect.

## Example

```html
<section class="section">
  <div class="container stack">
    <p class="eyebrow">Overview</p>
    <h2 class="title">A quiet section with clear hierarchy.</h2>
    <p class="lead">Let the layout and typography do most of the work.</p>

    <div class="grid grid-2">
      <article class="card card-muted">
        <h3 class="title">Muted card</h3>
        <p class="body">Soft grey surfaces help break up long pages.</p>
      </article>

      <article class="card gradient-card gradient-sky">
        <h3 class="title">Highlighted card</h3>
        <p class="body">Use this only when the content deserves extra emphasis.</p>
      </article>

      <article class="card bordered">
        <h3 class="title">Bordered card</h3>
        <p class="body">Add a border only when the page benefits from that extra definition.</p>
      </article>

      <article class="card inverted">
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
