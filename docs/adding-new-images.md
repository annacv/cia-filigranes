# Spec: Adding new images

Agent-agnostic instructions for bringing new raster images into the Cia Filigranes site. Source files are usually **JPEG**; the site serves **WebP** from `assets/images/`.

Use this document whenever new images are added (new show, home promo, workshops, etc.). Show-specific naming and which stems are required live in [`adding-a-new-show.md`](adding-a-new-show.md).

---

## 1. Place source JPEGs

Put each JPEG in the **same folder** where the final WebP must live, using the **final basename** (only the extension differs).

| Destination | Example |
|-------------|---------|
| `assets/images/desktop/espectacles/` | `espectacles_{slug}.jpeg`, `espectacles_{slug}-1.jpeg`, … |
| `assets/images/mobile/espectacles/` | Same filenames as desktop |
| `assets/images/desktop/` | e.g. `hero_cover.jpeg` (home promo) |
| `assets/images/mobile/` | e.g. `hero_cover.jpeg` |

Desktop and mobile need matching filenames. Prefer `.jpeg`; if sources are `.jpg`, adapt the loops below (or rename first).

Do **not** commit JPEGs. Convert → optimize → delete (or leave untracked) the JPEGs; only WebPs are kept in the repo.

---

## 2. Convert JPEG → WebP

Quality: **90**. Output next to the source with the same stem and `.webp`.

Use **`cwebp`** (libwebp). Install with Homebrew if needed: `brew install webp`.

### 2.1 Root-level images (`desktop/` / `mobile/`)

Use this for home covers (`hero_cover`, `hero_footer`) and any other files sitting directly under those folders:

```bash
for file in assets/images/mobile/*.jpeg; do
  [ -e "$file" ] || continue
  cwebp -q 90 "$file" -o "${file%.*}.webp"
done

for file in assets/images/desktop/*.jpeg; do
  [ -e "$file" ] || continue
  cwebp -q 90 "$file" -o "${file%.*}.webp"
done
```

### 2.2 Nested section folders (e.g. shows)

Show assets live under `espectacles/`. Run the same pattern on that folder (repeat for other sections as needed: `tallers/`, `animacions/`, …):

```bash
for file in assets/images/mobile/espectacles/*.jpeg; do
  [ -e "$file" ] || continue
  cwebp -q 90 "$file" -o "${file%.*}.webp"
done

for file in assets/images/desktop/espectacles/*.jpeg; do
  [ -e "$file" ] || continue
  cwebp -q 90 "$file" -o "${file%.*}.webp"
done
```

After conversion, confirm every expected `.webp` exists on **both** desktop and mobile, then remove the source `.jpeg` files from the tree (or ensure they stay untracked).

---

## 3. Optimize WebPs

**Always** run the project optimizer on the **new** assets after conversion:

```bash
npm run optimize:images -- <path-fragment> [<path-fragment>...]
```

Examples:

```bash
# New show stems (matches desktop + mobile under espectacles/)
npm run optimize:images -- espectacles_{slug}

# Home promo covers
npm run optimize:images -- hero_cover
npm run optimize:images -- hero_footer
```

`scripts/optimize-images.ts` treats each argument after `--` as a substring filter on the path relative to `assets/images/`. Prefer filters so only new files are processed.

If you run without filters, the script may rewrite other images that can still shrink — **only keep / stage changes for the new images**. Do not commit unrelated image rewrites.

---

## 4. Checklist

- [ ] JPEGs placed in the correct final folders with final basenames
- [ ] Converted to WebP at quality 90 with `cwebp`
- [ ] Matching desktop + mobile WebPs present
- [ ] Source JPEGs removed or left untracked (not committed)
- [ ] `npm run optimize:images` run with path filters for the new assets
- [ ] Only new (or intentionally replaced) WebP changes staged
