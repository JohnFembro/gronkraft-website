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

The multi-step form in the hero section branches based on customer type (`privat` / `BRF` / `företag`). Each step is a `.form-step` div; JS shows/hides steps and tracks `currentStep`. On final submission it POSTs to a Webflow form endpoint and redirects to `/tack`.

## CSS conventions

All design tokens (brand colors, shadows, border-radius, transitions) live as CSS variables in `:root` — use these rather than hard-coding values. The primary brand color is `--primary-color: #2E7D32`.
