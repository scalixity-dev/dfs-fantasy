# DFS — Daily Fantasy Pick'em

Implementation of the **DFS** design from Claude Design. A PrizePicks-style daily-fantasy
"More or Less" app in a near-black + cyan (`#2bcdd3`) visual language: pick players, call
their projected stat **More** or **Less**, build a lineup, win real prizes.

## Screens

- **`DFS.html`** — marketing landing page. Odds ticker, "More or Less. Win Real Prizes."
  hero with a **live phone preview** (iframes the app), "Three Steps To Win", sport cards
  (MMA / NHL / EPL / NFL / NBA) with real photos, trending "More/Less" pick cards, a
  Flex Play vs Power Play payout comparison, a refer-a-friend promo (also a phone preview),
  and footer.
- **`DFS App.html`** — the mobile app itself, a **React prototype** rendered inside an
  iOS device frame. Board, My Lineups, Feed, Promos, and Profile tabs; tap More/Less to
  build a lineup, pick a contest, and submit through the "Two Ways to Win" sheet. The
  landing page embeds this file in its hero and promo phone mockups.
  Open the promos tab directly via `DFS App.html?tab=promos`.
- **`Live Betting.html`** — a live-betting interface kept from an earlier design iteration
  (now off the main nav). Working bet slip with combined odds and payout.

## Run

Static site, but the pages fetch JSON/JSX and embed each other via iframes, so serve over
HTTP rather than opening via `file://`:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/DFS.html
```

## Files

| File | Purpose |
| --- | --- |
| `DFS.html` | landing page |
| `DFS App.html` | mobile app shell (loads React + the `.jsx` modules via Babel) |
| `dfs.css` | landing-page styles + design tokens |
| `dfs-app.css` | mobile-app design system |
| `app.js` | landing interactivity — ticker, sport cards, trending picks |
| `ios-frame.jsx` | reusable iOS 26 device frame / status bar / keyboard |
| `dfs-data.jsx` | app data + icon set |
| `dfs-ui.jsx` | shared app components (TopBar, BottomNav, cards) |
| `dfs-screens.jsx` | Board / Lineups / Feed / Promos / Profile screens |
| `dfs-lineup.jsx` | lineup builder, contest cards, two-way sheet, payout math |
| `dfs-main.jsx` | app root + state |
| `img/` | sport / game photos |
| `image-slot.js` | `<image-slot>` drag-and-drop component (used by Live Betting) |
| `live.css` / `Live Betting.html` | the carried-over live-betting screen |

> Note: `DFS App.html` loads React, ReactDOM, and Babel from `unpkg.com`, so the app phone
> previews need network access. The landing page's own content renders without it.
>
> The `<image-slot>` component is adapted from the prototype to persist uploads to
> `localStorage` when the Claude Design runtime (`window.omelette`) is absent — so the
> stadium drop-zone on the Live Betting page stays functional standalone.
