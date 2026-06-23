# Yujin's Library — Google Books UI

A vanilla JavaScript book search app built on the Google Books API. Search any title and browse results in an interactive carousel, or explore the curated Best Seller and Today's Book sections below.

![Library UI screenshot](https://i.imgur.com/placeholder.png)

---

## Features

- **Live book search**: queries the Google Books API and populates the carousel with real covers, titles, and authors
- **Book detail modal**: click any book card or carousel result to open a detail panel with full description
- **Image carousel**: swipe or click through featured results with thumbnail navigation
- **Curated sections**: static Best Seller and Today's Book grids for browsing without searching
- **Loading state**: spinner overlay and disabled search button during API fetch
- **Error handling**: inline error banner for failed searches or empty results

---

## Tech Stack

- Vanilla JavaScript (ES6 modules, async/await)
- SCSS (partials, CSS custom properties)
- Google Books API v1
- No frameworks, no bundler

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YujinOk/googlebookui.git
cd googlebookui
```

### 2. Add your API key

The API key is intentionally excluded from this repo. You need your own free Google Books API key.

**Get one:**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project → APIs & Services → Enable **Books API**
3. Credentials → Create API Key
4. (Recommended) Restrict the key to **HTTP referrers** and your domain

**Add it to the project:**

```bash
cp js/config.example.js js/config.js
```

Then open `js/config.js` and replace the placeholder:

```js
export const API_KEY = "YOUR_GOOGLE_BOOKS_API_KEY";
```

### 3. Run locally

Open with any static file server. If you use VS Code:

```
Live Server extension → right-click index.html → Open with Live Server
```

Or with Python:

```bash
python3 -m http.server 5500
```

Then visit `http://localhost:5500`.

> **Note:** ES modules require a server — opening `index.html` directly as a `file://` URL will block imports.

---

## Project Structure

```
googlebookui/
├── index.html          # Main page — carousel, grids, modal
├── style.css           # Compiled styles (source of truth for the browser)
├── styles.scss         # SCSS entry point
├── script.js           # Carousel slide logic
├── js/
│   ├── fetch.js        # Google Books API calls + data transform
│   ├── dom.js          # DOM rendering, modal, search event handling
│   ├── config.js       # Your API key (gitignored)
│   └── config.example.js  # Template — copy to config.js
└── scss/
    ├── _navbar.scss
    ├── _partial.scss   # Carousel + thumbnails
    └── _grid.scss      # Book grid cards
```

---

## What I Learned

- Consuming a REST API with `fetch` and `async/await` in plain JS, including error boundaries and loading states
- Structuring vanilla JS with ES6 modules (`import`/`export`) to keep concerns separated without a framework
- Why parallel arrays are fragile — refactored the original data model to an array of objects mid-project
- Managing client-side API keys: why gitignoring secrets matters even for public hobby projects, and the trade-off between a live demo and clean source history
- CSS custom properties as a runtime theming layer on top of SCSS compile-time variables

---

## What I'd Do Differently

- Add a server-side proxy (e.g. a Netlify Edge Function) so the API key never touches the browser at all
- Replace the static curated grids with dynamic content from the API (e.g. bestseller categories)
- Add keyboard navigation to the carousel (arrow keys)
- Persist recent searches in `localStorage`
