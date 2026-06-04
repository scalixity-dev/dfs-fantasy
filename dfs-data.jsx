/* ============================================================
   STREAM DFS — data + icons
   ============================================================ */

// ---- ICONS (simple, single-color via currentColor) ----
const I = {
  menu: <svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none"><path d="M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M10 20a2 2 0 004 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  moon: <svg viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>,
  board: <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  lineups: <svg viewBox="0 0 24 24" fill="none"><path d="M5 20V10M12 20V4M19 20v-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/></svg>,
  feed: <svg viewBox="0 0 24 24" fill="none"><path d="M5 5a14 14 0 0114 14M5 12a7 7 0 017 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><circle cx="6" cy="18" r="1.6" fill="currentColor"/></svg>,
  promos: <svg viewBox="0 0 24 24" fill="none"><path d="M3 11l13-6v14L3 13v-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M16 8c2 0 3 1.5 3 4s-1 4-3 4" stroke="currentColor" strokeWidth="2"/></svg>,
  profile: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  up: <svg viewBox="0 0 24 24" fill="none"><path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  down: <svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  swap: <svg viewBox="0 0 24 24" fill="none"><path d="M7 7h11l-3-3M17 17H6l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  x: <svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/></svg>,
  arrowR: <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  chevR: <svg viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  fire: <svg viewBox="0 0 24 24" fill="none"><path d="M12 3c1 3-1 4-1 6 0-2-3-2-3 1 0 1-2 2-2 5a6 6 0 1012 0c0-4-4-5-3-9-1 1-2 1-3-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  dollar: <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18M16 7c0-2-2-3-4-3s-4 1-4 3 2 3 4 3 4 1 4 3-2 3-4 3-4-1-4-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  trophy: <svg viewBox="0 0 24 24" fill="none"><path d="M7 4h10v4a5 5 0 01-10 0V4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M7 6H4v1a3 3 0 003 3M17 6h3v1a3 3 0 01-3 3M9 20h6M12 13v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  pencil: <svg viewBox="0 0 24 24" fill="none"><path d="M4 20l4-1L19 8l-3-3L5 16l-1 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>,
  qr: <svg viewBox="0 0 24 24" fill="none"><path d="M4 4h6v6H4V4zM14 4h6v6h-6V4zM4 14h6v6H4v-6zM14 14h3v3M20 14v6h-3M17 20v0" stroke="#0a0a0a" strokeWidth="2" strokeLinejoin="round"/></svg>,
  mma: <svg viewBox="0 0 24 24" fill="none"><path d="M6 10V7a2 2 0 014 0M10 9V6a2 2 0 014 0v3M14 9V7a2 2 0 014 0v6a6 6 0 01-6 6H10a4 4 0 01-4-4v-1l-2-2a1.5 1.5 0 012-2l2 2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  puck: <svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="9" rx="8" ry="3" stroke="currentColor" strokeWidth="2"/><path d="M4 9v6c0 1.7 3.6 3 8 3s8-1.3 8-3V9" stroke="currentColor" strokeWidth="2"/></svg>,
  ball: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 7l3 2-1 4h-4l-1-4 3-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  star: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/></svg>,
};

// ---- DATA ----
const GAMES = [
  { id: 'g1', league: 'MMA', a: 'Wes Schultz', b: 'Ben Johnston', time: 'May 02, 2026 · 1:30 PM', live: '4 props', img: 'img/game-mma.jpg', pos: 'center 35%' },
  { id: 'g2', league: 'EPL', a: 'Liverpool', b: 'Arsenal', time: 'May 02, 2026 · 3:00 PM', live: '18 props', img: 'img/game-epl.jpg', pos: 'center 18%' },
  { id: 'g3', league: 'NHL', a: 'Avalanche', b: 'Oilers', time: 'May 03, 2026 · 7:00 PM', live: '12 props', img: 'img/game-nhl.webp', pos: 'center 30%' },
  { id: 'g4', league: 'NFL', a: 'Eagles', b: 'Chiefs', time: 'May 04, 2026 · 6:30 PM', live: '24 props', img: 'img/sport-nfl.webp', pos: 'center 32%' },
  { id: 'g5', league: 'NBA', a: 'Warriors', b: 'Lakers', time: 'May 04, 2026 · 9:00 PM', live: '31 props', img: 'img/sport-nba.jpg', pos: 'center 30%' },
];

const PLAYERS = [
  { id: 'p1', name: 'Gerald Meerschaert', sport: 'MMA', icon: 'mma', vs: 'GM · vs JM', clock: '00:05:07', stat: 14.5, label: 'Significant Strikes', init: 'GM' },
  { id: 'p2', name: 'Jacob Malkoun', sport: 'MMA', icon: 'mma', vs: 'vs G. Meerschaert', clock: '00:05:07', stat: 31.5, label: 'Significant Strikes', init: 'JM' },
  { id: 'p3', name: 'Connor McDavid', sport: 'NHL', icon: 'puck', vs: 'EDM · vs LAK', clock: '01:24:00', stat: 3.5, label: 'Shots on Goal', init: 'CM' },
  { id: 'p4', name: 'Auston Matthews', sport: 'NHL', icon: 'puck', vs: 'TOR · vs BOS', clock: '01:24:00', stat: 0.5, label: 'Goals Scored', init: 'AM' },
  { id: 'p5', name: 'Erling Haaland', sport: 'EPL', icon: 'ball', vs: 'MCI · vs ARS', clock: '02:10:00', stat: 4.5, label: 'Shots Attempted', init: 'EH' },
  { id: 'p6', name: 'Bukayo Saka', sport: 'EPL', icon: 'ball', vs: 'ARS · vs MCI', clock: '02:10:00', stat: 2.5, label: 'Shots on Target', init: 'BS' },
  { id: 'p7', name: 'Wes Schultz', sport: 'MMA', icon: 'mma', vs: 'vs B. Johnston', clock: '00:42:18', stat: 1.5, label: 'Takedowns', init: 'WS' },
  { id: 'p8', name: 'Leon Draisaitl', sport: 'NHL', icon: 'puck', vs: 'EDM · vs LAK', clock: '01:24:00', stat: 1.5, label: 'Points', init: 'LD' },
];

const FEED = [
  { id: 'f1', user: 'closeyeqalpony', init: 'C', time: '2m ago', win: '+$80', body: 'hit a 4-of-4 Power Play on MMA strikes \u2014 perfect lineup!' },
  { id: 'f2', user: 'rickdunkz', init: 'R', time: '14m ago', win: '+$240', body: 'cashed a 5-leg Flex Play across NHL shots on goal.' },
  { id: 'f3', user: 'mia_bets', init: 'M', time: '38m ago', win: '+$50', body: 'beat their group with Haaland over 4.5 shots.' },
];

const STANDINGS = [
  { rank: 1, user: '@closeyeqalpony', of: '4 of 4', mult: '4.0', win: true },
  { rank: 2, user: '@gridiron_gus', of: '3 of 4', mult: '2.4', win: false },
  { rank: 3, user: '@kdtheking', of: '3 of 4', mult: '2.4', win: false },
];

const FLEX = [
  { l: '1st place pays', x: '3x' },
  { l: '3 correct pays', x: '2.4x' },
  { l: '2 correct pays', x: '1.0x' },
];
const POWER = [
  { l: '1st place pays', x: '6x' },
  { l: '3 correct pays', x: '4.8x' },
];

Object.assign(window, { I, GAMES, PLAYERS, FEED, STANDINGS, FLEX, POWER });
