/**
 * TypeForge Footer Component
 */
export function createFooter(router) {
  const footer = document.createElement("footer");
  footer.className = "footer";

  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-brand">
        <div class="logo">
          <span class="logo-prompt">&gt;_</span>
          <span>TypeForge</span>
        </div>
        <p>Type with purpose. Code with confidence.<br>
        Practice typing with real programming challenges.</p>
      </div>
      <div class="footer-col">
        <h4>Practice</h4>
        <ul class="footer-links">
          <li><a href="/typing-test" data-nav>Typing Test</a></li>
          <li><a href="/quotes" data-nav>Quote Typing</a></li>
          <li><a href="/code-typing" data-nav>Code Learning</a></li>
          <li><a href="/progress" data-nav>My Progress</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Learn</h4>
        <ul class="footer-links">
          <li><a href="/code-typing/javascript" data-nav>JavaScript</a></li>
          <li><a href="/code-typing/python" data-nav>Python</a></li>
          <li><a href="/code-typing/html" data-nav>HTML</a></li>
          <li><a href="/code-typing/css" data-nav>CSS</a></li>
          <li><a href="/code-typing/sql" data-nav>SQL</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul class="footer-links">
          <li><a href="/articles" data-nav>Articles</a></li>
          <li><a href="/about" data-nav>About</a></li>
          <li><a href="/contact" data-nav>Contact</a></li>
          <li><a href="/privacy-policy" data-nav>Privacy Policy</a></li>
          <li><a href="/terms-of-service" data-nav>Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 TypeForge. All rights reserved.</span>
      <span>Not affiliated with any other typing platform.</span>
    </div>
  `;

  footer.querySelectorAll("[data-nav]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      router.navigate(link.getAttribute("href"));
    });
  });

  return footer;
}
