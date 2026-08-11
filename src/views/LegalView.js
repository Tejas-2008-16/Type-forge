/**
 * TypeForge Legal & Trust Pages — About, Contact, Privacy Policy, Terms, Disclaimer
 */

export function createAboutView() {
  const page = document.createElement("div");
  page.innerHTML = `
    <div style="max-width:720px;margin:0 auto;padding:2rem 1.5rem 4rem">
      <h1 style="font-size:2rem;font-weight:800;margin-bottom:0.5rem">About TypeForge</h1>
      <p style="color:var(--color-text-secondary);font-size:1.0625rem;margin-bottom:2rem">The only typing platform where you improve typing speed while genuinely learning to write and understand real code.</p>

      <div style="display:flex;flex-direction:column;gap:1.5rem;color:var(--color-text-secondary);line-height:1.8">
        <p><strong style="color:var(--color-text-primary)">TypeForge</strong> was built from a simple observation: every existing typing practice tool either focuses on speed (ignoring code) or uses code as raw practice material without explaining what you're typing. Neither approach serves programmers who want to learn and get faster simultaneously.</p>
        <p>TypeForge bridges that gap. We built a structured coding curriculum across 10 programming languages, where every challenge is followed by a detailed explanation, breakdown, common mistakes list, and a key takeaway. Your typing practice becomes programming education.</p>
        <p>We believe the best learning tools respect your intelligence, stay out of your way, and work without demanding your email address. TypeForge works completely without signup. All progress is saved locally, privately, in your browser.</p>
        <p>TypeForge is developed by a small team of developers who believe that deep learning and joyful experiences are not mutually exclusive.</p>
      </div>

      <div style="margin-top:2.5rem;padding:1.5rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-xl)">
        <h3 style="font-weight:700;margin-bottom:0.75rem">Our Principles</h3>
        <ul style="display:flex;flex-direction:column;gap:0.5rem;color:var(--color-text-secondary);list-style:none">
          <li>▸ No signup required for any core feature</li>
          <li>▸ No fake execution results — code either runs or it doesn't</li>
          <li>▸ No random code snippets without context or explanation</li>
          <li>▸ No cluttered UI — the typing experience is the product</li>
          <li>▸ No ads inside or around the typing interface</li>
        </ul>
      </div>
    </div>
  `;
  return page;
}

export function createContactView() {
  const page = document.createElement("div");
  page.innerHTML = `
    <div style="max-width:600px;margin:0 auto;padding:2rem 1.5rem 4rem">
      <h1 style="font-size:2rem;font-weight:800;margin-bottom:0.5rem">Contact</h1>
      <p style="color:var(--color-text-secondary);margin-bottom:2.5rem">Have feedback, a bug report, or want to contribute to our curriculum? We'd love to hear from you.</p>
      <div style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-xl);padding:1.5rem">
        <p style="color:var(--color-text-secondary);margin-bottom:0.5rem">📧 Email us at:</p>
        <a href="mailto:hello@typeforge.dev" style="color:var(--color-accent);font-family:var(--font-mono);font-size:1.125rem">hello@typeforge.dev</a>
        <p style="color:var(--color-text-muted);font-size:0.875rem;margin-top:1.25rem">Response times: We typically respond within 2 business days. Feature requests and curriculum suggestions are reviewed monthly.</p>
      </div>
    </div>
  `;
  return page;
}

export function createPrivacyView() {
  const page = document.createElement("div");
  page.innerHTML = `
    <div style="max-width:720px;margin:0 auto;padding:2rem 1.5rem 4rem">
      <h1 style="font-size:2rem;font-weight:800;margin-bottom:0.5rem">Privacy Policy</h1>
      <p style="color:var(--color-text-secondary);margin-bottom:2rem">Last updated: August 2026</p>
      <div class="legal-content">
        <h2>Data Collection</h2>
        <p>TypeForge does not collect, store, transmit, or sell any personal data. No user account is required. No tracking cookies are set. No analytics pixels are used.</p>
        <h2>Local Storage</h2>
        <p>TypeForge stores all progress data (typing test history, WPM records, unlocked levels, and settings) locally in your browser using the Web Storage API (localStorage) and IndexedDB. This data exists only on your device and is not synchronized to any server.</p>
        <h2>Third-Party Services</h2>
        <p>TypeForge loads fonts from Google Fonts. Google's Font API may log HTTP requests per Google's own privacy policy. No other third-party scripts, APIs, or embeds are loaded.</p>
        <h2>Cookies</h2>
        <p>TypeForge does not set any cookies. We do not use session cookies, tracking cookies, or advertising cookies of any kind.</p>
        <h2>Contact</h2>
        <p>For privacy-related inquiries, contact us at <a href="mailto:hello@typeforge.dev">hello@typeforge.dev</a>.</p>
      </div>
    </div>
  `;
  injectLegalStyles(page);
  return page;
}

export function createTermsView() {
  const page = document.createElement("div");
  page.innerHTML = `
    <div style="max-width:720px;margin:0 auto;padding:2rem 1.5rem 4rem">
      <h1 style="font-size:2rem;font-weight:800;margin-bottom:0.5rem">Terms of Service</h1>
      <p style="color:var(--color-text-secondary);margin-bottom:2rem">Last updated: August 2026</p>
      <div class="legal-content">
        <h2>Use of Service</h2>
        <p>TypeForge is a free educational typing practice platform. Use of this service is at your own discretion. No warranty of fitness for a particular purpose is made.</p>
        <h2>Intellectual Property</h2>
        <p>The TypeForge name, design system, curriculum content, and educational material are the property of TypeForge and may not be reproduced without written permission. Public domain quotes used in the platform remain in the public domain.</p>
        <h2>Code Execution</h2>
        <p>JavaScript code execution runs in sandboxed iframe environments with no network access, no localStorage access, and a 2-second execution timeout. Use at your own risk. TypeForge is not responsible for any code you choose to evaluate.</p>
        <h2>Disclaimer</h2>
        <p>TypeForge is not affiliated with Monkeytype, Typing.com, TypingClub, or any other typing platform. All competitor references are for educational comparison only.</p>
        <h2>Governing Law</h2>
        <p>These terms are governed by applicable local law. For disputes or inquiries, contact us at <a href="mailto:hello@typeforge.dev">hello@typeforge.dev</a>.</p>
      </div>
    </div>
  `;
  injectLegalStyles(page);
  return page;
}

function injectLegalStyles(page) {
  const style = document.createElement("style");
  style.textContent = `
    .legal-content h2 { font-size:1.25rem;font-weight:700;margin:1.75rem 0 0.5rem;color:var(--color-text-primary); }
    .legal-content p { color:var(--color-text-secondary);line-height:1.8;margin-bottom:0.75rem; }
    .legal-content a { color:var(--color-accent); }
  `;
  document.head.appendChild(style);
}

export function createNotFoundView(router) {
  const page = document.createElement("div");
  page.style.cssText = "display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6rem 1.5rem;text-align:center";
  page.innerHTML = `
    <div style="font-family:var(--font-mono);font-size:5rem;color:var(--color-accent);margin-bottom:1rem">&gt;_</div>
    <h1 style="font-size:2rem;font-weight:800">404 — Page Not Found</h1>
    <p style="color:var(--color-text-secondary);margin:0.75rem 0 2rem">The page you're looking for doesn't exist, or the URL may have changed.</p>
    <button class="btn btn-primary" id="go-home-btn">← Back to Home</button>
  `;
  page.querySelector("#go-home-btn").addEventListener("click", () => router.navigate("/"));
  return page;
}
