# Ashmit Srivastava, portfolio

A static portfolio site built with plain HTML, CSS and JavaScript. No build step, no dependencies.

## Files

```
portfolio/
├── index.html      Page markup (all sections)
├── styles.css      Design tokens, layout, components, responsive rules
├── script.js       Mobile menu, active-section highlight, footer year
├── README.md
└── assets/
    ├── ashmit-480.webp / ashmit-800.webp   Hero portrait (WebP)
    ├── ashmit-480.jpg  / ashmit-800.jpg    Hero portrait (JPEG fallback)
    ├── Ashmit_Srivastava_Resume.pdf        Downloadable résumé
    ├── almailem-group-480/800 (.webp, .jpg)  Photo shown in the Al Mailem Group experience
    ├── xylofy-logo.webp                    XYlofy AI logo shown in the experience section
    └── favicon.svg
```

## Run locally

Option A: open `index.html` in a browser. Everything works from the file system.

Option B: serve it (closer to production):

```bash
cd portfolio
python3 -m http.server 8000
```

Then open http://localhost:8000.

The heading font (Bricolage Grotesque) loads from Google Fonts, so it needs an internet connection. Offline, the site falls back to the system sans-serif font and stays fully usable.

## Deploy to GitHub Pages

1. Create a new repository on GitHub, for example `portfolio`.
2. Upload the contents of this folder so that `index.html` sits at the **root** of the repository (not inside a subfolder).
   - With Git:
     ```bash
     cd portfolio
     git init
     git add .
     git commit -m "Add portfolio site"
     git branch -M main
     git remote add origin https://github.com/<your-username>/portfolio.git
     git push -u origin main
     ```
3. In the repository, open **Settings > Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch **main** and folder **/ (root)**, then save.
5. After a minute or two the site is live at `https://<your-username>.github.io/portfolio/`.

To use your root address (`https://<your-username>.github.io`), name the repository exactly `<your-username>.github.io`.

All links in the site are relative, so it works under a `/portfolio/` sub-path without changes.

## Deploy to Netlify

**Drag and drop (fastest):**
1. Go to https://app.netlify.com/drop.
2. Drag the whole `portfolio` folder onto the page.
3. Netlify gives you a live URL immediately. Rename it under **Site configuration > Change site name**.

**From GitHub (auto-updates on every push):**
1. Push the folder to a GitHub repository as above.
2. In Netlify choose **Add new site > Import an existing project** and pick the repository.
3. Leave the build command empty and set the publish directory to `.` (the repository root), then deploy.

## Project visuals

The Power BI Sales Dashboard and Sales Forecasting Dashboard each have a tabbed **layout sketch**. These are simple drawings of the structure named in your résumé (KPIs, slicers, drill-through, and the four forecasting modules). They contain no data and are labeled "not a screenshot" on the page.

To replace a sketch with a real screenshot:

1. Export the screenshot (PNG or JPEG, about 1200 px wide) and save it in `assets/`, for example `assets/powerbi-kpis.jpg`.
2. In `index.html`, find the tab panel you want (for example `id="pb-panel-1"`) and replace its `<svg>...</svg>` with:
   ```html
   <button class="photo-button" type="button" data-lightbox
           data-full="assets/powerbi-kpis.jpg"
           data-alt="Describe what the screenshot shows"
           data-caption="Power BI sales dashboard, KPI page">
     <img src="assets/powerbi-kpis.jpg" width="1200" height="675" alt="Describe what the screenshot shows" loading="lazy">
   </button>
   ```
   Clicking it opens the same enlarge viewer used for the Al Mailem Group photo.
3. Update the figure caption ("Layout sketch of the structure, not a screenshot") to match.

## Things to update later

- **Website icon:** the globe icon in the hero links to `./`, which resolves to this site's own address once deployed. If you want it to point somewhere else (a custom domain, for example), change the `href` on the link with `aria-label="Portfolio website (this site)"` in `index.html`.
- **House Price Prediction and Employee Attrition Analysis:** your résumé has no repository links for these two, so they have none here. To add one, copy the `text-link` block from the Power BI project in `index.html` into the project's `project-body`.
- **Résumé:** replace `assets/Ashmit_Srivastava_Resume.pdf` with a newer PDF, keeping the same file name, and every download button picks it up.
- **Photos:** replace the four files in `assets/` named `ashmit-*` for the hero portrait (keep a 3:4 ratio), or `almailem-group-*` for the experience photo.
- **Colors:** the lime accent and background colors are variables at the top of `styles.css` (`--lime`, `--bg`, and so on).

## Notes on accessibility and performance

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), a skip link and visible keyboard focus styles.
- The mobile menu is a real button with `aria-expanded`; it closes on link click, Escape, or a click outside it, and its links are not focusable while it is closed.
- Icon-only links carry accessible names; external links announce that they open in a new tab.
- The hero portrait is served as WebP with a JPEG fallback in two sizes (about 40 to 100 KB for WebP).
- Animation is limited to one entrance sequence in the hero and hover or focus feedback, and it is switched off for visitors who prefer reduced motion.
