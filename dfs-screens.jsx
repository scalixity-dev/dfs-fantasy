/* ============================================================
   STREAM DFS — primary screens
   ============================================================ */

function BoardScreen({ sport, setSport, getChoice, pick }) {
  const games = sport === 'Explore' ? GAMES : GAMES.filter((g) => g.league === sport);
  const players = sport === 'Explore' ? PLAYERS : PLAYERS.filter((p) => p.sport === sport);
  return (
    <div className="screen">
      <Seg
        options={[{ id: 'Explore', label: 'Explore' }, { id: 'NHL', label: 'NHL', icon: 'puck' }, { id: 'EPL', label: 'EPL', icon: 'ball' }]}
        value={sport} onChange={setSport}
      />
      <div className="sec-h tight">Featured Games</div>
      <div className="game-rail">
        {games.map((g) => <GameCard key={g.id} game={g} />)}
      </div>
      <div className="sec-h">Next 5 games</div>
      {players.map((p) => (
        <PlayerCard key={p.id} player={p} choice={getChoice(p.id)} onPick={(c) => pick(p, c)} />
      ))}
    </div>
  );
}

function MyLineupsScreen({ entries, onStart }) {
  const [tab, setTab] = React.useState('Open');
  const list = entries.filter((e) => (tab === 'Open' ? e.status === 'open' : e.status !== 'open'));
  return (
    <div className="screen">
      <Seg options={['Open', 'Past']} value={tab} onChange={setTab} />
      {list.length === 0 ? (
        <div className="empty">
          <div className="ill" style={{ color: 'var(--cyan)' }}>{I.lineups}</div>
          <h3>No Lineups{tab === 'Open' ? '!' : ' yet'}</h3>
          <p>Your {tab.toLowerCase()} lineups will appear here.<br />Start a new lineup below!</p>
          <button className="btn btn-cyan" onClick={onStart}>Start a Lineup</button>
        </div>
      ) : (
        <div style={{ marginTop: 16 }}>
          {list.map((e) => (
            <div key={e.id} className="contest" style={{ cursor: 'default', marginBottom: 12 }}>
              <div className="row-between">
                <div style={{ fontWeight: 800, fontSize: 15, whiteSpace: 'nowrap' }}>{e.type} · {e.picks} picks</div>
                <div className="tw-badge" style={{ background: e.status === 'won' ? 'var(--green)' : e.status === 'lost' ? 'var(--surface-3)' : 'var(--cyan)', color: e.status === 'lost' ? 'var(--ink-2)' : '#04211f' }}>
                  {e.status === 'won' ? 'WON' : e.status === 'lost' ? 'LOST' : 'LIVE'}
                </div>
              </div>
              <div className="row-between" style={{ marginTop: 12 }}>
                <div><div className="muted" style={{ fontSize: 12 }}>Entry</div><div style={{ fontWeight: 800 }}>${e.fee}.00</div></div>
                <div style={{ textAlign: 'right' }}><div className="muted" style={{ fontSize: 12 }}>{e.status === 'won' ? 'Won' : 'To Win'}</div><div style={{ fontWeight: 800, color: 'var(--cyan)' }}>${e.win}.00</div></div>
              </div>
              <div className="muted" style={{ fontSize: 12, marginTop: 10 }}>{e.summary}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PromosScreen() {
  const [copied, setCopied] = React.useState(false);
  return (
    <div className="screen">
      <div className="sec-h tight">Refer friends &amp; track rewards</div>
      <div className="promo-hero">
        <div className="big">$20</div>
        <div className="onus">ON US</div>
        <div className="ph-sub">Refer a Friend</div>
        <p>Get up to $20 in bonus funds instantly.<br />Copy the code below to send to others.</p>
        <div className="code">Use CODE: <b>REFMjky</b></div>
        <div className="promo-btns">
          <button className="btn btn-white btn-block">Learn More</button>
          <button className="btn btn-cyan btn-block" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }}>
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>
      <div className="qr-row">
        <div className="qr">{I.qr}</div>
        <div className="qt"><div className="a">Show QR Code</div><div className="b">Quickly invite your friends</div></div>
        <div style={{ color: 'var(--ink-3)', width: 22 }}>{I.chevR}</div>
      </div>
      <div className="qr-row">
        <div className="qr" style={{ background: 'var(--surface-2)', color: 'var(--cyan)' }}>{I.trophy}</div>
        <div className="qt"><div className="a">Referral rewards</div><div className="b">0 friends joined · $0 earned</div></div>
        <div style={{ color: 'var(--ink-3)', width: 22 }}>{I.chevR}</div>
      </div>
    </div>
  );
}

function ProfileScreen({ pub, setPub }) {
  const [tab, setTab] = React.useState('Profile');
  return (
    <div className="screen">
      <Seg options={['Profile', 'Password', 'KYC']} value={tab} onChange={setTab} />
      {tab === 'Profile' && (
        <>
          <div className="prof-av">
            <div style={{ color: 'var(--ink-3)', width: 48, height: 48 }}>{I.profile}</div>
            <div className="edit">{I.pencil}</div>
          </div>
          <div className="prof-name">Test01</div>
          <div className="toggle-row">
            <div>
              <div className="a">Public Profile</div>
              <div className="b">Your profile is visible to the public</div>
            </div>
            <Toggle on={pub} onClick={() => setPub(!pub)} />
          </div>
          <div className="stat-grid">
            <div className="stat-box"><div className="ico">{I.fire}</div><div className="v">0</div><div className="l">Wins</div></div>
            <div className="stat-box"><div className="ico">{I.dollar}</div><div className="v">$0.00</div><div className="l">Total Won</div></div>
          </div>
          <div className="stat-box" style={{ marginTop: 12 }}>
            <div className="ico">{I.trophy}</div><div className="v">$0.00</div><div className="l">Top Win</div>
          </div>
        </>
      )}
      {tab === 'Password' && (
        <div style={{ marginTop: 18 }}>
          {['Current Password', 'New Password', 'Confirm New Password'].map((l) => (
            <div key={l} style={{ marginBottom: 14 }}>
              <div className="minlabel">{l}</div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '14px 16px', color: 'var(--ink-3)', letterSpacing: 3 }}>••••••••</div>
            </div>
          ))}
          <button className="btn btn-cyan btn-block" style={{ marginTop: 6 }}>Update Password</button>
        </div>
      )}
      {tab === 'KYC' && (
        <div style={{ marginTop: 18 }}>
          <div className="note" style={{ marginTop: 0 }}>Verify your identity to withdraw winnings. This keeps your account secure and compliant.</div>
          {[['Identity', 'Not verified', 'var(--red)'], ['Address', 'Not verified', 'var(--red)'], ['Payment method', 'Not added', 'var(--ink-2)']].map(([a, b, c]) => (
            <div key={a} className="toggle-row" style={{ marginTop: 12 }}>
              <div><div className="a">{a}</div><div className="b" style={{ color: c }}>{b}</div></div>
              <div style={{ color: 'var(--ink-3)', width: 22 }}>{I.chevR}</div>
            </div>
          ))}
          <button className="btn btn-cyan btn-block" style={{ marginTop: 18 }}>Start Verification</button>
        </div>
      )}
    </div>
  );
}

function FeedScreen() {
  return (
    <div className="screen">
      <div className="sec-h tight">Activity Feed</div>
      {FEED.map((f) => (
        <div key={f.id} className="feed-card">
          <div className="feed-top">
            <div className="feed-av">{f.init}</div>
            <div><div className="fn">@{f.user}</div><div className="ft">{f.time}</div></div>
            <div className="feed-win">{f.win}</div>
          </div>
          <div className="feed-body"><b>@{f.user}</b> {f.body}</div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { BoardScreen, MyLineupsScreen, PromosScreen, ProfileScreen, FeedScreen });
