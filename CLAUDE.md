# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing website for Grönkraft Sverige AB — a Swedish green technology consulting company. All content is in Swedish. No build tools, no frameworks, no package manager.

## Running locally

Open `index.html` directly in a browser, or serve with any static HTTP server:

```sh
python3 -m http.server 8080
# or
npx serve .
```

## Architecture

A single-page site with three files:

- **[index.html](index.html)** — All markup, ~1000 lines. Sections in order: header/nav, hero + multi-step lead form, services, partners, process steps, FAQ, articles, footer.
- **[css/style.css](css/style.css)** — All styles. Uses CSS custom properties defined at the top (`:root`) for colors, spacing, and shadows. Mobile-first responsive with breakpoints at 480px, 768px, and 1024px.
- **[js/main.js](js/main.js)** — Vanilla JS for: mobile nav toggle, FAQ accordion, sticky header scroll shadow, and the multi-step lead form.

## Lead form

The multi-step form in the hero section branches based on customer type (`privat` / `BRF` / `företag`). Each step is a `.mf-step` div; JS in `main.js` shows/hides steps and tracks history in `mfHistory`. On final submission it POSTs silently to a Webflow form endpoint (`/tack`) and shows a success screen.

**The form is designed to be embedded in Webflow via a custom code embed.** All form CSS is scoped under `.gk-form` so it does not conflict with Webflow's own CSS. Key rules:

- The outer wrapper `<div class="gk-form">` is the embed root.
- All CSS variables the form needs are defined on `.gk-form` itself (not just `:root`) so the snippet is self-contained.
- Button selectors are doubled: `.btn, .gk-form .btn` — so they work both on this static site and standalone in Webflow.
- Never add form-specific styles outside of a `.gk-form` selector prefix — they will leak into Webflow's page.
- `@keyframes mfFadeIn` is left global (keyframe names cannot be scoped to a class).

To embed in Webflow: copy the `<div class="gk-form">...</div>` block from `index.html` + all `.gk-form` CSS rules from `style.css` + the lead form JS section from `main.js` (the IIFE containing `mfNext`, `mfBack`, `mfSubmit`, and the keyboard support IIFE above it). Load the Nunito font in Webflow's page settings.

## CSS conventions

All design tokens (brand colors, shadows, border-radius, transitions) live as CSS variables in `:root` — use these rather than hard-coding values. The primary brand color is `--primary-color: #2E7D32`. The form's own tokens are duplicated on `.gk-form` so the embed works without the page's `:root`.
