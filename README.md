# Enjani Realty — Website

A multi-page static website for **Enjani Realty**, a Nairobi property advisory covering Kilimani, Westlands, Karen, Runda, Lavington and Kileleshwa. Built as a lightweight HTML/CSS/JS site — no build step, no framework, no dependencies beyond Google Fonts.

## Live structure

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero with search widget, featured listings, area guides, market notes, FAQ |
| Properties | `properties.html` | Full listing grid with filter chips (suburb / rent / sale) and hero-search query-param filtering |
| Property Detail | `property-detail.html` | Single-listing template — gallery, specs table, sticky enquiry panel |
| Guides | `blog.html` | Resources/guides listing (buying, legal, area comparisons, renting, diaspora) |
| Guide Article | `blog-post.html` | Single-article template — fully written example: "Off-Plan vs Ready Units" |
| About | `about.html` | Company story, agent profile, stats |
| Contact | `contact.html` | Viewing request form (hands off to WhatsApp), office info |

Every page also carries a floating WhatsApp chat bubble (bottom-right) and a "Guides" link in the main nav and footer.

## File structure

```
enjani-realty/
├── index.html
├── properties.html
├── property-detail.html
├── blog.html
├── blog-post.html
├── about.html
├── contact.html
├── css/
│   └── style.css        # design tokens, layout, components, hero-search, chat bubble, blog cards
├── js/
│   └── script.js         # mobile nav, filters, hero-search → query-param filtering, FAQ accordion, scroll reveals, WhatsApp form handoff
└── README.md
```

## Hero search widget → Properties filtering

The homepage hero includes a Location / Property Type / Sale-or-Rent / Max Budget search form. Submitting it redirects to `properties.html?location=..&type=..&use=..` (budget isn't wired into filtering yet — it's UI-only until real listings have price data to filter against). On load, `properties.html` reads those query params and filters the same `data-tags` cards used by the filter chips, showing a "Showing N matches" notice above the grid.

Each property card carries a `data-tags` attribute combining suburb, sale/rent, and property type (e.g. `data-tags="kilimani,sale,apartment"`) — add new tags there if you add new listings or filter categories.

## What this static build can't do (and what would need a backend)

Client feedback also asked for indexable pages per location-and-bedroom combination (e.g. a real, crawlable `/kilimani/2-bedroom/` page) and a cascading location → bedroom-count filter. That's genuinely better solved with a real backend — either a WordPress real estate plugin/theme (Easy Property Listings, Houzez, RealHomes) that generates those archive pages automatically with proper SEO, or a database-backed site. Hand-writing static pages for every location × bedroom combination doesn't scale and isn't what's here — this build covers the search widget, filtering, blog, chat bubble, and performance improvements, all of which work standalone.

## Design system

- **Palette** — forest green, moss, warm sand/cream, clay/bronze accent (see `:root` variables at the top of `style.css`)
- **Type** — [Fraunces](https://fonts.google.com/specimen/Fraunces) (display serif), [Work Sans](https://fonts.google.com/specimen/Work+Sans) (body), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (prices, labels, specs)
- **Signature motif** — a topographic contour-line pattern (`.contour-field` / `.contour-dark`) used in the hero, CTA bands, and logo mark
- **Property imagery** — placeholder listings use custom line-art "parcel" graphics (`.plot-art`) instead of stock photos; swap these for real property photos when available

## Running locally

No build tools required. Either:

1. Open `index.html` directly in a browser, or
2. Serve the folder so relative paths behave exactly as in production:
   ```bash
   cd enjani-realty
   python3 -m http.server 8000
   # then visit http://localhost:8000
   ```

## Before going live — replace placeholder content

- [ ] WhatsApp number (currently `254700000000`) — appears in nav CTAs, listing cards, the floating chat bubble on every page, and `contact.html`'s form handler in `js/script.js`
- [ ] Email address (`hello@enjanirealty.co.ke`)
- [ ] Office addresses (footer, `contact.html`)
- [ ] Agent name/photo (`about.html`)
- [ ] Listings — currently sample data (Acacia Court, Ridgeview Residences, etc.); replace with real properties and photos
- [ ] Stats (180+ homes placed, KSh 4.2B transaction value, etc.)

## Deployment options

- **Static hosting** (simplest) — Netlify, Vercel, GitHub Pages, or any shared host: upload the folder as-is
- **WordPress** — no native "import HTML site" feature exists; the practical paths are (a) rebuild in a page builder like Elementor, (b) embed this HTML/CSS via a code-snippets plugin (e.g. WPCode) with one WordPress Page per file, or (c) convert this into a proper WordPress theme (`functions.php`, template files). Option (b) is fastest and keeps this exact design.

## Performance notes

Fonts load via preconnected `<link>` tags in each page's `<head>` rather than a CSS `@import`, which avoids a render-blocking fetch waterfall — a direct client concern about mobile load times. Beyond that, this is a dependency-free static site (no framework, no build step), which is inherently fast to serve; if this later moves into WordPress, keep an eye on plugin bloat and image sizes, which are the usual causes of slow WordPress sites, not the underlying platform itself.

## Browser support

Tested in current Chromium-based browsers. Uses CSS Grid, `aspect-ratio`, and `backdrop-filter` — fine for all modern evergreen browsers, not IE11.

## License

Sample site built for demonstration purposes. Replace this section with your own license or terms before publishing.
