/* ===============================
   Multi-Lesson Config (edit here)
   =============================== */
const LESSONS = [
    {
        id: "lesson1",
        title: "Major Scales",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        notes: "Practice C, G, D major at 80→110 BPM. Focus on even strokes and hand-to-hand consistency.",
        // You can provide either plain AlphaTex body (starting with :4 etc.) or a full tex string.
        tex: `
\\title "Major Scales"
\\track "Marimba"
\\instrument marimba
:4 C4 D4 E4 F4 | G4 A4 B4 C5 |
:4 C5 B4 A4 G4 | F4 E4 D4 C4
`
    },
    {
        id: "lesson2",
        title: "Chord Progressions",
        video: "https://www.youtube.com/embed/5NV6Rdv1a3I",
        notes: "I–vi–IV–V in two keys. Aim for smooth voice-leading; listen for chord color.",
        tex: `
\\title "Chord Progressions"
\\track "Keys"
\\instrument piano
:4 (C4 E4 G4) (A3 C4 E4) | (F3 A3 C4) (G3 B3 D4) |
:4 (D4 F#4 A4) (B3 D4 F#4) | (G3 B3 D4) (A3 C#4 E4)
`
    },
    {
        id: "lesson3",
        title: "Four-Mallet Voicings",
        video: "https://www.youtube.com/embed/ktvTqknDobU",
        notes: "Block voicings in root position. Keep mallet height consistent; no scooping.",
        tex: `
\\title "Four-Mallet Voicings"
\\track "Mallets"
\\instrument marimba
:4 (C4 E4 G4 C5) (F3 A3 C4 F4) | (G3 B3 D4 G4) (C4 E4 G4 C5)
`
    }
];

/* ========= DOM NODES ========= */
const chipsEl = document.getElementById("lessonChips");
const jumpEl  = document.getElementById("quickJump");
const container = document.getElementById("lessonContainer");

/* ========= THEME ========= */
const applyTheme = (dark) => {
    document.body.classList.toggle("dark", !!dark);
    localStorage.setItem("ml_theme", dark ? "dark" : "light");
};
(function initTheme(){
    const saved = localStorage.getItem("ml_theme");
    applyTheme(saved === "dark");
})();
document.getElementById("toggleTheme").addEventListener("click", () => {
    applyTheme(!document.body.classList.contains("dark"));
});

/* ========= NAV / SIDEBAR POPULATE ========= */
function populateNav() {
    chipsEl.innerHTML = "";
    jumpEl.innerHTML = "";
    for (const l of LESSONS) {
        const chip = document.createElement("a");
        chip.className = "chip";
        chip.href = `#${l.id}`;
        chip.textContent = l.title;
        chip.addEventListener("click", (e) => {
            e.preventDefault();
            renderLesson(l.id, true);
        });
        chipsEl.appendChild(chip);

        const link = document.createElement("a");
        link.href = `#${l.id}`;
        link.textContent = `🎵 ${l.title}`;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            renderLesson(l.id, true);
        });
        jumpEl.appendChild(link);
    }
}

/* ========= RENDER LESSON ========= */
let currentApi = null;

function renderLesson(id, scrollIntoView=false) {
    const lesson = LESSONS.find(x => x.id === id) || LESSONS[0];
    if (!lesson) return;

    // Unique container IDs per render to avoid stale references
    const sheetId = `sheet-${lesson.id}`;
    const wrapId  = `wrap-${lesson.id}`;

    container.innerHTML = `
    <!-- SCORE CARD -->
    <section class="card" id="${lesson.id}">
      <div class="body">
        <div class="section-title">🎼 ${lesson.title} — Score</div>
        <div id="${wrapId}">
          <div id="${sheetId}"></div>
        </div>
        <div class="controls">
          <button class="btn-mini" id="btnPlay">Play / Pause</button>
          <button class="btn-mini" id="btnStop">Stop</button>
          <button class="btn-mini" id="btnLoop">Loop</button>
          <label style="display:flex;align-items:center;gap:.5rem;">
            Tempo <input id="tempo" type="range" min="40" max="220" value="110">
            <span id="tempoVal" style="min-width:3ch;text-align:right;">110</span> BPM
          </label>
        </div>
      </div>
    </section>

    <!-- VIDEO CARD -->
    <section class="card">
      <div class="body">
        <div class="section-title">🎥 ${lesson.title} — Video</div>
        <div class="video-wrap">
          <iframe src="${lesson.video}"
            title="${lesson.title} video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>
      </div>
    </section>

    <!-- NOTES CARD -->
    <section class="card note-card" id="lessonNotes">
      <div class="body">
        <div class="section-title">📝 Lesson Notes</div>
        <p>${lesson.notes || "Add guidance or assignments for this lesson here."}</p>
        <div class="tip"><strong>Tip:</strong> Keep a practice log — write down tempo, sections, and any trouble spots.</div>
      </div>
    </section>
  `;

    // Init AlphaTab
    const api = new alphaTab.AlphaTabApi(document.getElementById(sheetId), {
        core: { tex: true },
        player: { enablePlayer: true, enableCursor: true }
    });

    // Render TEX (allow body or full string)
    const texStr = lesson.tex.trim();
    api.tex(texStr);

    // Wire controls
    const btnPlay = document.getElementById("btnPlay");
    const btnStop = document.getElementById("btnStop");
    const btnLoop = document.getElementById("btnLoop");
    const tempo   = document.getElementById("tempo");
    const tempoVal= document.getElementById("tempoVal");

    btnPlay.onclick = () => api.playPause();
    btnStop.onclick = () => api.stop();
    btnLoop.onclick = () => { api.isLooping = !api.isLooping; btnLoop.classList.toggle("active", api.isLooping); };

    tempo.addEventListener("input", (e) => {
        const bpm = parseInt(e.target.value, 10) || 110;
        tempoVal.textContent = bpm;
        // Simple ratio against 110 as baseline; adjust if your scores embed explicit \tempo
        api.playbackSpeed = bpm / 110;
    });

    // Keep reference to avoid leaks
    currentApi = api;

    // Optional scroll
    if (scrollIntoView) {
        document.getElementById(lesson.id).scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Persist current lesson
    localStorage.setItem("ml_last", lesson.id);
}

/* ========= STARTUP ========= */
populateNav();
const last = localStorage.getItem("ml_last");
renderLesson(last || LESSONS[0]?.id || "lesson1");