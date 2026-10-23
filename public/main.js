// AnyChat landing — page behaviour, shared by / (Transcript) and /switchboard. No dependencies.
// Each block looks for its elements and does nothing when the page has none of them.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var $ = function (id) { return document.getElementById(id); };

  // ── Ad landing helpers ──────────────────────────────────
  var query = new URLSearchParams(location.search);
  var variant = window.heroVariants && window.heroVariants[query.get('v')];
  if (variant && $('hero-l1')) {
    $('hero-l1').textContent = variant.l1;
    $('hero-l2').textContent = variant.l2;
    $('hero-sub').textContent = variant.sub;
  }
  var utm = [];
  query.forEach(function (v, k) { if (/^utm_/i.test(k)) utm.push([k, v]); });
  if (utm.length) {
    document.querySelectorAll('a[href*=".setapp.com"], a[href*="//setapp.com"]').forEach(function (a) {
      var u = new URL(a.href);
      utm.forEach(function (kv) { u.searchParams.set(kv[0], kv[1]); });
      a.href = u.toString();
    });
  }

  // ── Nav ─────────────────────────────────────────────────
  var nav = $('nav');
  var navCta = nav.querySelector('.nav-cta');
  var heroCta = $('hero-cta');
  new IntersectionObserver(function (entries) {
    var hidden = !entries[0].isIntersecting;
    nav.classList.toggle('show-cta', hidden);
    navCta.tabIndex = hidden ? 0 : -1;
    navCta.setAttribute('aria-hidden', hidden ? 'false' : 'true');
  }, { rootMargin: '-64px 0px 0px 0px' }).observe(heroCta);

  var burger = $('nav-burger');
  var backdrop = $('nav-backdrop');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  backdrop.addEventListener('click', function () { setMenu(false); });
  nav.querySelectorAll('.nav-links a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); burger.focus(); } });
  window.addEventListener('resize', function () { if (window.innerWidth > 1080 && nav.classList.contains('is-open')) setMenu(false); });

  var links = Array.prototype.slice.call(nav.querySelectorAll('.nav-links a:not(.nav-menu-cta)'));
  var sectionObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(function (a) { var s = document.querySelector(a.getAttribute('href')); if (s) sectionObs.observe(s); });
  window.addEventListener('scroll', function () {
    if (window.scrollY < 200) links.forEach(function (a) { a.classList.remove('is-active'); });
  }, { passive: true });

  // ── Scroll reveal, staggered within a group that enters together ──
  var pending = [];
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      revealObs.unobserve(e.target);
      pending.push(e.target);
    });
    if (!pending.length) return;
    var batch = pending.splice(0);
    batch.forEach(function (el, i) { setTimeout(function () { el.classList.add('is-in'); }, reduced ? 0 : Math.min(i, 6) * 90); });
  }, { rootMargin: '0px 0px -8% 0px' });
  // Whatever is already on the first screen shows at once (IntersectionObserver may not fire in a hidden tab),
  // then the observer takes over for everything below the fold.
  var firstScreen = [];
  document.querySelectorAll('.reveal').forEach(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight) firstScreen.push(el); else revealObs.observe(el);
  });
  firstScreen.forEach(function (el, i) { setTimeout(function () { el.classList.add('is-in'); }, reduced ? 0 : 120 + i * 140); });

  // ── Transcript hero: the first question types itself ────
  var heroQ = $('hero-q');
  if (heroQ && !reduced) {
    var full = heroQ.dataset.text;
    heroQ.textContent = '';
    heroQ.parentElement.classList.add('typing');
    (async function () {
      await sleep(300);
      for (var i = 1; i <= full.length; i++) { heroQ.textContent = full.slice(0, i); await sleep(42 + Math.random() * 36); }
      heroQ.parentElement.classList.remove('typing');
    })();
  }

  // ── Switchboard hero: the active model slides along the rail; the reply re-streams ──
  var rail = $('track');
  if (rail && window.track) {
    var stops = rail.querySelectorAll('.stop');
    var thumb = $('thumb');
    var tId = $('track-id'), tWhere = $('track-where'), tText = $('track-text');
    var models = window.track.models;
    var visible = true, wake = null;
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; if (visible && wake) { wake(); wake = null; } }).observe(rail);
    function setStop(i) {
      stops.forEach(function (s, k) { s.classList.toggle('on', k === i); });
      // Thumb width is one fifth of the rail; slide by whole stops (gap included).
      var w = stops[0].getBoundingClientRect().width + 4;
      thumb.style.transform = 'translateX(' + (i * w) + 'px)';
    }
    async function stream(el, text, pace) {
      var words = text.split(' ');
      el.textContent = '';
      for (var i = 0; i < words.length; i++) { el.textContent += (i ? ' ' : '') + words[i]; await sleep(pace + Math.random() * pace); }
    }
    if (reduced) {
      setStop(0);
    } else {
      (async function () {
        var i = 0;
        for (;;) {
          if (!visible) await new Promise(function (r) { wake = r; });
          await sleep(i === 0 ? 2200 : 3200);
          i = (i + 1) % models.length;
          setStop(i);
          tId.textContent = models[i].id;
          tWhere.textContent = models[i].where;
          await sleep(300);
          await stream(tText, models[i].text, 38);
        }
      })();
      window.addEventListener('resize', function () { var on = rail.querySelector('.stop.on'); setStop(Number(on.dataset.i)); });
    }
  }

  // ── Spec sheet: rows open on hover with a fine pointer; tap, click or Enter toggles anywhere ──
  var spec = $('spec');
  if (spec) {
    var specRows = Array.prototype.slice.call(spec.querySelectorAll('.spec-row'));
    var setOpen = function (row, open) {
      row.classList.toggle('open', open);
      row.querySelector('.spec-head').setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    specRows.forEach(function (row) {
      row.querySelector('.spec-head').addEventListener('click', function () { setOpen(row, !row.classList.contains('open')); });
    });
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      // Accordion on hover: a short delay so sweeping across rows doesn't flicker them open.
      var hoverT = null;
      specRows.forEach(function (row) {
        row.addEventListener('mouseenter', function () {
          clearTimeout(hoverT);
          hoverT = setTimeout(function () { specRows.forEach(function (r) { setOpen(r, r === row); }); }, 90);
        });
      });
      spec.addEventListener('mouseleave', function () {
        clearTimeout(hoverT);
        hoverT = setTimeout(function () { specRows.forEach(function (r) { setOpen(r, false); }); }, 220);
      });
    }
  }

  // ── Count-up for numbers (.stat-n on /, .big on /switchboard) ──
  var countObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      countObs.unobserve(e.target);
      var el = e.target, target = Number(el.dataset.count), suffix = el.dataset.suffix || '', t0 = performance.now(), dur = 1100;
      if (reduced || !target) return;
      (function tick(now) {
        var p = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: .6 });
  document.querySelectorAll('[data-count]').forEach(function (el) { countObs.observe(el); });

  // ── Closing: questions typed one after another, only while on screen ──
  var ct = $('closing-typed');
  if (ct && !reduced) {
    var prompts = JSON.parse(ct.dataset.prompts || '[]');
    var ctVisible = false, ctWake = null;
    new IntersectionObserver(function (entries) {
      ctVisible = entries[0].isIntersecting;
      if (ctVisible && ctWake) { ctWake(); ctWake = null; }
    }).observe(ct);
    (async function () {
      var k = 0;
      for (;;) {
        if (!ctVisible) await new Promise(function (r) { ctWake = r; });
        await sleep(1900);
        var shown = ct.textContent;
        for (var d = shown.length - 1; d >= 0; d--) { ct.textContent = shown.slice(0, d); await sleep(12); }
        await sleep(320);
        k = (k + 1) % prompts.length;
        var p = prompts[k];
        for (var i = 1; i <= p.length; i++) { ct.textContent = p.slice(0, i); await sleep(38 + Math.random() * 34); }
      }
    })();
  }

  // ════════════════ /blueprint ════════════════
  var pad = function (n, w) { return String(n).padStart(w, '0'); };
  var stream = async function (el, text, pace, alive) {
    var words = text.split(' ');
    el.textContent = '';
    for (var i = 0; i < words.length; i++) {
      if (alive && !alive()) return;
      el.textContent += (i ? ' ' : '') + words[i];
      await sleep(pace + Math.random() * pace);
    }
  };

  // ── Model drum: click a name, scroll, drag, the thumbwheel or arrow keys; the window re-answers ──
  var dialEl = $('dial');
  if (dialEl && window.dial) {
    var dModels = window.dial.models, dN = dModels.length;
    var items = dialEl.querySelectorAll('.dr-i'), thumb = $('drum-thumb');
    var dIdx = 0, dGen = 0, tried = { 0: true }, triedCount = 1, complete = false, prevOff = [], thumbY = 0;
    var rows = document.querySelectorAll('.wf-r');
    var winMain = document.querySelector('.win-main'), handText = $('hand-text');
    // Autoplay: until someone touches the drum it rolls to the next model by itself, a few seconds after each
    // answer has finished, so the motion and its effect are both visible. Any touch hands control over for good.
    var auto = !reduced, autoTimer = null, inView = false;
    var scheduleAuto = function (delay) {
      clearTimeout(autoTimer);
      if (!auto) return;
      autoTimer = setTimeout(function () {
        if (!auto) return;
        if (!inView || document.hidden) { scheduleAuto(1500); return; }
        setDial(dIdx + 1, false);
      }, delay);
    };
    var stopAuto = function () {
      if (!auto) return;
      auto = false; clearTimeout(autoTimer);
      var b = $('mod-auto'); if (b) b.classList.add('off');
      if (handText && !complete) handText.textContent = 'Roll it to switch the model';
    };
    // Each name sits on a cylinder: its signed distance from the selected one sets the angle.
    var layout = function () {
      var R = 52, step = 40 * Math.PI / 180;
      items.forEach(function (el, k) {
        var off = k - dIdx;
        if (off > dN / 2) off -= dN;
        if (off < -dN / 2) off += dN;
        var jump = prevOff[k] === undefined || Math.abs(prevOff[k] - off) > 2; // first paint, or wrapping round the back
        if (jump) el.classList.add('jump');
        var th = off * step, y = R * Math.sin(th), sc = Math.max(.15, Math.cos(th));
        el.style.transform = 'translateY(' + y.toFixed(1) + 'px) scaleY(' + sc.toFixed(3) + ')';
        el.style.opacity = off === 0 ? 1 : Math.abs(off) === 1 ? .6 : 0; // the chosen name and its two neighbours
        el.classList.toggle('on', off === 0);
        if (jump) { void el.offsetWidth; el.classList.remove('jump'); }
        prevOff[k] = off;
      });
    };
    var showFive = function () {
      if (winMain) winMain.classList.add('five');
      if (handText) handText.textContent = 'Five answers. That’s the point.';
    };
    var setDial = function (i, fromUser) {
      var prev = dIdx;
      dIdx = (i + dN) % dN;
      var m = dModels[dIdx];
      layout();
      if (thumb && prev !== dIdx) { thumbY += ((dIdx - prev + dN) % dN === 1 ? -10 : 10); thumb.style.backgroundPosition = '0 ' + thumbY + 'px'; }
      rows.forEach(function (r, k) { r.classList.toggle('cur', k === dIdx); });
      dialEl.setAttribute('aria-valuenow', dIdx);
      dialEl.setAttribute('aria-valuetext', m.id + ', ' + m.where);
      var mw = $('mod-where');
      if (mw) { mw.dataset.where = /mac/i.test(m.where) ? 'mac' : /key/i.test(m.where) ? 'key' : 'setapp'; mw.lastChild.textContent = m.where; }
      $('ro-id').textContent = m.id;
      $('ro-where').textContent = m.where;
      // The model chip in the window's composer follows the drum, tinted by where the model runs.
      var wm = $('win-model');
      if (wm) {
        wm.dataset.where = /mac/i.test(m.where) ? 'mac' : /key/i.test(m.where) ? 'key' : 'setapp';
        wm.querySelector('.wm-id').textContent = m.id;
        wm.classList.remove('pulse'); void wm.offsetWidth; wm.classList.add('pulse');
      }
      // Once every model has answered, the last one completes the set.
      var finishing = false;
      if (fromUser && !tried[dIdx]) {
        tried[dIdx] = true; triedCount++;
        finishing = triedCount === dN && !complete;
        if (finishing) complete = true;
      }
      if (complete && !finishing) return; // the five answers are on screen; the drum now just points at one
      var g = ++dGen, reply = $('wm-reply');
      if (reduced) { $('ro-text').textContent = m.text; if (finishing) showFive(); return; }
      if (reply) reply.classList.add('thinking');
      sleep(380).then(function () {
        if (g !== dGen) return;
        if (reply) reply.classList.remove('thinking');
        return stream($('ro-text'), m.text, 34, function () { return g === dGen; });
      }).then(function () {
        if (finishing) return sleep(900).then(showFive);
        if (auto && g === dGen) scheduleAuto(2600);
      });
    };
    // Pointer: a tap picks the name under it (or steps, on the thumbwheel); a vertical drag rolls the drum.
    var startY = null, moved = false;
    dialEl.addEventListener('pointerdown', function (e) { stopAuto(); startY = e.clientY; moved = false; dialEl.setPointerCapture(e.pointerId); });
    dialEl.addEventListener('pointermove', function (e) {
      if (startY === null) return;
      var dy = e.clientY - startY;
      if (Math.abs(dy) >= 26) { setDial(dIdx + (dy < 0 ? 1 : -1), true); startY = e.clientY; moved = true; }
    });
    dialEl.addEventListener('pointerup', function (e) {
      if (startY === null) return;
      startY = null;
      if (moved) return;
      var hit = document.elementFromPoint(e.clientX, e.clientY);
      var item = hit && hit.closest && hit.closest('.dr-i');
      if (item && Number(item.dataset.i) !== dIdx) setDial(Number(item.dataset.i), true);
      else setDial(dIdx + 1, true);
    });
    dialEl.addEventListener('pointercancel', function () { startY = null; });
    var wheelAcc = 0, wheelLock = 0;
    dialEl.addEventListener('wheel', function (e) {
      e.preventDefault();
      stopAuto();
      var now = Date.now();
      wheelAcc += e.deltaY;
      if (Math.abs(wheelAcc) > 40 && now - wheelLock > 180) { setDial(dIdx + (wheelAcc > 0 ? 1 : -1), true); wheelAcc = 0; wheelLock = now; }
    }, { passive: false });
    dialEl.addEventListener('keydown', function (e) {
      var k = e.key, next = null;
      if (k === 'ArrowDown' || k === 'ArrowRight') next = dIdx + 1;
      else if (k === 'ArrowUp' || k === 'ArrowLeft') next = dIdx - 1;
      else if (k === 'Home') next = 0;
      else if (k === 'End') next = dN - 1;
      else if (k === 'Enter' || k === ' ') next = dIdx + 1;
      if (next === null) return;
      e.preventDefault();
      stopAuto();
      setDial(next, true);
    });
    layout();
    var device = dialEl.closest('.device');
    if (device && auto) {
      var started = false;
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView && !started) { started = true; scheduleAuto(3200); }
      }, { threshold: .5 }).observe(device);
    }
  }

  // ── The build: a pinned stage that assembles one exchange as you scroll ──
  var buildEl = $('build'), bp = $('bp');
  var buildTick = null;
  if (buildEl && bp && window.buildSteps) {
    var bSteps = window.buildSteps, bN = bSteps.length, bCur = 0;
    var typedEl = $('bp-typed'), ansEl = $('bp-answer'), pctEl = $('pct');
    var question = (window.dial && window.dial.question) || '';
    var typeState = 'idle', ansGen = 0;
    var typeQuestion = async function () {
      typeState = 'typing';
      if (reduced) { typedEl.textContent = question; typeState = 'done'; return; }
      for (var i = 1; i <= question.length; i++) { typedEl.textContent = question.slice(0, i); await sleep(36 + Math.random() * 30); }
      typeState = 'done';
    };
    var setStep = function (s) {
      if (s === bCur) return;
      var prev = bCur; bCur = s;
      for (var k = 1; k <= bN; k++) bp.classList.toggle('s' + k, k <= s);
      var b = bSteps[s - 1];
      $('step-n').textContent = pad(s, 2);
      $('step-title').textContent = b.title;
      $('step-text').textContent = b.text;
      if (s >= 4 && prev < 4) {
        var g = ++ansGen;
        if (reduced) ansEl.textContent = window.dialFirst;
        else stream(ansEl, window.dialFirst, 40, function () { return g === ansGen; });
      }
      if (s < 4) { ansGen++; ansEl.textContent = ''; }
    };
    buildTick = function () {
      var r = buildEl.getBoundingClientRect();
      var total = buildEl.offsetHeight - window.innerHeight;
      var p = Math.max(0, Math.min(1, -r.top / total));
      pctEl.firstChild.nodeValue = pad(Math.round(p * 100), 3);
      setStep(Math.min(bN, Math.floor(p * bN) + 1));
      bp.classList.toggle('done-on', p > .97);
      if (typeState === 'idle' && r.top < window.innerHeight * .5) typeQuestion();
    };
  }

  // ── Instrument chrome: ruler, section indicator, cursor readout ──
  var rulerInner = $('ruler-inner'), ticks = [];
  if (rulerInner) {
    for (var t = 0; t < 24; t++) { var sp = document.createElement('span'); sp.style.top = (t * 64) + 'px'; rulerInner.appendChild(sp); ticks.push(sp); }
  }
  var sideMark = $('sidedot-mark'), sideLabel = $('sidedot-label');
  if (sideLabel) {
    var named = document.querySelectorAll('[data-name]');
    var nameObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) sideLabel.textContent = e.target.dataset.name; });
    }, { rootMargin: '-50% 0px -50% 0px' });
    named.forEach(function (el) { nameObs.observe(el); });
  }
  var chromeTick = function () {
    var y = window.scrollY;
    if (ticks.length) {
      var off = y % 64, base = y - off;
      rulerInner.style.transform = 'translateY(' + (-off) + 'px)';
      for (var i = 0; i < ticks.length; i++) ticks[i].textContent = Math.round(base + i * 64);
    }
    if (sideMark) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      sideMark.style.top = 'calc(' + (max > 0 ? (y / max) * 100 : 0) + '% - 4px)';
    }
  };
  if (rulerInner || sideMark || buildTick) {
    var queued = false;
    var onScroll = function () {
      if (queued) return; queued = true;
      requestAnimationFrame(function () { queued = false; chromeTick(); if (buildTick) buildTick(); });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }
  var reticle = $('reticle');
  if (reticle && window.matchMedia('(pointer: fine)').matches) {
    var xy = $('reticle-xy');
    window.addEventListener('pointermove', function (e) {
      // Only over the build, where coordinates mean something; never over text you are reading elsewhere.
      var t = e.target.closest ? e.target : null;
      var here = t && t.closest('.build') && !t.closest('a, button, .step-copy, .build-head');
      reticle.classList.toggle('on', !!here);
      reticle.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
      xy.textContent = 'x ' + Math.round(e.pageX) + ' · y ' + Math.round(e.pageY);
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', function () { reticle.classList.remove('on'); });
  }
})();
