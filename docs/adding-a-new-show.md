# Spec: Adding a New Show (Espectacle)

Agent-agnostic instructions for introducing a new show on the Cia Filigranes website (Nuxt 4 / Vue 3 / TypeScript / `@nuxtjs/i18n` / static generate).

Use this document with any coding agent (Cursor, Claude, Codex, etc.). Follow existing show pages as templates; do not invent new patterns.

---

## 1. Goals and modes

There are **two modes**. Decide which one applies before changing any files.

| Mode | Intent | List position |
|------|--------|---------------|
| **A — Full show promo** | New show is the featured / hero show on the home page and appears first everywhere shows are listed | Insert at **index 0** (position 1) in `ROUTES_INDEX` → `espectacles.children` |
| **B — New item only** | New show is added to the catalog like any other show; home hero stays on the current featured show | **Append** to the end of `ROUTES_INDEX` → `espectacles.children` (or insert at any non-featured position if specified) |

### What “position 1” affects automatically

`ROUTES_INDEX.espectacles.children` is the **single source of truth** for show order. Changing that array updates:

- Side nav shows list (`NavMenu` via `SideNav`)
- Footer shows list (`BottomNavigation`)
- Highlight shows strip (`HighlightShows`)
- Hire form show dropdown (`FormSelectDropdown`)
- Downloads show multiselect + per-show cards (`pages/descarregues.vue`)
- Shows index listing (`pages/espectacles/index.vue` → `SynopsisList`)

No separate edits are required in those UI components when the slug is already in `ROUTES_INDEX` and `routes.{slug}` exists in all locale files.

---

## 2. Prerequisites (inputs the agent must have)

Collect these before coding. If anything is missing, stop and ask.

### Required for both modes

| Input | Notes |
|-------|--------|
| **Slug** | Kebab-case Catalan id, e.g. `nou-espectacle`. Used as filename, route key, product key, image prefix, PDF name. |
| **Display titles** | `ca`, `en`, `es` (for `routes.{slug}`) |
| **Localized URL paths** | `ca` / `en` / `es` paths under `/espectacles`, `/shows`, `/espectaculos` |
| **Copy** | Full `shows.{slug}` block for all 3 locales (see §6.5) |
| **Images** | WebP set for desktop **and** mobile (same filenames) — see §5 |
| **Brand SVG(s)** | At least Catalan `{slug}-brand.svg`; preferably `en` + `es` variants |
| **Dossier PDFs** | 3 files: `CiaFiligranes-{slug}-{ca\|en\|es}.pdf` |
| **Has teaser video?** | If yes: YouTube video id. If no: add slug to `SHOWS_WITHOUT_VIDEO` |
| **Agenda title aliases** | How the show is named in Google Calendar event titles (for `FILI_SHOWS` mapping) |

### Extra for mode A (full show promo)

| Input | Notes |
|-------|--------|
| **Home hero cover** | New `hero_cover.webp` (desktop + mobile) featuring the show |
| **Home synopsis image** | Usually `espectacles_{slug}-5.webp` (desktop + mobile), or another dedicated still |
| **Optional home footer** | Replace `hero_footer.webp` only if the promo redesign includes it |

### Naming conventions

- Slug / page file: `pages/espectacles/{slug}.vue`
- Image stem: `espectacles_{slug}` (+ suffixes)
- Brand file: `assets/brands/{slug}-brand.svg` (prefer hyphens; avoid spaces — existing `germans filigranes-*` is a legacy exception)
- Dossier: `public/downloads/dossiers/CiaFiligranes-{slug}-{locale}.pdf`
- i18n route key: `routes.{slug}`
- i18n content key: `shows.{slug}.*`
- Hire product key: same as slug string
- Page route name for i18n pages map: `espectacles/{slug}`

---

## 3. Current reference shows

As of this spec, `ROUTES_INDEX` order is:

1. `vint-anys` ← currently featured on home (mode A reference)
2. `plis-plas`
3. `circ-filixic`
4. `germans-filigranes`
5. `circ-makutu`
6. `circ-trinxeta`
7. `freak-frac`

| Template | Clone when… |
|----------|-------------|
| `pages/espectacles/vint-anys.vue` or `plis-plas.vue` / `circ-filixic.vue` / `freak-frac.vue` | Show **has** a YouTube teaser (`#video`) |
| `pages/espectacles/germans-filigranes.vue` / `circ-makutu.vue` / `circ-trinxeta.vue` | Show **has no** teaser — also listed in `SHOWS_WITHOUT_VIDEO` |
| `pages/index.vue` | Mode A only — how home wires the featured show |

Shows without video today: `germans-filigranes`, `circ-makutu`, `circ-trinxeta`.

---

## 4. Architecture overview

```text
ROUTES_INDEX (constants/index.ts)
  ├─ NavMenu / SideNav
  ├─ BottomNavigation
  ├─ HighlightShows
  ├─ FormSelectDropdown (hire)
  ├─ descarregues.vue (multiselect + cards)
  └─ espectacles/index.vue (SynopsisList)

pages/espectacles/{slug}.vue
  ├─ i18n: shows.{slug}.* + routes.{slug}
  ├─ BaseBrand → assets/brands/*
  ├─ images → assets/images/{desktop|mobile}/espectacles/*
  ├─ dossiers → public/downloads/dossiers/*
  ├─ optional YOUTUBE_VIDEO_IDS
  └─ agenda → useShowAgenda(slug) + FILI_SHOWS title map

i18n/custom-routes.ts → localized URLs (ca / en / es)
```

Images under `assets/images/**/espectacles/*.webp` are picked up automatically via `import.meta.glob` in `constants/glob-imports.ts` — no manual registry entry is needed for new webps once files exist on disk.

---

## 5. Assets checklist and counts

### 5.1 Show page images (both modes)

Sources are usually provided as **JPEG**. Convert and optimize per [`adding-new-images.md`](adding-new-images.md). Final files committed to the repo are **WebP** with **identical filenames** in:

- `assets/images/desktop/espectacles/`
- `assets/images/mobile/espectacles/`

| Filename | Typical use | Required? |
|----------|-------------|-----------|
| `espectacles_{slug}.webp` | Highlight card, downloads card | **Yes** |
| `espectacles_{slug}-1.webp` | Hero and/or synopsis/datasheet (page-specific) | **Yes** |
| `espectacles_{slug}-2.webp` | Page body / footer (page-specific) | **Yes** |
| `espectacles_{slug}-3.webp` | **Shows index** `SynopsisList` always uses `-3` | **Yes** |
| `espectacles_{slug}-4.webp` | Page body / hero / footer (page-specific) | **Yes** |
| `espectacles_{slug}_hero.webp` | Optional alternate hero (see makutu/trinxeta) | Optional |
| `espectacles_{slug}-5.webp` | Home synopsis still (mode A; see vint-anys) | Mode A recommended |

**Minimum image files for mode B:** 5 stems × 2 breakpoints = **10 webp files**.  
**Typical for mode A:** 6 stems × 2 = **12 webp files** (includes `-5` for home).  
With optional `_hero`: +2 webps.

Wire image suffixes in the new page by copying the closest existing page and assigning stems deliberately (hero / synopsis / datasheet / footer). There is no shared constant for which number maps to which slot — it is page-local.

### 5.2 Brand SVGs (both modes)

Directory: `assets/brands/`

| File | Required? |
|------|-----------|
| `{slug}-brand.svg` | **Yes** (Catalan / default fallback) |
| `{slug}-brand-en.svg` | Recommended |
| `{slug}-brand-es.svg` | Recommended |

If only the CA file exists, `BaseBrand` falls back to `ca` for all locales (see `plis-plas`).

**Count:** 1–3 SVG files. Then register them in `components/cover/BaseBrand.vue` (imports + `BrandSlug` union + `brandBySlug` map).

### 5.3 Home hero (mode A only)

| File | Action |
|------|--------|
| `assets/images/desktop/hero_cover.webp` | **Replace** with new promo cover |
| `assets/images/mobile/hero_cover.webp` | **Replace** |
| `assets/images/desktop/hero_footer.webp` | Optional replace |
| `assets/images/mobile/hero_footer.webp` | Optional replace |

Home currently loads `image-name="hero_cover"` (not an `espectacles_*` stem) and overlays `<BaseBrand slug="…" />`.

### 5.4 Dossier PDFs (both modes)

Directory: `public/downloads/dossiers/`

| File |
|------|
| `CiaFiligranes-{slug}-ca.pdf` |
| `CiaFiligranes-{slug}-en.pdf` |
| `CiaFiligranes-{slug}-es.pdf` |

**Count:** **3 PDF files**.

### 5.5 Bulk ZIPs (both modes)

Rebuild / replace the espectacles bulk archives so they include the new dossiers (and any other assets the zip currently packages):

| File |
|------|
| `public/downloads/zip/ca/CiaFiligranes-espectacles.zip` |
| `public/downloads/zip/es/CiaFiligranes-espectacles.zip` |
| `public/downloads/zip/en/CiaFiligranes-espectacles.zip` |

**Count:** **3 ZIP files** updated (not created from scratch unless missing).

### 5.6 File count summary

| Category | Mode B (new item) | Mode A (full promo) |
|----------|-------------------|---------------------|
| Show webps (desktop+mobile) | ~10 | ~12 (+ optional `_hero`) |
| Home `hero_cover` webps | 0 | **2** replaced |
| Home `hero_footer` webps | 0 | 0–2 replaced |
| Brand SVGs | 1–3 | 1–3 |
| Dossier PDFs | 3 | 3 |
| Bulk ZIPs updated | 3 | 3 |
| **New/edited asset files (typical)** | **~17–19** | **~21–25** |

Plus the code/config files in §6.

---

## 6. Step-by-step implementation

Execute in this order. Mark each step done before moving on.

### Step 0 — Choose mode and template

1. Confirm mode **A** or **B**.
2. Confirm whether the show has a YouTube teaser.
3. Pick the clone template page (§3).

---

### Step 1 — Register the slug in `ROUTES_INDEX`

**File:** `constants/index.ts`

```ts
// Mode A — position 1 (index 0)
children: ['{slug}', 'vint-anys', 'plis-plas', /* …rest unchanged */]

// Mode B — append (or agreed non-first position)
children: [/* existing… */, '{slug}']
```

This single change drives nav, footer nav, highlights, hire dropdown, downloads list, and shows index order.

---

### Step 2 — Localized routes

**File:** `i18n/custom-routes.ts`

Add:

```ts
'espectacles/{slug}': {
  ca: '/espectacles/{slug}',          // or Catalan path variant
  en: '/shows/{english-slug}',
  es: '/espectaculos/{spanish-slug}',
},
```

Follow patterns of existing entries (some English paths are translated, some keep the Catalan slug).

---

### Step 3 — Create the show page

**Create:** `pages/espectacles/{slug}.vue`

Clone the chosen template and replace every occurrence of the old slug with `{slug}`:

| Concern | What to set |
|---------|-------------|
| `useShowAgenda("{slug}")` | Agenda filter key |
| `useHead` meta | `t("shows.{slug}.metaDescription")` |
| `getTranslatedList` keys | `shows.{slug}.abstract\|list\|synopsis\|techCard\|artCard` |
| Dossier download | `CiaFiligranes-{slug}-${locale}.pdf` |
| `HeroCover` | `image-name`, `schedule-content-key="{slug}"`, optional `background-position` |
| `BaseBrand` | `slug="{slug}"` |
| `Synopsis` / `DataSheet` images | `getImageByRoute('espectacles', '{slug}-N')` |
| `hire-contract` | `{ kind: 'show', productKey: '{slug}' }` |
| `HighlightShows` | `:reorder-index="getItemIndex('espectacles', '{slug}')"` |
| `YoutubePlayer` | Include only if the show has a video; wrap in `#video` with the same scroll-margin classes as existing pages |
| `HeroFooter` | Show-specific image or shared `hero_footer` (match template) |

Do **not** invent new section order. Preserve the `MainContent` slot structure of the template.

---

### Step 4 — Brand component registration

**File:** `components/cover/BaseBrand.vue`

1. Import SVG(s) with `?raw`.
2. Extend `BrandSlug` union with `'{slug}'`.
3. Add `brandBySlug['{slug}']` with `ca` (and `en` / `es` if available).
4. Only add a custom size class if the logo aspect ratio needs it (see `freak-frac` exception). Default size class is fine for most shows.

---

### Step 5 — Add image assets

1. Obtain source **JPEGs** for every required stem (§5.1). Mode A also needs home `hero_cover` (and optional `hero_footer`).
2. Convert JPEG → WebP, then optimize — follow [`adding-new-images.md`](adding-new-images.md) end to end (place files, convert, optimize, do not commit JPEGs).
3. Confirm `-3` exists (required by `pages/espectacles/index.vue`).
4. Confirm bare `espectacles_{slug}.webp` exists (highlight + downloads).
5. Mode A: confirm `-5` (or the home synopsis stem) and replaced `hero_cover.webp` (desktop + mobile).

For shows, typical optimize filters after conversion:

```bash
npm run optimize:images -- espectacles_{slug}
# Mode A also:
npm run optimize:images -- hero_cover
# Optional home footer:
npm run optimize:images -- hero_footer
```

---

### Step 6 — i18n copy (3 locales)

**Files:**

- `i18n/locales/ca-CA.json`
- `i18n/locales/es-ES.json`
- `i18n/locales/en-GB.json`

#### 6.1 Route title

Under `routes`:

```json
"{slug}": "Display title in this locale"
```

#### 6.2 Show content block

Under `shows`, add a sibling object matching existing shows:

```json
"{slug}": {
  "metaDescription": "…",
  "abstract": [{ "paragraph": "…" }],
  "list": [
    { "title": "…", "description": "…" },
    { "title": "…", "description": "…" }
  ],
  "synopsis": [
    { "paragraph": "…" },
    { "paragraph": "…" }
  ],
  "techCard": [
    { "title": "…", "description": "…" }
  ],
  "artCard": [
    { "title": "…", "description": "…" }
  ]
}
```

Mirror structure and depth from a similar existing show (e.g. `vint-anys` or `plis-plas`). Keep keys identical across `ca` / `en` / `es`; only values change.

Mode A also reuses `shows.{slug}.abstract`, `.list`, and `.synopsis` on the home page — write them so they work both on home and on the show page.

---

### Step 7 — Video / no-video flags

**File:** `constants/index.ts`

| Case | Action |
|------|--------|
| Has YouTube teaser | Add camelCase entry to `YOUTUBE_VIDEO_IDS` (e.g. `nouEspectacle: 'VIDEO_ID'`) and use it on the page. Optionally append to `YOUTUBE_PLAYLIST_IDS` if the show should appear in the shared playlist string. |
| No teaser | Add `'{slug}'` to `SHOWS_WITHOUT_VIDEO`. Do **not** render `YoutubePlayer` / `#video`. Shows index will link with `button.info` instead of `button.teaser`. |

---

### Step 8 — Agenda title → slug mapping

**File:** `utils/calendar-events.ts`

Add normalized title keys to `FILI_SHOWS` so calendar events resolve to the show page / images:

```ts
'exact calendar title normalized': '{slug}',
```

Normalization in this file uses lowercase accent-stripped titles — follow the style of existing keys (`'20 anys no son res'`, `'plis plas'`, etc.).

Without this, agenda cards may not link or pick the correct show image.

---

### Step 9 — Dossiers and downloads ZIPs

1. Add the 3 PDFs under `public/downloads/dossiers/`.
2. Rebuild `CiaFiligranes-espectacles.zip` for `ca`, `es`, and `en ` (§5.5).

Downloads UI itself needs **no component edits** if Step 1 + route titles are done: `pages/descarregues.vue` reads children from `ROUTES_INDEX`.

---

### Step 10 — Mode A only: promote on home

**File:** `pages/index.vue`

Replace every hard-coded featured-show reference (currently `vint-anys`) with `{slug}`:

| Location | Change |
|----------|--------|
| `getTranslatedList('shows.{slug}.abstract'…)` | Featured summary copy |
| `getTranslatedList('shows.{slug}.list'…)` | Featured fact list |
| `getTranslatedList('shows.{slug}.synopsis'…)` | Featured synopsis |
| `<BaseBrand slug="{slug}" />` | Hero brand |
| sr-only title `t('routes.{slug}')` | A11y heading |
| `Synopsis` image | e.g. `getImageByRoute('espectacles', '{slug}-5')` |
| `hire-contract.productKey` | `'{slug}'` |
| Teaser `info-button.href` | `/espectacles/{slug}#video` if video exists; otherwise `/espectacles/{slug}` and adjust `textKey` to `button.info` |
| `HighlightShows` `:reorder-index` | `getItemIndex('espectacles', '{slug}')` |

Also ensure Step 1 put `{slug}` at **index 0**.

Home hero image stays `hero_cover` / `hero_footer` (root image route `""`) — update those asset files, not the `image-name` prop, unless the design explicitly changes the stem.

---

### Step 11 — Mode B only: leave home alone

Do **not** change:

- `pages/index.vue` featured slug bindings
- `hero_cover.webp` / `hero_footer.webp`

The new show still appears in home `HighlightShows` according to its `ROUTES_INDEX` position (not first unless you intentionally insert it first without updating the home hero — avoid that inconsistency; for a true catalog add, append).

---

## 7. Components involved (inventory)

Agents should know these exist; most do **not** need edits when `ROUTES_INDEX` + assets + i18n are correct.

### Must edit / create

| Path | Mode |
|------|------|
| `constants/index.ts` | A + B (`ROUTES_INDEX`; optional video sets) |
| `i18n/custom-routes.ts` | A + B |
| `pages/espectacles/{slug}.vue` | A + B (create) |
| `components/cover/BaseBrand.vue` | A + B |
| `i18n/locales/ca-CA.json` | A + B |
| `i18n/locales/es-ES.json` | A + B |
| `i18n/locales/en-GB.json` | A + B |
| `utils/calendar-events.ts` | A + B (`FILI_SHOWS`) |
| `pages/index.vue` | **A only** |
| Asset files in §5 | A + B (home heroes A only) |

### Consume `ROUTES_INDEX` / show data automatically (usually no code change)

| Path | Role |
|------|------|
| `components/nav/NavMenu.vue` | Side menu shows section |
| `components/nav/SideNav.vue` | Hosts `NavMenu` |
| `components/nav/BottomNavigation.vue` | Footer shows section |
| `components/nav/TheBurger.vue` / `components/TheHeader.vue` | Nav chrome |
| `components/highlight/HighlightShows.vue` | Highlight strip |
| `components/highlight/HighlightContent.vue` | Layout wrapper |
| `components/SmallCard.vue` | Card in highlight |
| `components/SlidingPanel.vue` | Horizontal scroller |
| `components/form/FormSelectDropdown.vue` | Hire show select |
| `components/hire/HireFormModal.vue` | Modal hire form |
| `components/hire/HireFormPage.vue` | Page hire form |
| `pages/descarregues.vue` | Downloads show list |
| `components/downloads/MultiselectDownloadCard.vue` | Multiselect UI |
| `components/downloads/ItemDownloadCard.vue` | Per-show download card |
| `components/downloads/BulkDownloadCard.vue` | Bulk ZIP card |
| `pages/espectacles/index.vue` | All-shows listing |
| `components/SynopsisList.vue` | Listing layout |
| `utils/items-by-route.ts` | Reads `ROUTES_INDEX` |
| `utils/get-item-index.ts` | Index for reorder |
| `utils/reorder-items.ts` | Highlight reorder helper |
| `utils/image-by-route.ts` | Builds `{imageName, imageRoute}` |
| `utils/downloads-resolver.ts` | Dossier / image download plans |
| `composables/use-specific-downloads.composable.ts` | Download actions |
| `composables/use-link-by-route.composable.ts` | Locale-aware links |
| `constants/glob-imports.ts` | Auto-globs new webps |
| `constants/downloads.ts` | Bulk ZIP path constants |

### Used by the show page template (usually no code change)

| Path | Role |
|------|------|
| `components/cover/HeroCover.vue` | Hero cover |
| `components/cover/CoverTitle.vue` | Section titles (index) |
| `components/MainContent.vue` | Page layout slots |
| `components/Summary.vue` | Abstract + facts |
| `components/Synopsis.vue` | Synopsis + CTAs |
| `components/DataSheet.vue` | Tech / art sheets |
| `components/YoutubePlayer.vue` | Teaser (if any) |
| `components/ClaimTitle.vue` | Section claims |
| `components/agenda/CalendarFilters.vue` | Show agenda filters |
| `components/agenda/CalendarEventList.vue` | Event list |
| `composables/calendar/use-event-calendar.composable.ts` | `useShowAgenda` |
| `components/hire/HireContactSection.vue` | Contact/hire block |
| `components/hire/HireFiliBanner.vue` | Hire banners |
| `components/HeroFooter.vue` | Footer image band |
| `components/TheSupporters.vue` | Supporters |
| `components/FiliButton.vue` | Buttons |
| `components/CardImage.vue` | Image rendering |

`components/TheFooter.vue` is contact/legal only — it does **not** list shows. Footer show links live in `BottomNavigation`.

---

## 8. Code / config file count

| Action | Mode B | Mode A |
|--------|--------|--------|
| Create page | 1 | 1 |
| Edit constants | 1 | 1 |
| Edit custom routes | 1 | 1 |
| Edit BaseBrand | 1 | 1 |
| Edit locale JSON | 3 | 3 |
| Edit calendar map | 1 | 1 |
| Edit home page | 0 | 1 |
| **Code/config files touched** | **8** | **9** |

Combined with assets (§5.6): roughly **~25–28** files for mode B and **~30–34** for mode A in a typical add.

---

## 9. Acceptance checklist

### Both modes

- [ ] `{slug}` present in `ROUTES_INDEX` at the correct position for the chosen mode
- [ ] `pages/espectacles/{slug}.vue` builds and matches an existing template’s structure
- [ ] `i18n/custom-routes.ts` has ca/en/es paths; locale switcher reaches the page
- [ ] `routes.{slug}` + full `shows.{slug}` exist in ca, en, es
- [ ] `BaseBrand` renders for ca (and en/es if SVGs provided)
- [ ] Desktop **and** mobile webps exist for base, `-1`…`-4` (and any page-referenced stems)
- [ ] Followed [`adding-new-images.md`](adding-new-images.md): JPEG→WebP conversion + optimize; only new-image changes kept/staged; JPEGs not committed
- [ ] Shows index (`/espectacles`) shows the new item with `-3` image
- [ ] Highlight strip shows the new card with base image
- [ ] Side nav and footer nav list the show in the expected order
- [ ] Hire form show dropdown includes the show in the expected order
- [ ] Downloads page lists the show; dossier PDFs download for ca/en/es
- [ ] Bulk espectacles ZIPs updated for all three locale folders
- [ ] Video: either `#video` + `YOUTUBE_VIDEO_IDS` **or** `SHOWS_WITHOUT_VIDEO` entry
- [ ] `FILI_SHOWS` mapping added if the show will appear in the agenda
- [ ] Static generate / local preview OK for ca, en, es URLs

### Mode A extras

- [ ] `{slug}` is **first** in `ROUTES_INDEX.espectacles.children`
- [ ] Home hero shows new brand + new `hero_cover` (desktop + mobile)
- [ ] Home summary + synopsis use `shows.{slug}.*`
- [ ] Home synopsis image and hire/teaser CTAs point at the new show
- [ ] Home `HighlightShows` reorder index uses the new slug
- [ ] Previous featured show remains reachable via its own page and lists (no longer first if displaced)

### Mode B extras

- [ ] Home still features the previous promo show (brand, cover, summary, synopsis unchanged)
- [ ] New show is **not** forced to position 1 unless product explicitly requested that without a full promo (discouraged)

---

## 10. Worked decision tree

```text
Start
  ├─ Full home promo? ──yes──► Mode A
  │                              ├─ Insert slug at index 0 in ROUTES_INDEX
  │                              ├─ Do all shared steps (page, brand, i18n, images, PDFs, ZIPs, calendar, video flags)
  │                              └─ Update pages/index.vue + replace hero_cover (+ optional hero_footer, -5 image)
  │
  └─ Catalog item only? ─yes──► Mode B
                                 ├─ Append slug in ROUTES_INDEX
                                 ├─ Do all shared steps
                                 └─ Leave pages/index.vue and hero_cover untouched
```

---

## 11. Out of scope / do not confuse with

- **Collaborations** (`COLLABORATION_ENTRIES` on `/collaboracions`) — separate from official shows; may reuse `espectacles_*` image filenames but are not `ROUTES_INDEX` children.
- **Workshops / performances** — parallel systems under `tallers` / `animacions`; do not mix into show registration.
- Editing `TheFooter.vue` for show links — wrong component; use `BottomNavigation` (fed by `ROUTES_INDEX`).

---

## 12. Quick reference — canonical paths

| Concern | Path |
|---------|------|
| Show order source of truth | `constants/index.ts` → `ROUTES_INDEX` |
| Localized URLs | `i18n/custom-routes.ts` |
| Show page | `pages/espectacles/{slug}.vue` |
| Shows index | `pages/espectacles/index.vue` |
| Home promo | `pages/index.vue` |
| Brand registry | `components/cover/BaseBrand.vue` |
| Brand assets | `assets/brands/` |
| Images | `assets/images/{desktop\|mobile}/espectacles/` |
| Home covers | `assets/images/{desktop\|mobile}/hero_cover.webp` |
| Dossiers | `public/downloads/dossiers/` |
| Bulk ZIPs | `public/downloads/zip/{ca\|es\|en}/` |
| Locales | `i18n/locales/{ca-CA\|es-ES\|en-GB}.json` |
| Agenda title map | `utils/calendar-events.ts` → `FILI_SHOWS` |
| No-video set | `constants/index.ts` → `SHOWS_WITHOUT_VIDEO` |
| YouTube ids | `constants/index.ts` → `YOUTUBE_VIDEO_IDS` |
