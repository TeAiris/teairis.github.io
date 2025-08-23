/* (() => {
  // ======= Config & DOM =======
  const container = document.getElementById('sheet');
  const btnPlay = document.getElementById('play');
  const btnStop = document.getElementById('stop');
  const status = document.getElementById('status');
  const btnLoop = document.getElementById('loop');
  const tempoSlider = document.getElementById('tempo');
  const tempoVal = document.getElementById('tempoVal');
  const pos = document.getElementById('pos');
  const opacitySlider = document.getElementById('opacity');
  const opacityVal = document.getElementById('opacityVal');
  const chordSpace = document.getElementById('chordSpace');
  const chordVal = document.getElementById('chordVal');
  const dynSpace = document.getElementById('dynSpace');
  const dynVal = document.getElementById('dynVal');
  const hlH = document.getElementById('hlH'), hlHVal = document.getElementById('hlHVal');
  const hlS = document.getElementById('hlS'), hlSVal = document.getElementById('hlSVal');
  const hlV = document.getElementById('hlV'), hlVVal = document.getElementById('hlVVal');
  const darkMode = document.getElementById('darkMode');
  const hlAssist = document.getElementById('hlAssist');
  const dbg = document.getElementById('dbg');

  const BW_COLORS = ['#FF0000','#FF6600','#FF9900','#FFCC00','#FFFF00','#00FF00','#00CCFF','#0066FF','#6600FF','#9900CC','#CC0099','#FF3399'];
  const ACCENT_MS = 140;

  // === Approach 1 toggle: rely on CSS .at-highlight, disable inline per-glyph coloring ===
  const USE_INLINE_COLORING = true;
  let currentBpm = 110;
  let normalNoteDimFactor = 0.1;    // 0 -> target (black in light, white in dark), 1 -> full color
  // Highlight mode: always use HSV controls for highlight color
  let builtinHighlightOn = false;

  // Tick cache readiness + fast-lookup hint
  let tickCacheReady = false;
  let __tickHint = null; // last MidiTickLookupFindBeatResult

  // Accent prewarm state: if playback starts before tick cache is ready, accent after warm
  let pendingAccentOnWarm = false; // if playback starts before cache warm, do first accent when warm

  // Helper: accent the beat at the current tick position
  function accentAtCurrentTick() {
    try {
      if (!USE_INLINE_COLORING) return;
      if (!tickCacheReady) return;
      const cache = api.tickCache;
      const tick = typeof api.tickPosition === 'number' ? api.tickPosition : undefined;
      if (!cache || typeof tick !== 'number') return;
      const res = cache.findBeat(getTrackSet(), tick, __tickHint);
      if (!res || !res.beat) return;
      __tickHint = res;
      const b = res.beat;
      const scoreBeat = (b.notes ? b : findBeatInScore(api.score, b)) || b;
      if (lastBeatAccented && lastBeatAccented !== scoreBeat) recolorBeat(lastBeatAccented);
      accentBeat(scoreBeat);
      lastBeatAccented = scoreBeat;
      api.render();
    } catch {}
  }

  // Build a track set for tick->beat lookup (all tracks by default)
  const getTrackSet = () => {
    const t = api?.score?.tracks || [];
    const idx = new Set();
    for (let i = 0; i < t.length; i++) idx.add(i);
    if (idx.size === 0) idx.add(0);
    return idx;
  };

  // ======= AlphaTab init =======
  const api = new alphaTab.AlphaTabApi(container, {
    core: { tex: true },
    display: {
      resources: {
        titleFont: "32px 'MuseJazzText', serif",
        subTitleFont: "20px 'MuseJazzText', serif",
        wordsFont: "15px 'MuseJazzText', serif",
        copyrightFont: "11px 'MuseJazzText', serif",
        directionsFont: "16px 'MuseJazzText', serif",
        markerFont: "bold 14px 'MuseJazzText', serif",
        effectFont: "italic 12px 'MuseJazzText', serif",
        graceFont: "11px 'MuseJazzText', serif",
        barNumberFont: "12px 'MuseJazzText', serif",
        timerFont: "12px 'MuseJazzText', serif",
        fingeringFont: "12px 'MuseJazzText', serif",
        inlineFingeringFont: "12px 'MuseJazzText', serif",
        tablatureFont: "13px 'MuseJazzText', serif",
        numberedNotationFont: "14px 'MuseJazzText', serif",
        numberedNotationGraceFont: "12px 'MuseJazzText', serif",
        fretboardNumberFont: "12px 'MuseJazzText', serif"
      },
      // spacing
      effectStaffPaddingTop: 16,
      notationStaffPaddingBottom: 14,
      effectStaffPaddingBottom: 12,
      notationStaffPaddingTop: 10
    },
    player: {
      enablePlayer: true,
      enableCursor: true,
      enableElementHighlighting: false,
      soundFont: "soundfonts/Mallets_GM.sf2",
      scrollElement: container,
      schedulerLookAhead: 20
    }
  });

  // ======= TEX & render =======
  const TEX_TEMPLATE = (bpm) => `
\\tempo ${bpm} .
\\track "Marimba"
\\instrument marimba
:4 (C4){ch "Cmaj7"} D4 E4 F4 | (G4){ch "Dm7"} A4 B4 C5 |
:4 (C5){ch "G7"} B4 A4 G4 | (F4){ch "Cmaj7"} E4 D4 C4 |
:8 (C4){ch "Fmaj7"} D4 E4 F4 G4 A4 B4 C5 | (E4){ch "Em7"} F4 G4 A4 B4 C5 D5 E5 |
:8 (A4){ch "A7"} G4 F4 E4 D4 C4 B3 A3 | :4 (G4){ch "G7"} F4 E4 D4`;

  const renderScoreWithBpm = (bpm) => {
    currentBpm = bpm;
    api.tex(TEX_TEMPLATE(currentBpm));
  };

  // ======= Utilities =======
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const debounce = (fn, delay) => {
    let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
  };

  const fmtTime = (ms) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const r = s - m * 60;
    return `${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`;
  };

  const isDark = () => !!darkMode.checked;

  // color helpers
  const hexToRgb = (hex) => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) } : { r:0,g:0,b:0 };
  };
  const rgbToHex = (r,g,b) => '#' + [r,g,b].map(v => clamp(v,0,255).toString(16).padStart(2,'0')).join('');
  const hsvToRgb = (h,s,v) => {
    h = ((h%360)+360)%360; s = clamp(s,0,100)/100; v = clamp(v,0,100)/100;
    const c=v*s, x=c*(1-Math.abs((h/60)%2-1)), m=v-c;
    let r=0,g=0,b=0;
    if (h<60){r=c;g=x;b=0;} else if (h<120){r=x;g=c;b=0;}
    else if (h<180){r=0;g=c;b=x;} else if (h<240){r=0;g=x;b=c;}
    else if (h<300){r=x;g=0;b=c;} else {r=c;g=0;b=x;}
    return { r: Math.round((r+m)*255), g: Math.round((g+m)*255), b: Math.round((b+m)*255) };
  };
  const hsvToHex = (h,s,v) => { const {r,g,b}=hsvToRgb(h,s,v); return rgbToHex(r,g,b); };

  // Dim without alpha (toward black in light, white in dark)
  const dimHex = (hex, factor=normalNoteDimFactor) => {
    const {r,g,b} = hexToRgb(hex);
    const target = isDark() ? {r:255,g:255,b:255} : {r:0,g:0,b:0};
    return rgbToHex(
      Math.round(r*factor + target.r*(1-factor)),
      Math.round(g*factor + target.g*(1-factor)),
      Math.round(b*factor + target.b*(1-factor))
    );
  };

  const pcColor = (midi) => {
    if (typeof midi !== 'number') return '#000000';
    const pc = ((midi % 12) + 12) % 12;
    return BW_COLORS[pc] || '#000000';
  };

  // ======= Beat helpers =======
  const NS = alphaTab.model.NoteSubElement;
  const BS = alphaTab.model.BeatSubElement;

  // Comprehensive sets of sub-elements we want to color together
  const NOTE_KEYS_ALL = [
    NS.StandardNotationNoteHead,
    NS.StandardNotationAccidentals,
    NS.StandardNotationEffects,
    NS.GuitarTabFretNumber,
    NS.GuitarTabEffects,
    NS.SlashNoteHead,
    NS.SlashEffects,
    NS.NumberedNumber,
    NS.NumberedAccidentals,
    NS.NumberedEffects,
    // Ledger lines
    NS.StandardNotationLedgerLines,
    NS.StandardNotationLedgerLine,
    NS.LedgerLines
  ].filter(k => k !== undefined);

  // Baseline beat elements (beams included)
  const BEAT_KEYS_BASELINE = [
    BS.StandardNotationStem,
    BS.StandardNotationFlags,
    BS.StandardNotationBeams,
    BS.StandardNotationTuplet,
    BS.StandardNotationEffects,
    BS.StandardNotationRests,
    BS.StandardNotationGraceBeams,
    BS.StandardNotationGraceFlags,
    BS.GuitarTabStem,
    BS.GuitarTabFlags,
    BS.GuitarTabBeams,
    BS.GuitarTabTuplet,
    BS.GuitarTabEffects,
    BS.StandardNotationLedgerLines
  ].filter(k => k !== undefined);

  // Accent excludes beams
  const BEAT_KEYS_ACCENT = BEAT_KEYS_BASELINE.filter(k =>
    k !== BS.StandardNotationBeams && k !== BS.GuitarTabBeams &&
    k !== BS.StandardNotationGraceBeams
  );

  const beatSignature = (beat) =>
    (beat?.notes || []).map(n => (typeof n?.realValue === 'number' ? n.realValue : 'x')).join(',');

  const beatTopColorHex = (beat) => {
    let top = null;
    for (const n of beat?.notes || []) {
      if (typeof n?.realValue === 'number' && (top === null || n.realValue > top.realValue)) top = n;
    }
    return top ? pcColor(top.realValue) : '#000000';
  };

  const findBeatInScore = (score, targetBeat) => {
    if (!score || !targetBeat) return null;
    const sig = beatSignature(targetBeat);
    if (!sig) return null;
    for (const track of score.tracks || []) for (const staff of track.staves || [])
    for (const bar of staff.bars || []) for (const voice of bar.voices || [])
    for (const beat of voice.beats || []) {
      if ((beat?.notes?.length || 0) === (targetBeat.notes?.length || 0) && beatSignature(beat) === sig) return beat;
    }
    return null;
  };

  // recolor a single beat to "normal" (dimmed)
  const recolorBeat = (beat) => {
    if (!USE_INLINE_COLORING) return;
    try {
      const A = alphaTab.model;
      const dim = A.Color.fromJson(dimHex(beatTopColorHex(beat), normalNoteDimFactor));
      if (!beat.style) beat.style = new A.BeatStyle();
      for (const k of BEAT_KEYS_BASELINE) beat.style.colors.set(k, dim);
      for (const n of beat.notes || []) {
        if (typeof n.realValue !== 'number') continue;
        const nhCol = A.Color.fromJson(dimHex(pcColor(n.realValue), normalNoteDimFactor));
        if (!n.style) n.style = new A.NoteStyle();
        for (const k of NOTE_KEYS_ALL) n.style.colors.set(k, nhCol);
      }
      if (NS.StandardNotationLedgerLines !== undefined) {
        for (const n of beat.notes || []) {
          if (!n.style) n.style = new alphaTab.model.NoteStyle();
          const col = alphaTab.model.Color.fromJson(dimHex(pcColor(n.realValue), normalNoteDimFactor));
          n.style.colors.set(NS.StandardNotationLedgerLines, col);
        }
      }
    } catch {}
  };

  // accent a beat briefly (full color for all note/beat parts)
  const accentBeat = (beat) => {
    if (!USE_INLINE_COLORING) return;
    if (!beat) return;
    const A = alphaTab.model;
    const fullHex = beatTopColorHex(beat);
    const fullCol = A.Color.fromJson(fullHex);
    if (!beat.style) beat.style = new A.BeatStyle();
    for (const k of BEAT_KEYS_ACCENT) beat.style.colors.set(k, fullCol);
    for (const n of (beat.notes || [])) {
      if (typeof n.realValue !== 'number') continue;
      const nFullCol = A.Color.fromJson(pcColor(n.realValue));
      if (!n.style) n.style = new A.NoteStyle();
      for (const k of NOTE_KEYS_ALL) n.style.colors.set(k, nFullCol);
    }
    if (NS.StandardNotationLedgerLines !== undefined) {
      for (const n of beat.notes || []) {
        if (!n.style) n.style = new alphaTab.model.NoteStyle();
        const col = alphaTab.model.Color.fromJson(pcColor(n.realValue));
        n.style.colors.set(NS.StandardNotationLedgerLines, col);
      }
    }
  };

  // color entire score by pitch (dimmed baseline)
  const colorScoreByPitch = (score) => {
    if (!USE_INLINE_COLORING) return;
    try {
      const A = alphaTab.model;
      for (const track of score?.tracks || []) for (const staff of track.staves || [])
      for (const bar of staff.bars || []) for (const voice of bar.voices || [])
      for (const beat of voice.beats || []) {
        const topHex = beatTopColorHex(beat);
        const stemHex = getStemOverride(beat) || dimHex(topHex, normalNoteDimFactor);
        const stemCol = A.Color.fromJson(stemHex);
        if (!beat.style) beat.style = new A.BeatStyle();
        for (const k of BEAT_KEYS_BASELINE) beat.style.colors.set(k, stemCol);
        for (const n of beat.notes || []) {
          if (typeof n.realValue !== 'number') continue;
          const nh = A.Color.fromJson(dimHex(pcColor(n.realValue), normalNoteDimFactor));
          if (!n.style) n.style = new A.NoteStyle();
          for (const k of NOTE_KEYS_ALL) n.style.colors.set(k, nh);
        }
      }
    } catch (e) { console.warn('colorScoreByPitch failed:', e); }
  };

  // ======= Theme / Notational styles =======
  const applyDarkNotationalStyles = (score, dark) => {
    try {
      const A = alphaTab.model;
      const WHITE = A.Color.fromJson('#FFFFFF');
      const BLACK = A.Color.fromJson('#000000');

      if (dark) {
        score.style = new A.ScoreStyle();
        const SS = A.ScoreSubElement;
        [SS.Title,SS.SubTitle,SS.Artist,SS.Album,SS.Words,SS.Music,SS.WordsAndMusic,SS.Transcriber,SS.Copyright,SS.CopyrightSecondLine,SS.ChordDiagramList]
          .forEach(k => { if (k !== undefined) score.style.colors.set(k, WHITE); });
        for (const track of score.tracks) {
          track.style = new A.TrackStyle();
          const TS = A.TrackSubElement;
          [TS.TrackName, TS.BracesAndBrackets, TS.SystemSeparator, TS.StringTuning]
            .forEach(k => { if (k !== undefined) track.style.colors.set(k, WHITE); });
          for (const staff of track.staves) for (const bar of staff.bars) {
            if (!bar.style) bar.style = new A.BarStyle();
            const BSb = A.BarSubElement;
            [BSb.StandardNotationBarNumber, BSb.StandardNotationBarLines, BSb.StandardNotationClef,
             BSb.StandardNotationKeySignature, BSb.StandardNotationTimeSignature, BSb.StandardNotationStaffLine]
             .forEach(k => { if (k !== undefined) bar.style.colors.set(k, WHITE); });
            for (const voice of bar.voices) for (const beat of voice.beats) {
              if (!beat.style) beat.style = new A.BeatStyle();
              const BE = A.BeatSubElement;
              [BE.Effects, BE.StandardNotationEffects].forEach(k => {
                if (k !== undefined) beat.style.colors.set(k, WHITE);
              });
            }
          }
        }
      } else {
        score.style = null;
        for (const track of score.tracks) {
          track.style = null;
          for (const staff of track.staves) for (const bar of staff.bars) {
            if (bar.style) {
              const BSb = A.BarSubElement;
              [BSb.StandardNotationBarNumber, BSb.StandardNotationBarLines, BSb.StandardNotationClef,
               BSb.StandardNotationKeySignature, BSb.StandardNotationTimeSignature, BSb.StandardNotationStaffLine]
               .forEach(k => { if (k !== undefined) bar.style.colors.set(k, '#000000'); });
            }
            for (const voice of bar.voices) for (const beat of voice.beats) {
              if (!beat.style) continue;
              const BE = A.BeatSubElement;
              [BE.Effects, BE.StandardNotationEffects].forEach(k => {
                if (k !== undefined) beat.style.colors.set(k, '#000000');
              });
            }
          }
        }
      }
    } catch {}
  };

  const applyTheme = (dark) => {
    document.body.classList.toggle('dark', !!dark);
    localStorage.setItem('alphatabTheme', dark ? 'dark' : 'light');
    try {
      if (api?.score) {
        applyDarkNotationalStyles(api.score, !!dark);
        colorScoreByPitch(api.score);
        api.render();
      }
    } catch {}
  };

  // ======= Built-in highlight assist toggle =======
  function setBuiltinHighlighting(on) {
    builtinHighlightOn = !!on;
    const s = api.settings || {};
    s.player = s.player || {};
    s.player.enableElementHighlighting = builtinHighlightOn;
    try {
      if (typeof api.updateSettings === 'function') {
        api.updateSettings(s);
        api.render();
      }
    } catch (_) {}
  }

  // ======= Custom Loop Implementation =======
  // Custom loop state
  let customLoopEnabled = false;
  let loopStartTick = null;
  let loopEndTick = null;
  // Loop helpers and state
  const LOOP_SEEK_EARLY_TICKS = 24; // seek a hair before the end to avoid audio hiccup
  let lastSeekAtMs = 0;
  let seekCount = 0;

  function getSelectionTicks(){
    let s=null,e=null,src='none';
    if (typeof api.selectionStart === 'number' && typeof api.selectionEnd === 'number') {
      s=api.selectionStart; e=api.selectionEnd; src='api.selectionStart/End';
    } else if (api.selection && typeof api.selection.startTick === 'number' && typeof api.selection.endTick === 'number') {
      s=api.selection.startTick; e=api.selection.endTick; src='api.selection.startTick/endTick';
    }
    return { s,e,src };
  }

  function updateDebug(extra=''){
    if (!dbg) return;
    const sel = getSelectionTicks();
    const ct =
      (typeof api?.tickPosition === 'number') ? api.tickPosition :
      (typeof api?.player?.currentTick === 'number') ? api.player.currentTick : null;
    const parts = [];
    parts.push(`Sel: ${sel.s ?? '–'} / ${sel.e ?? '–'}`);
    parts.push(`Loop: ${loopStartTick ?? '–'} / ${loopEndTick ?? '–'}`);
    parts.push(`ct: ${ct ?? '–'}`);
    parts.push(`seeks: ${seekCount}`);
    parts.push(`src:${sel.src}`);
    parts.push(customLoopEnabled ? 'LOOP:on' : 'LOOP:off');
    if (extra) parts.push(extra);
    dbg.textContent = parts.join(' | ');
  }

  function setLoopFromSelection() {
    let s = null, e = null;
    const sel = getSelectionTicks();
    if (typeof sel.s === 'number' && typeof sel.e === 'number' && sel.e > sel.s) {
      s = sel.s; e = sel.e;
    } else if (api.score && typeof api.score.duration === 'number') {
      s = 0; e = api.score.duration;
    }
    loopStartTick = s;
    loopEndTick = e;
    updateDebug('setLoopFromSelection');
    return (loopStartTick != null && loopEndTick != null);
  }

  function ensureSeekToLoopStart(e) {
    const now = performance.now ? performance.now() : Date.now();
    if (now - lastSeekAtMs < 15) return;
    lastSeekAtMs = now;
    try { api.seek(loopStartTick ?? 0); seekCount++; updateDebug('seek'); } catch(_) {}
  }

  const loadLoopPref = () => localStorage.getItem('alphatabLooping') === '1';
  function applyLoopUI(on) {
    const val = !!on;
    if (btnLoop) {
      btnLoop.classList.toggle('active', val);
      btnLoop.setAttribute('aria-pressed', val ? 'true' : 'false');
    }
    if (val) {
      customLoopEnabled = setLoopFromSelection();
      if (!customLoopEnabled && status) { status.textContent = 'Loop: whole score (no selection found)'; }
    } else {
      customLoopEnabled = false;
      loopStartTick = null;
      loopEndTick = null;
    }
    try { api.isLooping = false; } catch(_) {}
    localStorage.setItem('alphatabLooping', val ? '1' : '0');
    updateDebug('applyLoopUI');
  }
  if (btnLoop) {
    btnLoop.addEventListener('click', () => {
      applyLoopUI(!btnLoop.classList.contains('active'));
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'l' || e.key === 'L') {
      applyLoopUI(!btnLoop.classList.contains('active'));
    }
  });
  if (api.selectionChanged && typeof api.selectionChanged.on === 'function') {
    api.selectionChanged.on(() => { if (customLoopEnabled) setLoopFromSelection(); updateDebug('selectionChanged'); });
  }

  // ======= Highlight color =======
  const setHighlightColor = (hex) => document.documentElement.style.setProperty('--hl-color', hex);
  const getStaticHlHex = () => hsvToHex(parseFloat(hlH.value)||0, parseFloat(hlS.value)||0, parseFloat(hlV.value)||0);
  const colorForMidiEvents = (events) => {
    let best = null;
    for (const ev of events || []) {
      const type = ev.type || ev.eventType || ev.kind;
      const isNoteOn = type === alphaTab?.midi?.MidiEventType?.NoteOn || ev.isNoteOn;
      if (!isNoteOn) continue;
      const n = ev.note ?? ev.noteNumber ?? ev.key ?? ev.data1;
      if (typeof n !== 'number') continue;
      if (best == null || n > best) best = n;
    }
    return best == null ? '#000000' : pcColor(best);
  };

  // ======= UI Wiring =======
  (function initTheme(){
    const saved = localStorage.getItem('alphatabTheme');
    const dark = saved ? (saved === 'dark') : false;
    darkMode.checked = dark;
    applyTheme(dark);
  })();
  darkMode.addEventListener('change', () => applyTheme(darkMode.checked));

  const debouncedRender = debounce((bpm) => renderScoreWithBpm(bpm), 150);
  tempoVal.textContent = tempoSlider.value;
  tempoSlider.addEventListener('input', () => {
    const bpm = parseInt(tempoSlider.value,10) || currentBpm;
    tempoVal.textContent = bpm;
    api.playbackSpeed = 1.0;
    debouncedRender(bpm);
  });
  tempoSlider.addEventListener('change', () => tempoSlider.dataset.touched = '1');

  opacitySlider.addEventListener('input', () => {
    normalNoteDimFactor = parseFloat(opacitySlider.value) || 0;
    opacityVal.textContent = normalNoteDimFactor.toFixed(2);
    if (USE_INLINE_COLORING && api.score) { colorScoreByPitch(api.score); api.render(); }
  });

  const applyLayoutPadding = () => {
    try {
      const s = api.settings;
      if (!s?.display) return;
      if (chordSpace) {
        const vTop = parseInt(chordSpace.value,10) || 0;
        s.display.effectStaffPaddingBottom = vTop;
        s.display.notationStaffPaddingTop = Math.max(0, Math.round(vTop * 0.8));
        chordVal.textContent = `${vTop}px`;
      }
      if (dynSpace) {
        const vBot = parseInt(dynSpace.value,10) || 0;
        s.display.effectStaffPaddingTop = vBot;
        s.display.notationStaffPaddingBottom = Math.max(0, Math.round(vBot * 0.875));
        dynVal.textContent = `${vBot}px`;
      }
      if (typeof api.updateSettings === 'function') { api.updateSettings(s); api.render(); }
      else { api.tex(TEX_TEMPLATE(currentBpm)); }
    } catch (e) { console.warn('applyLayoutPadding failed:', e); }
  };
  chordSpace.addEventListener('input', applyLayoutPadding);
  dynSpace.addEventListener('input', applyLayoutPadding);

  const refreshStaticHlUI = () => {
    hlHVal.textContent = hlH.value;
    hlSVal.textContent = hlS.value;
    hlVVal.textContent = hlV.value;
    setHighlightColor(getStaticHlHex());
  };
  refreshStaticHlUI();
  [hlH,hlS,hlV].forEach(sl => sl.addEventListener('input', refreshStaticHlUI));

  hlAssist.addEventListener('change', () => {
    setBuiltinHighlighting(hlAssist.checked);
    setHighlightColor(getStaticHlHex());
  });

  // ======= AlphaTab events =======
  api.error.on(err => {
    console.error('[AlphaTab error]', err);
    try { status.textContent = 'AlphaTab error: ' + (err?.message || err); } catch {}
  });

  api.soundFontLoad.on(e => {
    const pct = Math.floor((e.loaded / e.total) * 100);
    status.textContent = `Loading soundfont… ${pct}%`;
  });

  api.playerReady.on(() => {
    status.textContent = 'Ready';
    btnStop.disabled = false;
    btnPlay.disabled = false;
    applyLoopUI(loadLoopPref());
  });

  api.midiLoad.on(() => {
    tickCacheReady = true;
    if (pendingAccentOnWarm && api?.player?.state === alphaTab.synth.PlayerState.Playing) {
      pendingAccentOnWarm = false;
      accentAtCurrentTick();
    }
  });
  api.midiLoaded.on(() => {
    tickCacheReady = true;
    if (pendingAccentOnWarm && api?.player?.state === alphaTab.synth.PlayerState.Playing) {
      pendingAccentOnWarm = false;
      accentAtCurrentTick();
    }
  });

  btnPlay.onclick = () => api.playPause();
  btnStop.onclick = () => api.stop();

  api.playerStateChanged.on(e => {
    const playing = e.state === alphaTab.synth.PlayerState.Playing;
    btnPlay.textContent = playing ? 'Pause' : 'Play';
    if (playing) {
      if (customLoopEnabled && loopStartTick != null) {
        ensureSeekToLoopStart(e);
      }
      if (tickCacheReady) {
        __tickHint = null;
        accentAtCurrentTick();
      } else {
        pendingAccentOnWarm = true;
      }
    } else {
      pendingAccentOnWarm = false;
    }
    updateDebug('state:'+e.state);
  });

  api.playerPositionChanged.on(e => {
    pos.textContent = `${fmtTime(e.currentTime)} / ${fmtTime(e.endTime)}`;
    updateDebug();
    if (customLoopEnabled && loopStartTick != null && loopEndTick != null) {
      const ct = typeof e.currentTick === 'number' ? e.currentTick : null;
      if (ct != null && ct >= (loopEndTick - LOOP_SEEK_EARLY_TICKS)) {
        ensureSeekToLoopStart(e);
      }
    }
  });

  api.scoreLoaded.on(score => {
    applyDarkNotationalStyles(api.score, isDark());
    if (USE_INLINE_COLORING) colorScoreByPitch(api.score);
    setHighlightColor(getStaticHlHex());
    setBuiltinHighlighting(hlAssist.checked);
    if (!tempoSlider.dataset.touched) { tempoSlider.value = currentBpm; tempoVal.textContent = currentBpm; }
    try {
      const s = api.settings?.display || {};
      if (Number.isFinite(s.effectStaffPaddingBottom)) { chordSpace.value = String(s.effectStaffPaddingBottom); chordVal.textContent = s.effectStaffPaddingBottom + 'px'; }
      if (Number.isFinite(s.effectStaffPaddingTop)) { dynSpace.value = String(s.effectStaffPaddingTop); dynVal.textContent = s.effectStaffPaddingTop + 'px'; }
    } catch {}
    tickCacheReady = false; __tickHint = null;
    const prewarm = () => { try { api.loadMidiForScore(); } catch(_) {} };
    if (api.isReadyForPlayback) prewarm();
    else {
      const once = () => { api.playerReady.off(once); prewarm(); };
      api.playerReady.on(once);
    }
    applyLoopUI(loadLoopPref());
    if (customLoopEnabled) setLoopFromSelection();
    api.render();
    updateDebug('scoreLoaded');
  });

  // ======= Playback accent driven by tickCache + player position =======
  let lastBeatAccented = null;

  // MIDI-driven highlight color when assist is ON
  try {
    if (api.midiEventsPlayed && 'midiEventsPlayedFilter' in api && alphaTab?.midi?.MidiEventType) {
      api.midiEventsPlayedFilter = [alphaTab.midi.MidiEventType.NoteOn];
      api.midiEventsPlayed.on(e => {
        if (!hlAssist.checked) return;
        setHighlightColor(colorForMidiEvents(e.events));
      });
    }
  } catch {}

  api.playerPositionChanged.on(e => {
    if (!USE_INLINE_COLORING) return;
    if (!tickCacheReady) return;

    const tick = e?.currentTick;
    const cache = api.tickCache;
    if (!cache || typeof tick !== 'number') return;

    const res = cache.findBeat(getTrackSet(), tick, __tickHint);
    if (!res) return;
    __tickHint = res;
    const beat = res.beat;
    if (!beat) return;

    const scoreBeat = (beat.notes ? beat : findBeatInScore(api.score, beat)) || beat;
    if (lastBeatAccented === scoreBeat) return;

    if (lastBeatAccented) recolorBeat(lastBeatAccented);
    accentBeat(scoreBeat);
    lastBeatAccented = scoreBeat;

    try { api.render(); } catch {}
  });

  api.playerStateChanged.on(e => {
    if (e.state !== alphaTab.synth.PlayerState.Playing) {
      pendingAccentOnWarm = false;
      if (lastBeatAccented) {
        recolorBeat(lastBeatAccented);
        lastBeatAccented = null;
        __tickHint = null;
        try { api.render(); } catch {}
      }
    }
  });

  // ======= First render (after fonts) =======
  Promise.all([
    document.fonts.load("16px 'MuseJazzText'"),
    document.fonts.load("16px 'MuseJazz'")
  ]).catch(() => {}).finally(() => {
    renderScoreWithBpm(currentBpm);
    setHighlightColor(getStaticHlHex());
  });
})(); */