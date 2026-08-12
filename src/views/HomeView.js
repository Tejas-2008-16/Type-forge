/**
 * TypeForge HomePage — Premium Redesign
 * Animated hero · Quick start widget · Mode cards · Curriculum preview · FAQ
 */
import { createTypingWidget } from "../components/TypingWidget.js";
import { getRandomWords, ENGLISH_200 } from "../data/textData.js";
import { LANGUAGES } from "../data/codeCurriculum.js";

export function createHomeView(router) {
  const page = document.createElement("div");
  const quickStartText = getRandomWords(25, ENGLISH_200);

  page.innerHTML = `
    <!-- ── HERO ── -->
    <section class="hero-section">
      <div class="hero-badge">
        10 Languages &nbsp;&middot;&nbsp; Full Syllabus &nbsp;&middot;&nbsp; Live Code Execution
      </div>

      <h1 class="hero-title">
        Type with purpose.<br>
        <span class="accent">Code with confidence.</span>
      </h1>

      <p class="hero-subtitle">
        The only typing platform where speed practice and real programming education happen at the same time.
        Type actual code, understand every line, build real projects.
      </p>

      <div class="hero-ctas">
        <a href="/typing-test" id="hero-start-test" class="hero-cta-primary" data-nav>
          Start Typing Test
        </a>
        <a href="/code-typing" id="hero-start-code" class="hero-cta-secondary" data-nav>
          Explore Code Curriculum
        </a>
      </div>

      <div class="hero-stats">
        <span class="hero-stat-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          Live WPM Tracking
        </span>
        <span class="hero-stats-dot" style="color:var(--color-border)">·</span>
        <span class="hero-stat-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Concept Explanations
        </span>
        <span class="hero-stats-dot" style="color:var(--color-border)">·</span>
        <span class="hero-stat-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          No Account Needed
        </span>
        <span class="hero-stats-dot" style="color:var(--color-border)">·</span>
        <span class="hero-stat-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"></polyline></svg>
          Forever Free
        </span>
      </div>
    </section>

    <!-- ── QUICK START ── -->
    <section class="quick-start-section">
      <p class="section-label">Try it instantly</p>
      <h2 class="section-heading">Start typing right now</h2>
      <p class="section-subheading">No account, no setup — just click and type.</p>
      <div id="home-quick-widget"></div>

      <!-- AdSense Unit Placement -->
      <div class="ad-banner-slot">
        <div class="ad-label">ADVERTISEMENT</div>
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="5432167890" data-ad-format="auto" data-full-width-responsive="true"></ins>
      </div>
    </section>

    <!-- ── THREE MODES ── -->
    <section class="modes-section">
      <div class="modes-inner">
        <p class="section-label" style="text-align:center">Three Modes</p>
        <h2 class="section-heading">One platform, every goal.</h2>
        <p class="section-subheading">Choose the experience that fits what you want to achieve right now.</p>
        <div class="modes-grid">
          <div class="mode-card" data-href="/typing-test">
            <div class="mode-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            </div>
            <h3 class="mode-card-title">Text Typing</h3>
            <p class="mode-card-desc">Speed test with real English words, sentences, and tech vocabulary. Timed or word-count modes. Tracks personal bests locally.</p>
            <a href="/typing-test" data-nav class="btn btn-outline btn-sm mode-card-cta">Start Test</a>
          </div>
          <div class="mode-card" data-href="/quotes">
            <div class="mode-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
            </div>
            <h3 class="mode-card-title">Quote Typing</h3>
            <p class="mode-card-desc">Type curated quotes from technologists, scientists, and great minds. Filterable by category and difficulty level.</p>
            <a href="/quotes" data-nav class="btn btn-outline btn-sm mode-card-cta">Browse Quotes</a>
          </div>
          <div class="mode-card featured" data-href="/code-typing">
            <div class="mode-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <h3 class="mode-card-title">Code Learning</h3>
            <p class="mode-card-desc">Structured curriculum for 10 languages. Type real code, see it execute, read the explanation. Build real projects at the end.</p>
            <a href="/code-typing" data-nav class="btn btn-primary btn-sm mode-card-cta">Start Learning</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ── HOW IT WORKS ── -->
    <section class="hiw-section">
      <p class="section-label" style="text-align:center">Code Learning Mode</p>
      <h2 class="section-heading">How it teaches you to code</h2>
      <p class="section-subheading">Unlike generic typing sites, every keystroke teaches you something real.</p>
      <div class="hiw-grid" id="hiw-grid"></div>
    </section>

    <!-- ── CURRICULUM PREVIEW ── -->
    <section class="langs-section">
      <div class="langs-inner">
        <p class="section-label" style="text-align:center">10 Languages</p>
        <h2 class="section-heading">Full syllabi, from basics to projects.</h2>
        <p class="section-subheading">Each language has a structured chapter progression ending in a real capstone project.</p>
        <div class="lang-pills" id="lang-pills"></div>
      </div>
    </section>

    <!-- ── FAQ ── -->
    <section class="faq-section" id="faq-section">
      <p class="section-label" style="text-align:center">FAQ</p>
      <h2 class="section-heading">Frequently Asked Questions</h2>
      <div id="faq-list" style="display:flex;flex-direction:column;gap:0.75rem;margin-top:2rem"></div>
    </section>
  `;

  // Wire nav links
  page.querySelectorAll("[data-nav]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      router.navigate(link.getAttribute("href"));
    });
  });

  page.querySelectorAll(".mode-card[data-href]").forEach(card => {
    card.addEventListener("click", e => {
      if (!e.target.closest("a")) router.navigate(card.dataset.href);
    });
  });

  // ── Quick Start Widget ──
  const quickWidget = createTypingWidget({
    mode: "text",
    challengeText: quickStartText,
    showStats: true,
    showRetry: true,
    onComplete: () => {}
  });
  page.querySelector("#home-quick-widget").appendChild(quickWidget);

  // ── How it Works ──
  const STEPS = [
    { step: "01", title: "Choose Language", desc: "Pick from JS, Python, HTML, CSS, SQL, Java, C++, C, JSON, or Markdown." },
    { step: "02", title: "Type the Code", desc: "Real syntax challenges with instant character-by-character feedback." },
    { step: "03", title: "See It Execute", desc: "Your code runs in a sandboxed environment with the output shown live." },
    { step: "04", title: "Learn the Concept", desc: "Detailed explanation, line-by-line breakdown, and common mistakes after each challenge." },
    { step: "05", title: "Unlock Next Chapter", desc: "Progress is saved locally. Pick up exactly where you left off." },
    { step: "06", title: "Build a Project", desc: "Every language ends with a real capstone project that uses everything you learned." },
  ];

  const hiwGrid = page.querySelector("#hiw-grid");
  STEPS.forEach(s => {
    const el = document.createElement("div");
    el.className = "hiw-step";
    el.innerHTML = `
      <div class="hiw-step-num">${s.step}</div>
      <h4 class="hiw-step-title">${s.title}</h4>
      <p class="hiw-step-desc">${s.desc}</p>
    `;
    hiwGrid.appendChild(el);
  });

  // ── Language Pills ──
  const pillsContainer = page.querySelector("#lang-pills");
  LANGUAGES.forEach(lang => {
    const pill = document.createElement("button");
    pill.className = "lang-pill";
    pill.innerHTML = `
      <span class="lang-pill-icon" style="background:${lang.bg};color:${lang.color}">${lang.icon}</span>
      ${lang.name}
      <span style="font-size:0.75rem;color:var(--color-text-muted);margin-left:0.25rem">${lang.levelsCount} ch.</span>
    `;
    pill.addEventListener("click", () => router.navigate(`/code-typing/${lang.id}`));
    pillsContainer.appendChild(pill);
  });

  // ── FAQ ──
  const FAQS = [
    { q: "Is TypeForge completely free?", a: "Yes — all 10 languages, full curriculum, live code execution, and progress tracking. Zero cost, zero ads, zero signup." },
    { q: "Do I need to create an account?", a: "No account required. All progress, personal bests, and unlocked chapters are stored locally in your browser's IndexedDB. Your data never leaves your device." },
    { q: "How is the code curriculum structured?", a: "Each language has chapters that progress from absolute basics (Hello World, variables) through intermediate concepts (loops, functions, OOP) to a final capstone project where you build something real." },
    { q: "Can a complete beginner learn coding here?", a: "Absolutely. JavaScript and Python start from 'your first console.log/print' and every challenge includes a detailed explanation of what the code does, common mistakes, and a key takeaway. You learn by doing." },
    { q: "What WPM should a developer aim for?", a: "Most professional developers type 60–80 WPM for code. Above 80 puts you in the elite tier. However, accuracy matters more than speed for code — aim for 98%+ accuracy first, then build speed." },
    { q: "How is TypeForge different from Monkeytype?", a: "Monkeytype is an excellent pure typing speed tool. TypeForge adds a structured programming curriculum, post-challenge educational explanations, and code execution — making typing practice also a learning experience." },
    { q: "What languages are supported?", a: "JavaScript, Python, HTML5, CSS3, Java, C, C++, SQL, JSON, and Markdown. Each has a complete chapter-based curriculum ending in a real project." },
  ];

  const faqList = page.querySelector("#faq-list");
  FAQS.forEach(faq => {
    const item = document.createElement("div");
    item.className = "faq-item";
    item.innerHTML = `
      <button class="faq-question">
        ${faq.q}
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer" style="display:none">${faq.a}</div>
    `;

    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");
    btn.addEventListener("click", () => {
      const isOpen = answer.style.display !== "none";
      answer.style.display = isOpen ? "none" : "block";
      icon.textContent = isOpen ? "+" : "−";
      icon.style.transform = isOpen ? "" : "rotate(0deg)";
    });

    faqList.appendChild(item);
  });

  return page;
}
