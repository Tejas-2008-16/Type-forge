/**
 * TypeForge Articles View — Educational SEO Pages & Guides
 * 2-Column Responsive Layout with Table of Contents Sidebar & Generous Content Width
 */
import { ARTICLES, getArticleBySlug } from "../data/articlesData.js";

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Articles List Page ───────────────────────────────────────────────────────
export function createArticlesView(router) {
  const page = document.createElement("div");
  page.className = "articles-overview-page";

  page.innerHTML = `
    <div class="articles-overview-inner">
      <div class="articles-hero">
        <div class="art-hero-badge">📚 Developer Guides & Science</div>
        <h1 class="art-hero-title">Typing Speed Science & Code Guides</h1>
        <p class="art-hero-sub">
          In-depth developer guides, mathematical WPM formulas, and ergonomic strategies
          to double your coding speed and eliminate cognitive friction.
        </p>
      </div>

      <div class="articles-grid-v2">
        ${ARTICLES.map(article => `
          <div class="art-card-v2" data-slug="${article.slug}">
            <div class="art-card-badge">${article.category}</div>
            <h2 class="art-card-title">${article.title}</h2>
            <p class="art-card-excerpt">${article.excerpt}</p>
            <div class="art-card-footer">
              <span class="art-card-author">✍️ ${article.author}</span>
              <span class="art-card-read">${article.readTime}</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  page.querySelectorAll(".art-card-v2").forEach(card => {
    card.addEventListener("click", () => {
      router.navigate(`/articles/${card.dataset.slug}`);
    });
  });

  return page;
}

// ─── Article Detail Page ──────────────────────────────────────────────────────
export function createArticleDetailView(router, slug) {
  const page = document.createElement("div");
  page.className = "article-detail-page";

  const article = getArticleBySlug(slug);
  if (!article) {
    page.innerHTML = `
      <div class="article-not-found">
        <h2>Article not found</h2>
        <button class="btn btn-secondary" id="back-notfound" style="margin-top:1rem">← All Articles</button>
      </div>`;
    page.querySelector("#back-notfound")?.addEventListener("click", () => router.navigate("/articles"));
    return page;
  }

  // Extract headings for Table of Contents
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = article.content;
  const headings = Array.from(tempDiv.querySelectorAll("h2")).map((h2, idx) => {
    const id = `section-${idx + 1}`;
    h2.id = id;
    return { text: h2.textContent, id };
  });

  page.innerHTML = `
    <div class="article-detail-inner">

      <!-- Left Sidebar Column -->
      <aside class="article-sidebar">
        <button class="btn btn-secondary art-back-btn" id="back-articles">
          ← Back to Articles
        </button>

        <div class="art-sidebar-card">
          <div class="art-meta-tag">${article.category}</div>
          <div class="art-meta-item">
            <span class="art-meta-label">AUTHOR</span>
            <span class="art-meta-value">${article.author}</span>
          </div>
          <div class="art-meta-item">
            <span class="art-meta-label">PUBLISHED</span>
            <span class="art-meta-value">${article.date}</span>
          </div>
          <div class="art-meta-item">
            <span class="art-meta-label">READ TIME</span>
            <span class="art-meta-value">${article.readTime}</span>
          </div>
        </div>

        ${headings.length ? `
        <div class="art-toc-card">
          <div class="art-toc-title">TABLE OF CONTENTS</div>
          <nav class="art-toc-nav">
            ${headings.map(h => `
              <a href="#${h.id}" class="art-toc-link">${h.text}</a>
            `).join("")}
          </nav>
        </div>` : ""}

        <div class="art-sidebar-card art-share-card">
          <div class="art-toc-title">SHARE GUIDE</div>
          <div class="art-share-btns">
            <button class="btn btn-outline btn-sm" id="btn-copy-link">🔗 Copy Link</button>
          </div>
        </div>

        <!-- AdSense Sidebar Slot -->
        <div class="ad-sidebar-slot">
          <div class="ad-label">ADVERTISEMENT</div>
          <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="9876543210" data-ad-format="auto" data-full-width-responsive="true"></ins>
        </div>
      </aside>

      <!-- Main Article Column -->
      <main class="article-main">
        <header class="art-header">
          <span class="art-category-pill">${article.category}</span>
          <h1 class="art-main-title">${article.title}</h1>
          <p class="art-main-excerpt">${article.excerpt}</p>
          <div class="art-main-meta">
            <span>By <strong>${article.author}</strong></span>
            <span>·</span>
            <span>${article.date}</span>
            <span>·</span>
            <span>${article.readTime}</span>
          </div>
        </header>

        <article class="article-body">
          ${tempDiv.innerHTML}
        </article>

        <footer class="art-footer-cta">
          <h3>Ready to test your typing speed on real code?</h3>
          <p>Practice JavaScript, Python, HTML, CSS, SQL, Java, C++, C, JSON, and Markdown on TypeForge.</p>
          <div style="display:flex;gap:1rem;margin-top:1.25rem;flex-wrap:wrap">
            <a href="/code-typing" class="btn btn-primary" data-nav>Start Code Learning →</a>
            <a href="/typing-test" class="btn btn-secondary" data-nav>Take a Speed Test</a>
          </div>
        </footer>
      </main>

    </div>
  `;

  // Wire buttons
  page.querySelector("#back-articles").addEventListener("click", () => router.navigate("/articles"));

  page.querySelector("#btn-copy-link")?.addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href);
    const btn = page.querySelector("#btn-copy-link");
    if (btn) btn.textContent = "✅ Link Copied!";
    setTimeout(() => { if (btn) btn.textContent = "🔗 Copy Link"; }, 2000);
  });

  page.querySelectorAll("[data-nav]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      router.navigate(link.getAttribute("href"));
    });
  });

  // Smooth scroll for TOC links
  page.querySelectorAll(".art-toc-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const targetEl = page.querySelector(`#${targetId}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  return page;
}
