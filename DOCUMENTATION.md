# Apple Editorial CSS Framework

## Purpose

This framework is a light-first CSS system for building Apple-style editorial and product pages.

It is based on three recurring patterns from the reference pages:

- typography leads the design
- whitespace and soft contrast do most of the visual work
- gradients appear rarely and only to provide emphasis

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
- `--color-gradient-*` support rare highlight moments

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
- `card-highlight`

Recommended use:

- use `card` as the default white surface
- use `card-large` when the content needs more visual weight
- use `card-muted` for soft grey sections inside a mostly white page
- use `card-highlight` sparingly for a subtle gradient lift

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

- `gradient-text`
- `section-highlight`

Use these only when emphasis is truly needed.

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

Use `card` as the base content block. Introduce `card-muted` and `card-highlight` only where they improve pacing or contrast.

### 4. Use bento sections with mixed scale

The `bento` pattern works best when one card is clearly larger or more important than the others. Avoid making every cell feel equal.

### 5. Add gradients last

Use `gradient-text` for a phrase or `section-highlight` for one full-width moment. If too many elements use gradients, the page stops feeling Apple-like.

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

      <article class="card card-highlight">
        <h3 class="title">Highlighted card</h3>
        <p class="body">Use this only when the content deserves extra emphasis.</p>
      </article>
    </div>
  </div>
</section>
```

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
  --color-gradient-warm: #ffd4b0;
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
- remove `gradient-text` from headlines
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
