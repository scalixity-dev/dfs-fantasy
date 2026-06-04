/* ============================================================
   STREAM DFS — shared UI components
   ============================================================ */

function Avatar({ init, size = 52, radius = 12 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius, flexShrink: 0,
      background: 'linear-gradient(150deg,#0f4448,#0a2c2f)',
      display: 'grid', placeItems: 'center',
      fontWeight: 800, fontSize: size * 0.34, color: '#7fe3e8',
      border: '1px solid rgba(43,205,211,0.25)',
    }}>{init}</div>
  );
}

function TopBar({ balance = '$0.00', onMenu }) {
  return (
    <div className="topbar">
      <div className="tb-icon" onClick={onMenu}>{I.menu}</div>
      <div className="tb-logo">DFS</div>
      <div className="tb-bal">{balance}</div>
      <div className="tb-right">
        <div className="tb-icon">{I.moon}</div>
        <div className="tb-icon">{I.bell}</div>
      </div>
    </div>
  );
}

const NAV = [
  ['board', 'Board', 'board'],
  ['lineups', 'My Lineups', 'lineups'],
  ['feed', 'Feed', 'feed'],
  ['promos', 'Promos', 'promos'],
  ['profile', 'Profile', 'profile'],
];
function BottomNav({ tab, setTab }) {
  return (
    <div className="botnav">
      {NAV.map(([id, label, icon]) => (
        <div key={id} className={'nav-item' + (tab === id ? ' on' : '')} onClick={() => setTab(id)}>
          {I[icon]}
          <span className="nl">{label}</span>
        </div>
      ))}
    </div>
  );
}

function Seg({ options, value, onChange }) {
  return (
    <div className="seg">
      {options.map((o) => {
        const id = typeof o === 'string' ? o : o.id;
        const label = typeof o === 'string' ? o : o.label;
        const ic = typeof o === 'object' ? o.icon : null;
        return (
          <button key={id} className={value === id ? 'on' : ''} onClick={() => onChange(id)}>
            {ic && I[ic]}{label}
          </button>
        );
      })}
    </div>
  );
}

function Toggle({ on, onClick }) {
  return <div className={'tgl' + (on ? ' on' : '')} onClick={onClick} role="switch" aria-checked={on}></div>;
}

function GameCard({ game, onOpen }) {
  return (
    <div className="game-card" onClick={onOpen}>
      {game.img && (
        <div className="gc-bg" style={{
          backgroundImage: `linear-gradient(180deg, rgba(6,16,18,0.45) 0%, rgba(6,16,18,0.55) 45%, rgba(6,16,18,0.92) 100%), url(${game.img})`,
          backgroundPosition: `center, ${game.pos || 'center'}`,
        }} />
      )}
      <div className="league">{game.league}</div>
      <div className="gc-pill">{game.live}</div>
      <div>
        <div className="gc-vs">{game.a}<br /><span style={{ color: '#9fdfe2', fontWeight: 700, fontSize: 13 }}>vs</span> {game.b}</div>
        <div className="gc-time">{game.time}</div>
      </div>
    </div>
  );
}

/* PlayerCard — board mode (pick More/Less) and lineup mode (removable) */
function PlayerCard({ player, choice, onPick, onRemove }) {
  return (
    <div className={'pcard' + (choice ? ' sel' : '')}>
      {onRemove && <div className="pc-x" onClick={onRemove}>{I.x}</div>}
      <div className="pc-top">
        <Avatar init={player.init} />
        <div className="pc-id">
          <div className="pc-name">{player.name}</div>
          <div className="pc-meta">
            <span className="badge-sport">{player.sport}</span>
            <span className="pc-vs">{player.vs}</span>
          </div>
          <div className="pc-clock" style={{ marginTop: 5 }}>● {player.clock}</div>
        </div>
      </div>
      <div className="pc-stat">
        <div className="swap">{I.swap}</div>
        <span className="v">{player.stat}</span>
        <span className="lab">{player.label}</span>
      </div>
      <div className="ml-row">
        <button className={'ml-btn' + (choice === 'more' ? ' on' : '')} onClick={() => onPick('more')}>
          {I.up} More
        </button>
        <button className={'ml-btn' + (choice === 'less' ? ' on' : '')} onClick={() => onPick('less')}>
          {I.down} Less
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { Avatar, TopBar, BottomNav, Seg, Toggle, GameCard, PlayerCard });
