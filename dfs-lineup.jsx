/* ============================================================
   STREAM DFS — lineup builder, contest, two-way sheet
   ============================================================ */

const POWER_MULT = { 2: 3, 3: 6, 4: 10, 5: 20, 6: 37.5 };
const FLEX_MULT = { 2: 2, 3: 3, 4: 6, 5: 10, 6: 20 };

function payout(fee, contest, count) {
  const t = contest === 'power' ? POWER_MULT : FLEX_MULT;
  const m = t[count] || (count > 6 ? t[6] : 0);
  return (fee * m).toFixed(2);
}

function ContestCard({ id, name, desc, rows, on, onSelect }) {
  return (
    <div className={'contest' + (on ? ' on' : '')} onClick={onSelect}>
      {on && <div className="ct-check" style={{ color: '#04211f' }}>{I.check}</div>}
      <div className="ct-name">{name}</div>
      <div className="ct-desc">{desc}</div>
      <div className="minlabel">Minimum guarantee</div>
      {rows.map((r, i) => (
        <div key={i} className="payline small">
          <span className="pl-l">{r.l}</span>
          <span className="pl-x">{r.x}</span>
        </div>
      ))}
    </div>
  );
}

function LineupReview({ picks, pick, clear, contest, setContest, entryFee, onPlay }) {
  const count = picks.length;
  const canPlay = count >= 2;
  const toWin = canPlay ? payout(entryFee, contest, count) : '0.00';
  return (
    <div className="screen">
      <div className="row-between" style={{ marginTop: 6 }}>
        <div className="sec-h tight" style={{ margin: 0 }}>Current Lineup <span className="muted" style={{ fontWeight: 700, fontSize: 15 }}>{count} {count === 1 ? 'Pick' : 'Picks'}</span></div>
        {count > 0 && <span className="clear-link" onClick={clear}>Clear</span>}
      </div>

      {count === 0 ? (
        <div className="empty">
          <div className="ill" style={{ color: 'var(--cyan)' }}>{I.lineups}</div>
          <p style={{ marginBottom: 0 }}>You can complete your lineup<br />when 1+ players are selected.</p>
        </div>
      ) : (
        <div style={{ marginTop: 12 }}>
          {picks.map(({ player, choice }) => (
            <PlayerCard key={player.id} player={player} choice={choice}
              onPick={(c) => pick(player, c)} onRemove={() => pick(player, choice)} />
          ))}
        </div>
      )}

      {count > 0 && (
        <>
          <div className="sec-h">Pick a Contest</div>
          <div className="contest-grid">
            <ContestCard id="flex" name="Flex Play" desc="You must hit 1st place or 2 out of 3 in the lineup."
              rows={FLEX} on={contest === 'flex'} onSelect={() => setContest('flex')} />
            <ContestCard id="power" name="Power Play" desc="You must hit 1st place or 3 out of 3 in the lineup."
              rows={POWER} on={contest === 'power'} onSelect={() => setContest('power')} />
          </div>
          <div className="note">In the event of contest ties, payouts are shared. If you qualify for the 1st place prize and the Minimum Guarantee payout, you receive whichever is higher.</div>

          <div className="fee-grid">
            <div className="fee-box">
              <div className="lab">Entry Fee</div>
              <div className="lab warn">Low Balance</div>
              <div className="amt">${entryFee}</div>
            </div>
            <div className="fee-box">
              <div className="lab">To Win</div>
              <div className="amt cyan">${toWin}</div>
            </div>
          </div>
          <div className="muted" style={{ fontSize: 13, fontWeight: 700, marginTop: 10 }}>Balance: $0.00</div>
          <div className="note">Reversion lineup payouts are different than standard. <a href="#" onClick={(e) => e.preventDefault()}>Learn More</a></div>

          <button className="btn btn-cyan btn-block" style={{ marginTop: 18 }} disabled={!canPlay} onClick={onPlay}>
            {canPlay ? `Play Now · $${entryFee} to win $${toWin}` : 'Select at least 2 players'}
          </button>
        </>
      )}
    </div>
  );
}

function TwoWaySheet({ entryFee, toWin, onClose, onConfirm }) {
  const [done, setDone] = React.useState(false);
  return (
    <div className="sheet-scrim" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grab"></div>
        {done ? (
          <div className="success">
            <div className="ring"><div style={{ width: 40, height: 40 }}>{I.check}</div></div>
            <h3>Lineup Submitted!</h3>
            <p>Your {`$${entryFee}`} entry is in. Track it live under My Lineups —<br />potential payout {`$${toWin}`}.</p>
            <button className="btn btn-cyan btn-block" onClick={onConfirm}>View My Lineups</button>
          </div>
        ) : (
          <>
            <div className="sheet-head">
              <h3>Two Ways to Win</h3>
              <div className="sheet-x" onClick={onClose}>{I.x}</div>
            </div>
            {STANDINGS.map((s) => (
              <div key={s.rank} className="tw-row">
                <span className="tw-rank">{s.rank}</span>
                {s.win && <span className="tw-badge">WIN</span>}
                <div className="tw-user">
                  <div className="u">{s.user}</div>
                  <div className="stars">★★★</div>
                </div>
                <span className="tw-of">{s.of}</span>
                <span className="tw-mult">{s.mult}x</span>
              </div>
            ))}
            <div className="tw-mid">
              <h4>Beat your group to win!</h4>
              <p>Lineups are placed into a group with other members. Get first place in your group to win. In a tie, the payout is adjusted.</p>
            </div>
            <div className="tw-or">OR</div>
            <div className="tw-perfect">
              <span className="bag">{'\uD83D\uDCB0'}</span>
              <span className="arrow" style={{ width: 24 }}>{I.arrowR}</span>
              <span className="group"><span className="n">4 of 4</span></span>
            </div>
            <div className="tw-mid" style={{ paddingTop: 0 }}>
              <h4>Pick a perfect lineup to win!</h4>
              <p>Perfect lineups always win the full payout, no questions asked.</p>
            </div>
            <button className="btn btn-cyan btn-block" style={{ marginTop: 10 }} onClick={() => setDone(true)}>
              Play Now · Win ${toWin}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { LineupReview, TwoWaySheet, payout });
