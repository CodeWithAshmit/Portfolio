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

## Test locally in VS Code

1. Open the `portfolio` folder in VS Code (**File > Open Folder**).
2. Install the **Live Server** extension (by Ritwick Dey) if you do not have it.
3. Right-click `index.html` and choose **Open with Live Server**. The site opens at http://127.0.0.1:5500 and reloads when you save a file.
4. Before deploying, check: every nav link, the mobile menu (press F12, then the device toolbar icon, and pick a phone size), the résumé download, and the ResearchPilot GitHub button.

## Update your existing Netlify site

Your site is https://ashmit-srivastava.netlify.app/. Keep the same site so the address does not change.

- **If you deployed by drag and drop:** open your site in Netlify, go to the **Deploys** tab, and drag the whole `portfolio` folder onto the "Drag and drop your site output folder here" area. It publishes a new version on the same address.
- **If the site is connected to a GitHub repository:** replace the files in your local copy of that repository with these, then commit and push (`git add . && git commit -m "Upgrade portfolio" && git push`). Netlify redeploys automatically. Leave the build command empty and the publish directory as `.`.

Hard-refresh the live page afterward (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac) so your browser does not show cached files.

## Add the ResearchPilot live demo

The Live demo button is disabled on purpose, because no deployed URL exists yet. Once ResearchPilot is deployed (for example on Streamlit Community Cloud, Hugging Face Spaces or Render):

1. Open `index.html` and search for `LIVE DEMO`.
2. Replace the line `<button class="btn btn-demo" type="button" disabled>Live demo coming soon</button>` with the `<a>` shown in the comment above it, putting your real URL in `href`.
3. Delete the comment, save, and redeploy.

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

- **Website icon:** the globe icon links to https://ashmit-srivastava.netlify.app/ (the address in your résumé). If you move to a custom domain, update that link in `index.html`.
- **House Price Prediction and Employee Attrition Analysis:** your résumé has no repository links for these two, so they have none here. To add one, copy the `text-link` block from the Power BI project in `index.html` into the project's `project-body`.
- **Résumé:** replace `assets/Ashmit_Srivastava_Resume.pdf` with a newer PDF, keeping the same file name, and every download button picks it up.
- **Photos:** replace the four files in `assets/` named `ashmit-*` for the hero portrait (keep a 3:4 ratio), or `almailem-group-*` for the experience photo.
- **Colors:** the lime accent and background colors are variables at the top of `styles.css` (`--lime`, `--bg`, and so on).

## Notes on accessibility and performance

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), a skip link and visible keyboard focus styles.
- The mobile menu is a real button with `aria-expanded`; it closes on link click, Escape, or a click outside it, and its links are not focusable while it is closed.
- Icon-only links carry accessible names; external links announce that they open in a new tab.
- The hero portrait is served as WebP with a JPEG fallback in two sizes (about 40 to 100 KB for WebP).
- Animation: a staggered slide-in on the hero, scroll-triggered slide reveals (Intersection Observer), hover and focus feedback, and two small floating shapes in the hero that pause when off screen. Reveals are added by JavaScript, so without JavaScript every section is simply visible. Visitors who prefer reduced motion get no movement at all.
