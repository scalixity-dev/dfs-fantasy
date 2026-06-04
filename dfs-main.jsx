/* ============================================================
   STREAM DFS — app root
   ============================================================ */

function App() {
  const _params = new URLSearchParams(location.search);
  const _initTab = ['board', 'lineups', 'feed', 'promos', 'profile'].includes(_params.get('tab')) ? _params.get('tab') : 'board';
  const [tab, setTab] = React.useState(_initTab);
  const [view, setView] = React.useState('main'); // main | review
  const [sport, setSport] = React.useState('Explore');
  const [picks, setPicks] = React.useState([]);
  const [contest, setContest] = React.useState('power');
  const [pub, setPub] = React.useState(true);
  const [showTwoWay, setShowTwoWay] = React.useState(false);
  const entryFee = 20;

  const [entries, setEntries] = React.useState([
    { id: 'e0', type: 'Power Play', picks: 3, fee: 20, win: 120, status: 'won', summary: 'Hit 3/3 · McDavid, Haaland, Saka all Over' },
    { id: 'e1', type: 'Flex Play', picks: 4, fee: 10, win: 60, status: 'lost', summary: '2/4 correct · NHL shots night' },
  ]);

  const getChoice = (id) => { const p = picks.find((x) => x.player.id === id); return p ? p.choice : null; };

  function pick(player, choice) {
    setPicks((prev) => {
      const ex = prev.find((x) => x.player.id === player.id);
      if (!ex) return [...prev, { player, choice }];
      if (ex.choice === choice) return prev.filter((x) => x.player.id !== player.id); // toggle off
      return prev.map((x) => (x.player.id === player.id ? { ...x, choice } : x)); // switch more/less
    });
  }
  const clear = () => setPicks([]);

  const count = picks.length;
  const canPlay = count >= 2;
  const toWin = canPlay ? payout(entryFee, contest, count) : '0.00';

  function goTab(t) { setTab(t); setView('main'); setShowTwoWay(false); }

  function confirmEntry() {
    const summary = picks.map((p) => `${p.player.init} ${p.choice === 'more' ? 'Over' : 'Under'}`).join(' · ');
    const entry = { id: 'e' + Date.now(), type: contest === 'power' ? 'Power Play' : 'Flex Play', picks: count, fee: entryFee, win: Math.round(parseFloat(toWin)), status: 'open', summary };
    setEntries((prev) => [entry, ...prev]);
    setPicks([]);
    setShowTwoWay(false);
    setView('main');
    setTab('lineups');
  }

  let body;
  if (view === 'review') {
    body = <LineupReview picks={picks} pick={pick} clear={clear} contest={contest} setContest={setContest} entryFee={entryFee} onPlay={() => setShowTwoWay(true)} />;
  } else if (tab === 'board') {
    body = <BoardScreen sport={sport} setSport={setSport} getChoice={getChoice} pick={pick} />;
  } else if (tab === 'lineups') {
    body = <MyLineupsScreen entries={entries} onStart={() => setView('review')} />;
  } else if (tab === 'feed') {
    body = <FeedScreen />;
  } else if (tab === 'promos') {
    body = <PromosScreen />;
  } else {
    body = <ProfileScreen pub={pub} setPub={setPub} />;
  }

  const showSlip = count > 0 && view === 'main' && (tab === 'board' || tab === 'lineups');

  return (
    <IOSDevice dark>
      <div className="dfs-app">
        <TopBar balance="$0.00" />
        {view === 'review' && (
          <div style={{ padding: '0 18px 4px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--cyan)', fontWeight: 700, fontSize: 14, flexShrink: 0 }} onClick={() => goTab('board')}>
            <span style={{ display: 'inline-flex', width: 18, transform: 'rotate(180deg)' }}>{I.chevR}</span> Back to Board
          </div>
        )}
        {body}

        {showSlip && (
          <div className="slipbar" onClick={() => setView('review')}>
            <div className="cnt">{count}</div>
            <div className="st">{count} {count === 1 ? 'pick' : 'picks'} in lineup{canPlay ? ` · to win $${toWin}` : ''}</div>
            <div className="go">{count < 2 ? 'Add 1+' : 'Continue'} <span style={{ width: 16, display: 'inline-flex' }}>{I.arrowR}</span></div>
          </div>
        )}

        <BottomNav tab={tab} setTab={goTab} />

        {showTwoWay && <TwoWaySheet entryFee={entryFee} toWin={toWin} onClose={() => setShowTwoWay(false)} onConfirm={confirmEntry} />}
      </div>
    </IOSDevice>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
