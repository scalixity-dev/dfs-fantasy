/* ============================================================
   DFS — shared interactivity
   ============================================================ */
(function () {
  "use strict";

  /* ---------- TICKER ---------- */
  const tickerEl = document.getElementById("ticker");
  if (tickerEl) {
    const props = [
      ["C. McDavid", "Shots on Goal", "3.5"],
      ["E. Haaland", "Shots Att.", "4.5"],
      ["G. Meerschaert", "Sig. Strikes", "14.5"],
      ["A. Matthews", "Goals", "0.5"],
      ["B. Saka", "Shots on Target", "2.5"],
      ["L. Draisaitl", "Points", "1.5"],
      ["J. Malkoun", "Sig. Strikes", "31.5"],
    ];
    const tick = (p) =>
      `<span class="tick"><b>${p[0]}</b> <span style="color:var(--ink-3)">${p[1]}</span> <span class="o">${p[2]}</span></span>`;
    const html = props.map(tick).join("");
    tickerEl.innerHTML = html + html; // duplicate for seamless loop
  }

  /* ---------- SPORT CARDS ---------- */
  const sportGrid = document.getElementById("sportGrid");
  if (sportGrid) {
    const sports = [
      ["MMA", "86 props", "sport-mma", "img/game-mma.jpg", "center 35%"],
      ["NHL", "212 props", "sport-nhl", "img/sport-nhl.webp", "center 22%"],
      ["EPL", "164 props", "sport-epl", "img/game-epl.jpg", "center 18%"],
      ["NFL", "190 props", "sport-nfl", "img/sport-nfl.webp", "center 38%"],
      ["NBA", "308 props", "sport-nba", "img/sport-nba.jpg", "center 30%"],
    ];
    sportGrid.innerHTML = sports
      .map(
        (s) => `
      <a class="sport-card" href="DFS App.html">
        ${s[3]
          ? `<img class="sport-img" src="${s[3]}" alt="${s[0]}" style="object-position:${s[4]}">`
          : `<image-slot id="${s[2]}" placeholder="${s[0]} photo"></image-slot>`}
        <div class="meta"><div class="name">${s[0]}</div><div class="ct">${s[1]}</div></div>
      </a>`
      )
      .join("");
  }

  /* ---------- TRENDING PICKS ---------- */
  const picksGrid = document.getElementById("picksGrid");
  if (picksGrid) {
    const picks = [
      ["GM", "Gerald Meerschaert", "MMA", "vs J. Malkoun", "14.5", "Sig. Strikes"],
      ["CM", "Connor McDavid", "NHL", "EDM vs LAK", "3.5", "Shots on Goal"],
      ["EH", "Erling Haaland", "EPL", "MCI vs ARS", "4.5", "Shots Attempted"],
      ["AM", "Auston Matthews", "NHL", "TOR vs BOS", "0.5", "Goals Scored"],
      ["BS", "Bukayo Saka", "EPL", "ARS vs MCI", "2.5", "Shots on Target"],
      ["JM", "Jacob Malkoun", "MMA", "vs G. Meerschaert", "31.5", "Sig. Strikes"],
    ];
    const up = '<svg viewBox="0 0 24 24" fill="none"><path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const down = '<svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    picksGrid.innerHTML = picks
      .map(
        (p) => `
      <div class="pick-card">
        <div class="pick-top">
          <div class="pick-av">${p[0]}</div>
          <div><div class="pick-name">${p[1]}</div><div class="pick-meta"><span class="badge-sport">${p[2]}</span>${p[3]}</div></div>
        </div>
        <div class="pick-stat"><span class="v">${p[4]}</span><span class="l">${p[5]}</span></div>
        <div class="pick-ml">
          <button data-c="more">${up} More</button>
          <button data-c="less">${down} Less</button>
        </div>
      </div>`
      )
      .join("");
    // visual toggle (one side per card)
    picksGrid.querySelectorAll(".pick-card").forEach((card) => {
      const btns = card.querySelectorAll(".pick-ml button");
      btns.forEach((b) =>
        b.addEventListener("click", () => {
          const wasOn = b.classList.contains("on");
          btns.forEach((x) => x.classList.remove("on"));
          if (!wasOn) b.classList.add("on");
        })
      );
    });
  }

  /* ---------- LIVE MATCHES TABLE ---------- */
  const lmRows = document.getElementById("lmRows");
  if (lmRows) {
    const rows = [
      ["Premier", "Manchester City", "vs Arsenal", "2 — 1", "67'", "1.53", "3.40", "5.20"],
      ["La Liga", "Real Madrid", "vs FC Barcelona", "1 — 1", "54'", "2.15", "3.10", "3.05"],
      ["Bundesliga", "Bayern Munich", "vs Dortmund", "3 — 0", "82'", "1.20", "6.50", "9.00"],
      ["Ligue 1", "PSG", "vs Marseille", "0 — 0", "12'", "1.45", "4.10", "6.80"],
      ["Serie A", "Juventus", "vs AC Milan", "1 — 2", "58'", "3.30", "3.40", "2.05"],
    ];
    lmRows.innerHTML = rows
      .map(
        (r) => `
      <div class="trow">
        <span class="lg-chip">${r[0]}</span>
        <div class="match-cell"><div class="m1">${r[1]}</div><div class="m2">${r[2]}</div></div>
        <div class="sc">${r[3]}</div>
        <div class="tm c-time">● ${r[4]}</div>
        <span class="odds" data-bet="${r[1]} · Home" data-odd="${r[5]}">${r[5]}</span>
        <span class="odds" data-bet="${r[1]} · Draw" data-odd="${r[6]}">${r[6]}</span>
        <span class="odds" data-bet="${r[1]} · Away" data-odd="${r[7]}">${r[7]}</span>
        <div class="bet-btn">BET</div>
      </div>`
      )
      .join("");
  }

  /* ---------- COUNTDOWN ---------- */
  const cd = document.getElementById("cd");
  if (cd) {
    let total = 12 * 3600 + 58;
    const pad = (n) => String(n).padStart(2, "0");
    setInterval(() => {
      total = total > 0 ? total - 1 : 12 * 3600 + 58;
      const h = Math.floor(total / 3600),
        m = Math.floor((total % 3600) / 60),
        s = total % 60;
      cd.textContent = `${pad(h)} : ${pad(m)} : ${pad(s)}`;
    }, 1000);
  }

  /* ============================================================
     LIVE BETTING PAGE — bet slip, market tabs
     ============================================================ */
  const slip = document.getElementById("betSlip");
  if (slip) {
    const slipItems = [];
    const slipBody = document.getElementById("slipBody");
    const slipStake = document.getElementById("slipStake");
    const stakeInput = document.getElementById("stakeInput");
    const payoutEl = document.getElementById("slipPayout");
    const countEl = document.getElementById("slipCount");

    function combinedOdds() {
      return slipItems.reduce((a, b) => a * parseFloat(b.odd), 1);
    }
    function render() {
      countEl.textContent = slipItems.length;
      if (!slipItems.length) {
        slipBody.innerHTML = `
          <div class="slip-empty">
            <div class="slip-empty-ico">▦</div>
            <div>Your bet slip is empty</div>
            <small>Select odds to add bets</small>
          </div>`;
        slipStake.style.display = "none";
        return;
      }
      slipStake.style.display = "block";
      slipBody.innerHTML = slipItems
        .map(
          (it, i) => `
        <div class="slip-item">
          <div class="si-top"><span class="si-name">${it.name}</span><button class="si-x" data-i="${i}">✕</button></div>
          <div class="si-bot"><span class="si-mkt">${it.mkt}</span><span class="si-odd">${it.odd}</span></div>
        </div>`
        )
        .join("");
      slipBody.querySelectorAll(".si-x").forEach((b) =>
        b.addEventListener("click", () => {
          slipItems.splice(+b.dataset.i, 1);
          syncSelected();
          render();
          calc();
        })
      );
    }
    function calc() {
      const stake = parseFloat(stakeInput.value) || 0;
      const odds = combinedOdds();
      payoutEl.textContent = "$" + (stake * odds).toFixed(2);
      const co = document.getElementById("combinedOdds");
      if (co) co.textContent = odds.toFixed(2);
    }
    function syncSelected() {
      document.querySelectorAll(".mkt-odd.sel, .odds.sel").forEach((el) => {
        if (!slipItems.find((it) => it.id === el.dataset.id)) el.classList.remove("sel");
      });
    }

    window.addBet = function (el) {
      const id = el.dataset.id;
      const existing = slipItems.findIndex((it) => it.id === id);
      if (existing > -1) {
        slipItems.splice(existing, 1);
        el.classList.remove("sel");
      } else {
        slipItems.push({
          id,
          name: el.dataset.name,
          mkt: el.dataset.mkt,
          odd: el.dataset.odd,
        });
        el.classList.add("sel");
      }
      render();
      calc();
    };

    if (stakeInput) stakeInput.addEventListener("input", calc);
    document.querySelectorAll("[data-quick]").forEach((b) =>
      b.addEventListener("click", () => {
        stakeInput.value = b.dataset.quick;
        calc();
      })
    );
    render();

    /* market tabs */
    document.querySelectorAll(".mkt-tab").forEach((tab) =>
      tab.addEventListener("click", () => {
        document.querySelectorAll(".mkt-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
      })
    );

    /* match list selection */
    document.querySelectorAll(".rail-match").forEach((m) =>
      m.addEventListener("click", () => {
        document.querySelectorAll(".rail-match").forEach((x) => x.classList.remove("active"));
        m.classList.add("active");
      })
    );
  }

  /* ---------- IMAGE-SLOT REMOVE BUTTON ---------- */
  function setupSlotRemove() {
    document.querySelectorAll("image-slot").forEach((slot) => {
      if (slot.__rm) return;
      slot.__rm = true;
      const parent = slot.parentElement;
      if (!parent) return;
      if (getComputedStyle(parent).position === "static") parent.style.position = "relative";
      const btn = document.createElement("button");
      btn.className = "slot-remove";
      btn.type = "button";
      btn.title = "Remove image";
      btn.setAttribute("aria-label", "Remove image");
      btn.textContent = "✕";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const c = slot.shadowRoot && slot.shadowRoot.querySelector('[data-act="clear"]');
        if (c) c.click();
      });
      parent.appendChild(btn);
      const place = () => {
        btn.style.top = slot.offsetTop + 8 + "px";
        btn.style.left = slot.offsetLeft + slot.offsetWidth - 38 + "px";
        btn.classList.toggle("show", slot.hasAttribute("data-filled"));
      };
      place();
      new MutationObserver(place).observe(slot, { attributes: true, attributeFilter: ["data-filled"] });
      window.addEventListener("resize", place);
    });
  }
  setTimeout(setupSlotRemove, 300);
  setTimeout(setupSlotRemove, 1200);
})();
