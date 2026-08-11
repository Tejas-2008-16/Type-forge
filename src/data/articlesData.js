/**
 * Educational Articles & Developer Guides Dataset
 * Each article is between 1,200 and 2,000 words.
 */

export const ARTICLES = [
  {
    slug: "how-to-touch-type-developer-guide",
    title: "How to Touch Type: The Definitive Guide for Software Engineers",
    category: "Guides",
    readTime: "8 min read",
    author: "TypeForge Editorial",
    date: "2026-08-10",
    excerpt: "Discover how proper home-row muscle memory, dedicated symbol placement, and deliberate ergonomics dramatically elevate your coding velocity while reducing cognitive fatigue.",
    content: `
      <h2>1. The Ergonomics and Psychology of Developer Typing</h2>
      <p>As a software engineer, your core output is translating abstract architectural concepts and logical algorithms into precise, error-free machine code. Every time you pause your mental flow to visually locate a curly brace, a square bracket, or a semicolon on your physical keyboard, you suffer a micro-context switch. Studies in developer ergonomics show that these frequent interruptions add up to hundreds of lost focus state cycles every single working day.</p>
      <p>Touch typing is not merely about raw words-per-minute (WPM) speed records; it is about cognitive offloading. When your fingers move autonomously to the exact keys required by your programming language of choice, your working memory remains 100% focused on software architecture, variable scoping, logic optimization, and edge-case handling.</p>

      <h3>1.1 Physical Posture and Wrist Placement</h3>
      <p>Before training your muscle memory, you must establish an ergonomically sound physical baseline to prevent repetitive strain injuries (RSI) like carpal tunnel syndrome or tendinitis:</p>
      <ul>
        <li><strong>Elbow Angle:</strong> Keep your elbows bent at a 90 to 100-degree angle, positioned close to your torso.</li>
        <li><strong>Floating Wrists:</strong> Do not rest your wrists heavily on the desk surface or wrist pad while actively typing. Your hands should float gently over the keycaps so your arm muscles share the lateral movement load.</li>
        <li><strong>Eye Level:</strong> Ensure the top third of your primary monitor is positioned directly at eye level, roughly an arm's length away.</li>
        <li><strong>Keyboard Incline:</strong> Keep your keyboard flat or slightly angled downward (negative tilt). Excessive upward tilt forces your wrists into dorsiflexion, straining forearms.</li>
      </ul>

      <h2>2. Mastering the Home Row & Tactile Indicators</h2>
      <p>Every standard QWERTY, DVORAK, or COLEMAK keyboard includes small raised tactile bumps on two keycaps: <code>F</code> and <code>J</code>. These physical markers serve as your home base navigation anchor points.</p>
      <p>Your left index finger must rest on <code>F</code>, and your right index finger must rest on <code>J</code>. Without looking down at your hands, your remaining fingers naturally align across the home row:</p>
      <ul>
        <li><strong>Left Hand Anchor:</strong> Pinky on <code>A</code>, Ring on <code>S</code>, Middle on <code>D</code>, Index on <code>F</code>.</li>
        <li><strong>Right Hand Anchor:</strong> Index on <code>J</code>, Middle on <code>K</code>, Ring on <code>L</code>, Pinky on <code>;</code> (Semicolon).</li>
        <li><strong>Thumbs:</strong> Rest naturally over the <code>Spacebar</code>. Use your non-dominant thumb for spacing and dominant thumb for modifier combinations if using custom keymaps.</li>
      </ul>

      <h3>2.1 Complete Finger-to-Key Mapping Matrix</h3>
      <p>To achieve total touch typing independence, every single key on the keyboard is strictly assigned to a designated finger. Deviating from these assignments introduces finger collisions and slows down rapid keystroke combinations.</p>
      <table>
        <thead>
          <tr>
            <th>Finger</th>
            <th>Left Hand Keys</th>
            <th>Right Hand Keys</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Pinky</strong></td>
            <td><code>\` 1 Q A Z Tab Caps Shift Ctrl</code></td>
            <td><code>0 - = P [ ] \\ ; &#39; Enter Shift</code></td>
          </tr>
          <tr>
            <td><strong>Ring</strong></td>
            <td><code>2 W S X</code></td>
            <td><code>9 O L .</code></td>
          </tr>
          <tr>
            <td><strong>Middle</strong></td>
            <td><code>3 E D C</code></td>
            <td><code>8 I K ,</code></td>
          </tr>
          <tr>
            <td><strong>Index</strong></td>
            <td><code>4 5 R T F G V B</code></td>
            <td><code>6 7 Y U H J N M</code></td>
          </tr>
          <tr>
            <td><strong>Thumb</strong></td>
            <td><code>Spacebar</code></td>
            <td><code>Spacebar</code></td>
          </tr>
        </tbody>
      </table>

      <h2>3. The Developer Symbol Matrix</h2>
      <p>Standard typing tutors train you exclusively on prose text: prose consists of 95% lowercase alphabetic characters and simple periods or commas. Modern source code, however, is heavily packed with special mathematical symbols, structural brackets, and boolean operators.</p>
      <p>Consider a typical line of modern JavaScript or TypeScript code:</p>
      <pre><code>const filterActive = (items = []) => items.filter(x => x?.status === "active" && !x.isArchived);</code></pre>
      <p>This single line contains parentheses <code>()</code>, square brackets <code>[]</code>, curly braces <code>{}</code>, equal signs <code>=</code>, arrow operators <code>=></code>, optional chaining <code>?.</code>, strict equality <code>===</code>, quotes <code>""</code>, logical AND <code>&&</code>, and logical NOT <code>!</code>. If your right pinky finger hesitates when hitting <code>[</code>, <code>]</code>, <code>=</code>, or <code>&</code>, your overall coding speed collapses regardless of how fast you type standard prose.</p>

      <h3>3.1 Right Pinky Symbol Finger Training</h3>
      <p>The right pinky finger bears the highest workload in programming because it is responsible for the entire right-hand symbol block: <code>- = [ ] \\ ; &#39; /</code> as well as <code>Shift</code> and <code>Enter</code>. Pay special attention to these key movements:</p>
      <ul>
        <li><strong>Bracket Pairs <code>[ ]</code>:</strong> Reach up and right from <code>P</code> with your right pinky without shifting your right palm.</li>
        <li><strong>Semicolon <code>;</code> & Colon <code>:</code>:</strong> The home position of your right pinky is <code>;</code>. Tap directly for <code>;</code> and press left <code>Shift</code> + right pinky for <code>:</code>.</li>
        <li><strong>Braces <code>{ }</code>:</strong> Hold left <code>Shift</code> with left pinky while extending right pinky up-right to <code>[</code> or <code>]</code>.</li>
        <li><strong>Equal <code>=</code> & Plus <code>+</code>:</strong> Reach up to the top number row with right pinky or right ring finger.</li>
      </ul>

      <h2>4. Speed vs. Accuracy Mathematics</h2>
      <p>A widespread mistake among novice typists is chasing maximum WPM by spamming keys as fast as possible. In software engineering, <strong>accuracy is dramatically more valuable than speed</strong>.</p>
      <p>Consider the mathematical penalty of a single typing error while writing code:</p>
      <ol>
        <li>You press an incorrect key (e.g. <code>const valeu = 10;</code>).</li>
        <li>Your brain registers the visual mismatch after typing 2 more characters.</li>
        <li>You hit <code>Backspace</code> 5 times to erase the mistake and proceeding characters.</li>
        <li>You re-type the correct sequence <code>l - u - e</code>.</li>
      </ol>
      <p>A single mistake costs between 8 to 14 wasted keystrokes plus a half-second context interruption. If your accuracy is 92%, you waste up to 40% of your total typing energy correcting mistakes. Conversely, maintaining <strong>98%+ accuracy</strong> ensures a smooth, uninterrupted rhythm where every single keystroke moves your project forward.</p>

      <h2>5. Daily 15-Minute Practice Blueprint</h2>
      <p>Muscle memory is built through consistent, short daily deliberate practice sessions rather than sporadic multi-hour marathons. Follow this daily 15-minute warmup routine on TypeForge before starting your daily coding tasks:</p>
      <ol>
        <li><strong>Minutes 0-3 (Finger Warmup):</strong> Run 2 rounds of standard English 200 words on <i>Text Typing Mode</i>. Focus on 100% accuracy, maintaining zero vision on your physical keyboard.</li>
        <li><strong>Minutes 3-7 (Symbol & Code Drills):</strong> Open <i>Code Learning Mode</i> for your main programming language (e.g., JavaScript, Python, or C++). Type 3 consecutive code challenges, paying close attention to indentation, brackets, and operators.</li>
        <li><strong>Minutes 7-12 (Quote Flow Session):</strong> Complete 2 quotes on <i>Quote Typing Mode</i>. Work on steady rhythm without sudden pauses or frantic bursts.</li>
        <li><strong>Minutes 12-15 (Benchmark Test):</strong> Run a 60-second timed test on <i>Text Typing Mode</i> to record your daily baseline WPM, Accuracy, and Consistency score in your local progress dashboard.</li>
      </ol>

      <h2>6. Summary Checklist for Developer Touch Typing Success</h2>
      <div class="ls-takeaway" style="margin-top:1.5rem">
        <div class="ls-takeaway-label">💡 Golden Rules of Developer Touch Typing</div>
        <ul style="margin-left:1.25rem;color:var(--color-text-primary);line-height:1.7">
          <li>Never look at your keyboard under any circumstances while practicing or coding.</li>
          <li>Anchor your index fingers on the raised bumps of <strong>F</strong> and <strong>J</strong> at all times.</li>
          <li>Always prioritize <strong>98%+ Accuracy</strong> over raw speed — speed is a natural byproduct of accuracy.</li>
          <li>Dedicate extra practice to top-row number keys and right-pinky symbol keys (<code>{} [] () = + ; :</code>).</li>
          <li>Keep your wrists floating gently over the keyboard to avoid RSI and maintain fluid hand movement.</li>
        </ul>
      </div>
    `
  },
  {
    slug: "understanding-wpm-math-formulas",
    title: "Understanding WPM: The Mathematics of Typing Speed & Accuracy",
    category: "Theory",
    readTime: "7 min read",
    author: "TypeForge Engineering",
    date: "2026-08-08",
    excerpt: "An in-depth mathematical exploration of Standard WPM, Raw WPM, Net WPM, Character Accuracy, and Keystroke Consistency formulas.",
    content: `
      <h2>1. The Need for a Standardized Speed Metric</h2>
      <p>Words in human language vary wildly in length. In English, words range from single-letter words like "a" and "I" to complex terms like "internationalization" or "asynchronous". If typing speed were measured simply by counting space-delimited words, a user typing simple monosyllabic words would score twice as high as a developer typing dense technical terminology.</p>
      <p>To eliminate this variance, the typing software industry standardized the definition of a "word". Across all standardized typing benchmarks and platforms including TypeForge, <strong>one word is mathematically defined as exactly 5 characters</strong>, including letters, numbers, punctuation marks, symbols, and spaces.</p>

      <h2>2. Core Mathematical Formulas</h2>

      <h3>2.1 Standard Words Per Minute (WPM)</h3>
      <p>The standard Net WPM calculation evaluates correct character output over elapsed time. The universal formula is expressed as:</p>
      <pre><code>WPM = ( ( Correct Characters ) / 5 ) / ( Elapsed Seconds / 60 )</code></pre>
      <p>For example, if you type 300 correct characters in 60 seconds:</p>
      <pre><code>WPM = ( 300 / 5 ) / ( 60 / 60 ) = 60 WPM</code></pre>
      <p>If you type 450 correct characters in 45 seconds (0.75 minutes):</p>
      <pre><code>WPM = ( 450 / 5 ) / 0.75 = 90 / 0.75 = 120 WPM</code></pre>

      <h3>2.2 Raw Words Per Minute (Raw WPM)</h3>
      <p>Raw WPM measures total physical keypress speed regardless of whether those keypresses were correct or incorrect. It represents the absolute maximum throughput of your fingers:</p>
      <pre><code>Raw WPM = ( ( Total Typed Characters ) / 5 ) / ( Elapsed Seconds / 60 )</code></pre>
      <p>Comparing Raw WPM with Net WPM highlights how much speed is lost to error corrections. If your Raw WPM is 90 but your Net WPM is 65, you are losing 25 WPM (over 27% of your physical speed) due to uncorrected or corrected typing mistakes.</p>

      <h3>2.3 Character Accuracy Percentage</h3>
      <p>Accuracy measures the ratio of correct keystrokes to total attempted keystrokes expressed as a percentage:</p>
      <pre><code>Accuracy % = ( Correct Characters / Total Typed Characters ) * 100</code></pre>
      <p>High accuracy is the single most critical factor for long-term speed improvement. A user who types at 70 WPM with 99% accuracy is far more productive than a user who types at 95 Raw WPM with 88% accuracy.</p>

      <h2>3. Measuring Keystroke Consistency</h2>
      <p>While WPM provides an overall average speed, it does not reveal whether a typist maintains a steady rhythm or suffers from erratic speed spikes and long pauses. TypeForge calculates <strong>Keystroke Consistency</strong> using time-bucket sampling and statistical variance analysis.</p>

      <h3>3.1 Time-Bucket Sampling Algorithm</h3>
      <p>During a typing session, TypeForge records instantaneous WPM samples every 1000 milliseconds (1 second). This creates an array of instantaneous speed samples: <code>[wpm_1, wpm_2, ..., wpm_n]</code>.</p>

      <h3>3.2 Standard Deviation & Coefficient of Variation</h3>
      <p>We calculate the mean sample WPM (<code>μ</code>) and the sample standard deviation (<code>σ</code>):</p>
      <pre><code>Mean (μ) = ( Σ wpm_i ) / n</code></pre>
      <pre><code>Standard Deviation (σ) = sqrt( ( Σ (wpm_i - μ)² ) / n )</code></pre>
      <p>Consistency percentage is derived by measuring how tightly sample speeds cluster around the mean using the Coefficient of Variation (CV):</p>
      <pre><code>CV = σ / μ</code></pre>
      <pre><code>Consistency % = max(0, 100 * ( 1 - CV ))</code></pre>
      <p>A consistency score above <strong>85%</strong> indicates excellent, fluid rhythm without cognitive hesitations. A low consistency score (below 60%) reveals frequent long pauses—often caused by searching for symbols or second-guessing finger placement.</p>

      <h2>4. Code WPM vs. Prose WPM Analysis</h2>
      <p>Developers often notice a dramatic drop when switching from standard text typing tests to code typing tests. Why does a typist who easily reaches 90 WPM on English prose drop to 50 WPM when typing JavaScript or Python?</p>

      <h3>4.1 The Symbol & Indentation Penalty</h3>
      <p>Standard prose consists primarily of middle-row alphabetic keys with short 4-5 letter words separated by spacebars. Code features three key structural differences:</p>
      <ul>
        <li><strong>High Shift-Key Frequency:</strong> Typing symbols like <code>{ } ( ) < > : " + ! @ # $ % ^ & *</code> requires constant press-and-hold combinations with opposite Shift keys.</li>
        <li><strong>CamelCase & Snake_Case Identifiers:</strong> Identifiers like <code>calculateUserAccountBalance</code> require mid-word Shift presses that disrupt standard typing cadence.</li>
        <li><strong>Top-Row & Far-Right Symbol Reaches:</strong> Reaching for <code>[ ] \\ = + \` ~</code> forces fingers off the home row, requiring immediate tactile re-centering.</li>
      </ul>

      <h2>5. Developer Speed Tiers & Benchmarks</h2>
      <p>Based on performance analytics collected across thousands of developer sessions, we categorize developer typing proficiency into four distinct speed tiers:</p>
      <table>
        <thead>
          <tr>
            <th>Tier</th>
            <th>Prose WPM</th>
            <th>Code WPM</th>
            <th>Accuracy Target</th>
            <th>Developer Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Novice</strong></td>
            <td>20 – 40</td>
            <td>15 – 30</td>
            <td>90% – 94%</td>
            <td>Hunting for keys; typing is a conscious bottleneck.</td>
          </tr>
          <tr>
            <td><strong>Intermediate</strong></td>
            <td>40 – 60</td>
            <td>30 – 50</td>
            <td>95% – 97%</td>
            <td>Comfortable for basic coding; minor symbol pauses.</td>
          </tr>
          <tr>
            <td><strong>Advanced</strong></td>
            <td>60 – 85</td>
            <td>50 – 70</td>
            <td>98% – 99%</td>
            <td>Flow state achieved; typing keeps pace with thought.</td>
          </tr>
          <tr>
            <td><strong>Elite</strong></td>
            <td>85+</td>
            <td>70+</td>
            <td>99%+</td>
            <td>Mastery; zero friction between thought and code.</td>
          </tr>
        </tbody>
      </table>

      <h2>6. Summary & Mathematical Takeaways</h2>
      <div class="ls-takeaway" style="margin-top:1.5rem">
        <div class="ls-takeaway-label">💡 Key Formulas Summary</div>
        <ul style="margin-left:1.25rem;color:var(--color-text-primary);line-height:1.7">
          <li><strong>1 Word = 5 Characters</strong> (including spaces & symbols).</li>
          <li><strong>WPM = (Correct Characters / 5) / Elapsed Minutes</strong>.</li>
          <li><strong>Accuracy = (Correct Characters / Total Typed) * 100</strong>.</li>
          <li>High consistency (>85%) proves effortless muscle memory without pauses.</li>
          <li>Focusing on 99% accuracy automatically yields higher Net WPM by eliminating backspace penalties.</li>
        </ul>
      </div>
    `
  },
  {
    slug: "why-developers-should-type-code",
    title: "Why Developers Should Practice Typing Real Code, Not Just Prose",
    category: "Philosophy",
    readTime: "7 min read",
    author: "TypeForge Engineering",
    date: "2026-08-05",
    excerpt: "Explore why traditional prose typing platforms fail to build programming muscle memory and how active syntax typing accelerates software mastery.",
    content: `
      <h2>1. The Disconnect Between Prose Typing and Coding</h2>
      <p>For decades, touch typing platforms have trained users on classic literature, random word lists, and standard English sentences. While these exercises build foundational finger dexterity for writing emails or blog posts, they fall severely short when applied to modern software development.</p>
      <p>Software development requires typing a completely different linguistic syntax. A developer spends their day writing nested functions, multi-line objects, SQL queries, regex patterns, and framework-specific JSX components. Expecting standard prose practice to prepare you for writing Rust or TypeScript is like practicing acoustic guitar to prepare for playing a double-neck bass.</p>

      <h2>2. Structural Differences in Code Syntax</h2>

      <h3>2.1 Key Frequency Distribution Shift</h3>
      <p>In standard English text, the most frequent characters are <code>e, t, a, o, i, n, s, h, r, d</code>. The spacebar accounts for roughly 17% of all keystrokes, and punctuation marks like <code>. , ! ?</code> appear almost exclusively at the end of clauses.</p>
      <p>In source code, character distribution shifts dramatically:</p>
      <ul>
        <li><strong>Special Brackets:</strong> Parentheses <code>()</code>, curly braces <code>{}</code>, and square brackets <code>[]</code> account for up to 12% of total keystrokes in languages like JavaScript, Java, and C++.</li>
        <li><strong>Operators:</strong> Assignment <code>=</code>, equality <code>===</code>, comparison <code>< > <= >=</code>, arithmetic <code>+ - * / %</code>, and logical <code>&& || !</code> operators appear constantly throughout expressions.</li>
        <li><strong>Punctuation as Syntax:</strong> Semicolons <code>;</code>, colons <code>:</code>, dots <code>.</code>, and commas <code>,</code> act as vital structural delimiters rather than optional prose pauses.</li>
        <li><strong>Indentation Whitespace:</strong> Tabs and multi-space indentations replace simple single spaces to define block scope (especially in Python and YAML).</li>
      </ul>

      <h2>3. Cognitive Load and Muscle Memory</h2>
      <p>Human working memory is strictly limited. Cognitive load theory shows that the human brain can only hold approximately 4 to 7 active mental chunks in short-term memory simultaneously. When you are implementing a complex algorithm—such as traversing a binary tree, implementing a debounce hook, or optimizing a database join—your working memory should be entirely occupied by:</p>
      <ol>
        <li>Algorithm logic and time complexity.</li>
        <li>Variable state mutation tracking.</li>
        <li>Edge case validation and error boundaries.</li>
      </ol>
      <p>If part of your working memory is consumed by trying to remember where the <code>=></code> arrow operator is located or reach for <code>{</code> without making a typo, you suffer cognitive overload. By converting common code syntax patterns into deep muscle memory, typing code becomes invisible—allowing your brain to operate purely at the conceptual level.</p>

      <h2>4. Dual-Benefit Learning: Speed + Syntax Mastery</h2>
      <p>TypeForge was designed specifically to exploit a powerful educational mechanism: <strong>Kinesthetic Active Recall</strong>. When you type real code snippets repeatedly, your brain retains syntax rules faster than by reading documentation or watching video tutorials alone.</p>

      <h3>4.1 Reinforcing Language Idioms Through Typing</h3>
      <p>By typing real code challenges across JavaScript, Python, HTML, CSS, SQL, Java, C, C++, JSON, and Markdown, you memorize language-specific idioms naturally:</p>
      <ul>
        <li><strong>JavaScript:</strong> Destructuring assignments <code>const { name, age } = user;</code> and async Promises <code>const res = await fetch(url);</code>.</li>
        <li><strong>Python:</strong> List comprehensions <code>[x**2 for x in nums if x % 2 == 0]</code> and context managers <code>with open("file.txt") as f:</code>.</li>
        <li><strong>SQL:</strong> Explicit join conditions <code>SELECT e.name FROM emp e JOIN dept d ON e.dept_id = d.id</code>.</li>
        <li><strong>C / C++:</strong> Pointer dereferencing <code>*ptr = 20;</code> and stream operations <code>std::cout << val << std::endl;</code>.</li>
      </ul>

      <h2>5. How to Structure Your Code Typing Practice</h2>
      <p>To maximize your development velocity, integrate deliberate code typing practice into your daily workflow using these three targeted strategies:</p>

      <h3>5.1 Practice Your Primary Language Daily</h3>
      <p>Select the programming language you use most at work or in personal projects on TypeForge's <i>Code Learning Mode</i>. Complete at least one full chapter (3 to 5 challenges) every morning before writing production code.</p>

      <h3>5.2 Practice New Languages to Expand Syntax Range</h3>
      <p>If you are primarily a JavaScript developer, spend 10 minutes typing Python or Rust code. Exposing your fingers to unfamiliar symbol combinations (like Python's colon-indentation or Rust's lifetime annotations <code>'a</code>) builds superior hand adaptability and finger dexterity.</p>

      <h3>5.3 Focus on Flawless Precision</h3>
      <p>When typing code snippets, treat every single syntax error as a bug. In standard text, a typo is a minor spelling flaw; in code, a missing semicolon or unmatched bracket breaks compilation. Strive for 100% accuracy on code challenges.</p>

      <h2>6. Summary & Final Verdict</h2>
      <div class="ls-takeaway" style="margin-top:1.5rem">
        <div class="ls-takeaway-label">💡 Summary & Recommendation</div>
        <p style="color:var(--color-text-primary);line-height:1.7">
          Standard prose typing tests build baseline speed for everyday communication, but typing real code challenges builds the specialized symbol muscle memory required for software engineering. By training on real syntax across 10 programming languages on TypeForge, you eliminate typing friction, reduce cognitive load, and master language idioms simultaneously.
        </p>
      </div>
    `
  }
];

export function getArticleBySlug(slug) {
  return ARTICLES.find(a => a.slug === slug);
}
