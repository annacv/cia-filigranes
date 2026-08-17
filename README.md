# Companyia Filigranes

Official website for **Companyia Filigranes** (Cia. Filigranes) — a Catalan clown and circus company founded by Jordi Torrens (Trinxeta) and Albert Pérez (Makutu). With over twenty years on stage, they create family shows, workshops, and tailor-made performances for festivals, schools, and events.

![Companyia Filigranes — Open Graph image](public/og_image.jpg)
**Live site:** [www.ciafiligranes.net](https://www.ciafiligranes.net)

---

## What’s on the website

The site is trilingual (**Catalan** default, **Spanish**, **English**) and covers:

| Section | Content |
|---------|---------|
| **Home** | Featured show promo, upcoming agenda highlights, shows / workshops / performances strips, about, hire CTA |
| **Shows** (`/espectacles`) | Full catalog with dedicated pages (synopsis, tech/art sheets, dossiers, optional teaser video, show-specific agenda) |
| **Workshops** (`/tallers`) | Circus, soap bubbles, clowns, makeup, water tricks |
| **Performances** (`/animacions`) | Bespoke street / event animations |
| **Collaborations** | Shows with other companies |
| **About** (`/filipersones`) | Company story and the two performers (Makutu, Trinxeta) |
| **Agenda** | Live calendar (Google Calendar) of shows, workshops, and performances |
| **Contact / hire** | Contact page and hire forms to request shows or services |
| **Downloads** | Press dossiers (PDF), images, and logo (including bulk ZIPs) |
| **Legal** | Legal notice, privacy, cookies |

Organisers can browse the catalog, check dates, download materials, and send a booking enquiry from the same site.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | [Nuxt 4](https://nuxt.com/) (Vue 3, TypeScript) |
| Rendering | Static generate (`nitro` preset `static`) |
| Styling | Tailwind CSS, Sass where needed |
| i18n | `@nuxtjs/i18n` — `ca` / `es` / `en`, localized paths |
| Icons / SVG | `nuxt-svgo` |
| Device | `@nuxtjs/device` |
| Scripts / SEO head | `@nuxt/scripts`, `@unhead/vue` |
| Calendar | Google Calendar API (runtime config) |
| Forms | [StaticForms](https://www.staticforms.xyz/) |
| Hosting | Firebase Hosting (`.output/public`) |
| Tooling | ESLint, Prettier, Sharp (image optimize), `cwebp` for JPEG→WebP |

---

## Development

Requires Node.js (project scripts target an nvm Node 22 install via `scripts/run-with-node.sh`).

```bash
npm install
npm run dev
```

Useful scripts:

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run generate` | Static site build (+ robots prep) |
| `npm run generate:preview` | Static build with preview robots |
| `npm run preview` | Preview the generated site |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run optimize:images` | Re-compress WebPs (prefer path filters) |
| `npm run deployTest` | Firebase deploy |

### Environment

Copy secrets into a local `.env` (not committed). Nuxt public runtime keys:

- `NUXT_PUBLIC_GOOGLE_CALENDAR_API_KEY`
- `NUXT_PUBLIC_GOOGLE_CALENDAR_ID`
- `NUXT_PUBLIC_STATIC_FORMS_API_URL`
- `NUXT_PUBLIC_STATIC_FORMS_ACCESS_KEY`

Restart the dev server after changing env vars.

---

## Content & agent docs

When changing catalog content or assets, follow:

- [`AGENTS.md`](AGENTS.md) — entry points for agents
- [`docs/adding-a-new-show.md`](docs/adding-a-new-show.md) — add or promote a show
- [`docs/adding-new-images.md`](docs/adding-new-images.md) — JPEG→WebP conversion and image optimization
