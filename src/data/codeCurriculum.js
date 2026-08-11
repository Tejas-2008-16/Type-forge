/**
 * TypeForge Full Coding Curriculum
 * 10 Programming Languages · Chapter-Based Syllabus · Project Capstones
 */

export const LANGUAGES = [
  { id: "javascript", name: "JavaScript", levelsCount: 10, icon: "JS", color: "#f7df1e", bg: "rgba(247,223,30,0.08)", description: "The language of the web. Master variables, functions, async, DOM, and build a real project." },
  { id: "python",     name: "Python",     levelsCount: 10, icon: "PY", color: "#3572a5", bg: "rgba(53,114,165,0.1)", description: "Clean, readable syntax. Learn data structures, loops, OOP, and build a CLI calculator." },
  { id: "html",       name: "HTML5",      levelsCount: 7,  icon: "HTML", color: "#e34c26", bg: "rgba(227,76,38,0.1)", description: "The backbone of web content. Learn semantic tags, forms, and build a personal webpage." },
  { id: "css",        name: "CSS3",       levelsCount: 7,  icon: "CSS", color: "#264de4", bg: "rgba(38,77,228,0.1)", description: "Style the web beautifully. Master Flexbox, Grid, animations, and build a styled card." },
  { id: "java",       name: "Java",       levelsCount: 6,  icon: "JAVA", color: "#b07219", bg: "rgba(176,114,25,0.1)", description: "Strongly typed OOP for enterprise. Learn classes, collections, and build a bank simulator." },
  { id: "c",          name: "C",          levelsCount: 6,  icon: "C",  color: "#555555", bg: "rgba(85,85,85,0.1)", description: "The foundational systems language. Master pointers, memory, and build a linked list." },
  { id: "cpp",        name: "C++",        levelsCount: 6,  icon: "C++", color: "#f34b7d", bg: "rgba(243,75,125,0.1)", description: "High-performance OOP. Learn STL, templates, and implement a stack from scratch." },
  { id: "sql",        name: "SQL",        levelsCount: 6,  icon: "SQL", color: "#e38c00", bg: "rgba(227,140,0,0.1)", description: "Query relational databases. Learn SELECT, JOINs, aggregations, and model an employee DB." },
  { id: "json",       name: "JSON",       levelsCount: 3,  icon: "JSON", color: "#4dab9a", bg: "rgba(77,171,154,0.1)", description: "The universal data format. Learn key-value syntax, nested objects, and arrays." },
  { id: "markdown",   name: "Markdown",   levelsCount: 3,  icon: "MD",  color: "#083fa1", bg: "rgba(8,63,161,0.1)", description: "Write beautiful documentation. Learn headings, lists, links, and write a full README." },
];

export const CODE_CURRICULUM = {

  // ─────────────────────────── JAVASCRIPT ───────────────────────────────
  javascript: {
    levels: [
      {
        id: 1, title: "Console Output", description: "Print text and values to the console.",
        challenges: [
          {
            id: "js-1-1", title: "Hello, World!",
            code: 'console.log("Hello, World!");',
            expectedOutput: "Hello, World!",
            explanation: {
              conceptTitle: "The console.log() Function",
              conceptBody: "console.log() is JavaScript's built-in function to print values to the browser console or Node.js terminal. It is your primary debugging tool.",
              breakdown: ["console — the global browser/Node debugging object", ".log() — method that prints to console", '"Hello, World!" — a string literal in double quotes'],
              commonMistakes: ['Console.log("Hi") → Error: JavaScript is case-sensitive.', 'console.log Hello → Error: parentheses are required for function calls.'],
              keyTakeaway: "Every JS developer uses console.log() dozens of times per day. Memorize it."
            }
          },
          {
            id: "js-1-2", title: "Printing Numbers",
            code: "console.log(42);",
            expectedOutput: "42",
            explanation: {
              conceptTitle: "Numeric Literals",
              conceptBody: "Numbers do not require quotes. Writing console.log(42) outputs the integer 42, while console.log('42') outputs the string '42'.",
              breakdown: ["42 — a primitive numeric value", "No quotes — numeric literals are bare values"],
              commonMistakes: ['Wrapping numbers in quotes makes them strings, not numbers.'],
              keyTakeaway: "Distinguish between number 42 and string '42' — they behave differently in math operations."
            }
          },
          {
            id: "js-1-3", title: "Multiple Values",
            code: 'console.log("Name:", "Alice", "Age:", 30);',
            expectedOutput: "Name: Alice Age: 30",
            explanation: {
              conceptTitle: "Multiple Arguments in console.log",
              conceptBody: "console.log accepts multiple comma-separated arguments and prints them space-separated on one line.",
              breakdown: ["Multiple args — separated by commas", "Output — auto-joined with spaces"],
              commonMistakes: ['Using + to join causes issues if mixing numbers and strings.'],
              keyTakeaway: "Use multiple arguments for readable debug output without string concatenation."
            }
          }
        ]
      },
      {
        id: 2, title: "Variables", description: "Declare and assign variables with let and const.",
        challenges: [
          {
            id: "js-2-1", title: "Let Declaration",
            code: 'let username = "Alice";\nconsole.log(username);',
            expectedOutput: "Alice",
            explanation: {
              conceptTitle: "let — Block-Scoped Variables",
              conceptBody: "let creates a variable that can be reassigned. It is block-scoped, meaning it only exists within the { } block where it is declared.",
              breakdown: ["let — keyword for mutable variable", "username — identifier name", '= "Alice" — initial assignment'],
              commonMistakes: ["Redeclaring let in the same scope causes SyntaxError.", "let x; without assignment gives undefined, not an error."],
              keyTakeaway: "Use let when you plan to reassign the variable later."
            }
          },
          {
            id: "js-2-2", title: "Const Declaration",
            code: "const MAX_SCORE = 100;\nconsole.log(MAX_SCORE);",
            expectedOutput: "100",
            explanation: {
              conceptTitle: "const — Immutable Bindings",
              conceptBody: "const creates a read-only binding. You cannot reassign a const after declaration. Convention: use UPPER_SNAKE_CASE for true constants.",
              breakdown: ["const — keyword for constant binding", "MAX_SCORE — UPPER_SNAKE_CASE convention", "= 100 — must be initialized at declaration"],
              commonMistakes: ["const x; without value → SyntaxError.", "const arr = []; then arr.push(1) is fine — the binding, not the object, is constant."],
              keyTakeaway: "Default to const. Switch to let only when you need to reassign."
            }
          },
          {
            id: "js-2-3", title: "Multiple Variables",
            code: 'const name = "TypeForge";\nlet version = 2;\nconsole.log(name, version);',
            expectedOutput: "TypeForge 2",
            explanation: {
              conceptTitle: "Combining const and let",
              conceptBody: "Real programs use a mix of const (for things that won't change) and let (for things that will).",
              breakdown: ['const name — string that stays fixed', 'let version — number that may be incremented later'],
              commonMistakes: ["Using var instead of let/const — var has function scope and causes subtle bugs."],
              keyTakeaway: "Prefer const by default, use let when mutation is needed, never use var in modern JS."
            }
          }
        ]
      },
      {
        id: 3, title: "Strings & Template Literals", description: "Manipulate and interpolate strings.",
        challenges: [
          {
            id: "js-3-1", title: "Template Literals",
            code: 'const user = "Alice";\nconsole.log(`Hello, ${user}!`);',
            expectedOutput: "Hello, Alice!",
            explanation: {
              conceptTitle: "Template Literals",
              conceptBody: "Backtick strings allow embedding expressions using ${} syntax. Called template literals or template strings.",
              breakdown: ["Backticks (` `) — enclose the template string", "${user} — evaluates the variable inline"],
              commonMistakes: ["Using single/double quotes with ${} prints the literal text, not the value."],
              keyTakeaway: "Use template literals for readable string interpolation — much cleaner than concatenation."
            }
          },
          {
            id: "js-3-2", title: "String Methods",
            code: 'const lang = "javascript";\nconsole.log(lang.toUpperCase());',
            expectedOutput: "JAVASCRIPT",
            explanation: {
              conceptTitle: "Built-in String Methods",
              conceptBody: "Strings have built-in methods like .toUpperCase(), .toLowerCase(), .length, .trim(), .includes() etc.",
              breakdown: [".toUpperCase() — returns new all-caps string", "strings are immutable — original is unchanged"],
              commonMistakes: ["Confusing .length (property, no parens) with .toUpperCase() (method, needs parens)."],
              keyTakeaway: "String methods return new strings. The original string is never mutated."
            }
          }
        ]
      },
      {
        id: 4, title: "Arrays", description: "Store and manipulate lists of data.",
        challenges: [
          {
            id: "js-4-1", title: "Array Basics",
            code: 'const fruits = ["apple", "banana", "cherry"];\nconsole.log(fruits[0]);',
            expectedOutput: "apple",
            explanation: {
              conceptTitle: "Arrays & Zero-Based Indexing",
              conceptBody: "Arrays hold ordered lists. Indices start at 0. Access items with bracket notation array[index].",
              breakdown: ["[] — array literal syntax", "[0] — first element (zero-based)", "fruits.length would be 3"],
              commonMistakes: ["fruits[3] on a 3-element array → undefined, not an error."],
              keyTakeaway: "Arrays are zero-indexed. The last element is at array[array.length - 1]."
            }
          },
          {
            id: "js-4-2", title: "Push & Pop",
            code: 'const nums = [1, 2, 3];\nnums.push(4);\nconsole.log(nums.length);',
            expectedOutput: "4",
            explanation: {
              conceptTitle: "Mutating Arrays with push/pop",
              conceptBody: ".push() adds to the end, .pop() removes from the end. Both mutate the original array.",
              breakdown: [".push(4) — appends 4 to array", ".length — returns updated count of 4"],
              commonMistakes: ["push returns the new length, not the array itself."],
              keyTakeaway: "push/pop work on the END of an array. unshift/shift work on the BEGINNING."
            }
          },
          {
            id: "js-4-3", title: "Array forEach",
            code: 'const scores = [10, 20, 30];\nscores.forEach(s => console.log(s));',
            expectedOutput: "10\n20\n30",
            explanation: {
              conceptTitle: "forEach — Iterate an Array",
              conceptBody: ".forEach() runs a callback for each element. It does not return a new array (unlike .map()).",
              breakdown: [".forEach(callback) — calls callback with each element", "s => — arrow function shorthand", "Arrow function implicitly receives (element, index, array)"],
              commonMistakes: ["forEach always returns undefined — don't try to chain it to get a new array."],
              keyTakeaway: "Use forEach for side effects (logging, updating DOM). Use map to transform arrays."
            }
          }
        ]
      },
      {
        id: 5, title: "Objects", description: "Key-value data structures.",
        challenges: [
          {
            id: "js-5-1", title: "Object Literals",
            code: 'const person = { name: "Bob", age: 25 };\nconsole.log(person.name);',
            expectedOutput: "Bob",
            explanation: {
              conceptTitle: "JavaScript Objects",
              conceptBody: "Objects store data as key:value pairs. Access values with dot notation (obj.key) or bracket notation (obj['key']).",
              breakdown: ["{ } — object literal syntax", "name: 'Bob' — key:value pair", ".name — dot notation property access"],
              commonMistakes: ["person.Name → undefined — keys are case-sensitive.", "person['name'] works too — useful for dynamic keys."],
              keyTakeaway: "Objects are the fundamental data structure in JavaScript. Master dot and bracket notation."
            }
          },
          {
            id: "js-5-2", title: "Object Destructuring",
            code: 'const user = { name: "Eve", role: "admin" };\nconst { name, role } = user;\nconsole.log(name, role);',
            expectedOutput: "Eve admin",
            explanation: {
              conceptTitle: "Destructuring Assignment",
              conceptBody: "Destructuring extracts properties from objects into variables in one clean step.",
              breakdown: ["const { name, role } = user — extracts both properties", "Variable names must match the object keys"],
              commonMistakes: ["const { Name } = user → undefined — key name must match exactly."],
              keyTakeaway: "Destructuring is heavily used in modern JS, React props, and API responses."
            }
          }
        ]
      },
      {
        id: 6, title: "Functions", description: "Define reusable logic blocks.",
        challenges: [
          {
            id: "js-6-1", title: "Function Declaration",
            code: 'function greet(name) {\n  return `Hello, ${name}!`;\n}\nconsole.log(greet("Dev"));',
            expectedOutput: "Hello, Dev!",
            explanation: {
              conceptTitle: "Function Declarations",
              conceptBody: "Functions group code into reusable blocks. They accept parameters and return values.",
              breakdown: ["function — keyword", "greet(name) — function name and parameter", "return — sends the value back to the caller"],
              commonMistakes: ["Forgetting return gives undefined output.", "function declarations are hoisted — can be called before definition."],
              keyTakeaway: "Functions are the building blocks of programs. Every function should do ONE thing well."
            }
          },
          {
            id: "js-6-2", title: "Arrow Functions",
            code: 'const add = (a, b) => a + b;\nconsole.log(add(3, 4));',
            expectedOutput: "7",
            explanation: {
              conceptTitle: "Arrow Function Syntax",
              conceptBody: "Arrow functions are a concise syntax. Single-expression arrows implicitly return the value.",
              breakdown: ["const add = (a, b) => — arrow function assigned to variable", "a + b — implicit return when no curly braces"],
              commonMistakes: ["(a, b) => { a + b } does NOT return — you need explicit return inside braces."],
              keyTakeaway: "Arrow functions without braces implicitly return. With braces, you need explicit return."
            }
          },
          {
            id: "js-6-3", title: "Default Parameters",
            code: 'function greet(name = "World") {\n  return `Hello, ${name}!`;\n}\nconsole.log(greet());',
            expectedOutput: "Hello, World!",
            explanation: {
              conceptTitle: "Default Parameter Values",
              conceptBody: "Default parameters provide fallback values when arguments are not provided or are undefined.",
              breakdown: ['name = "World" — default value when omitted', 'greet() — called with no args, uses default'],
              commonMistakes: ["greet(null) → 'Hello, null!' — null is NOT undefined, so default doesn't apply."],
              keyTakeaway: "Default parameters make functions more flexible and self-documenting."
            }
          }
        ]
      },
      {
        id: 7, title: "Control Flow", description: "Conditionals and loops.",
        challenges: [
          {
            id: "js-7-1", title: "If / Else",
            code: 'const score = 72;\nif (score >= 90) {\n  console.log("A");\n} else if (score >= 70) {\n  console.log("B");\n} else {\n  console.log("C");\n}',
            expectedOutput: "B",
            explanation: {
              conceptTitle: "if / else if / else",
              conceptBody: "JavaScript evaluates conditions top to bottom and executes the first true block.",
              breakdown: ["score >= 90 → false, skip", "score >= 70 → true, execute and stop", "else block skipped"],
              commonMistakes: ["Using = (assignment) instead of === (comparison) in conditions."],
              keyTakeaway: "Use === (strict equality) not == (loose equality). == performs type coercion."
            }
          },
          {
            id: "js-7-2", title: "For Loop",
            code: 'for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}',
            expectedOutput: "1\n2\n3",
            explanation: {
              conceptTitle: "for Loop Structure",
              conceptBody: "A for loop repeats code a specific number of times. Init; condition; update all in one line.",
              breakdown: ["let i = 1 — initialize counter", "i <= 3 — check before each iteration", "i++ — increment after each loop body"],
              commonMistakes: ["Forgetting i++ creates an infinite loop.", "Using i < 3 would print 1 and 2, not 1-3."],
              keyTakeaway: "for loops are perfect when you know how many times to iterate."
            }
          },
          {
            id: "js-7-3", title: "While Loop",
            code: 'let count = 0;\nwhile (count < 3) {\n  console.log(count);\n  count++;\n}',
            expectedOutput: "0\n1\n2",
            explanation: {
              conceptTitle: "while Loop",
              conceptBody: "while loops continue as long as the condition is true. Must update the condition variable inside the loop.",
              breakdown: ["while (count < 3) — check condition first", "count++ — must update inside body or infinite loop"],
              commonMistakes: ["Forgetting count++ inside the body creates an infinite loop."],
              keyTakeaway: "Use while when you don't know in advance how many iterations you need."
            }
          }
        ]
      },
      {
        id: 8, title: "DOM & Events", description: "Interact with the browser document.",
        challenges: [
          {
            id: "js-8-1", title: "Selecting Elements",
            code: 'const btn = document.querySelector("#my-btn");\nconsole.log(btn !== null);',
            expectedOutput: "true",
            explanation: {
              conceptTitle: "DOM Querying",
              conceptBody: "document.querySelector() returns the first matching DOM element, or null if not found. Uses CSS selector syntax.",
              breakdown: ["document.querySelector() — finds first match", '"#my-btn" — CSS ID selector', "Returns null if not found"],
              commonMistakes: ["querySelector('#btn') vs getElementById('btn') — both work but querySelector is more flexible."],
              keyTakeaway: "querySelector with CSS selectors is the modern, flexible way to select DOM elements."
            }
          },
          {
            id: "js-8-2", title: "Event Listeners",
            code: 'document.addEventListener("DOMContentLoaded", () => {\n  console.log("DOM ready!");\n});',
            expectedOutput: "DOM ready!",
            explanation: {
              conceptTitle: "addEventListener",
              conceptBody: "addEventListener attaches a function to run when a specific event occurs on an element.",
              breakdown: ['"DOMContentLoaded" — fires when HTML is fully parsed', "() => { } — callback function", "Runs asynchronously when the event fires"],
              commonMistakes: ["Attaching events before the DOM loads means the elements don't exist yet."],
              keyTakeaway: "Always wait for DOMContentLoaded before querying elements if script is in <head>."
            }
          }
        ]
      },
      {
        id: 9, title: "Async & Promises", description: "Handle asynchronous operations.",
        challenges: [
          {
            id: "js-9-1", title: "Async/Await",
            code: 'async function fetchData() {\n  const data = await Promise.resolve("ok");\n  console.log(data);\n}\nfetchData();',
            expectedOutput: "ok",
            explanation: {
              conceptTitle: "async / await",
              conceptBody: "async functions always return a Promise. await pauses execution until a Promise resolves, making async code look synchronous.",
              breakdown: ["async — marks function as asynchronous", "await — waits for Promise to resolve", "Promise.resolve('ok') — immediately resolves with 'ok'"],
              commonMistakes: ["await outside async function → SyntaxError.", "Not awaiting an async function returns a Promise object, not the value."],
              keyTakeaway: "async/await is syntactic sugar over Promises. It makes async code readable and debuggable."
            }
          },
          {
            id: "js-9-2", title: "Try/Catch with Async",
            code: 'async function fetchUser() {\n  try {\n    const res = await Promise.resolve({ name: "Alice" });\n    console.log(res.name);\n  } catch (err) {\n    console.log("Error:", err);\n  }\n}\nfetchUser();',
            expectedOutput: "Alice",
            explanation: {
              conceptTitle: "Error Handling in Async Functions",
              conceptBody: "Wrap await calls in try/catch to handle rejected Promises gracefully.",
              breakdown: ["try { } — code that might throw/reject", "catch (err) { } — handles rejected Promise", "err contains the rejection reason"],
              commonMistakes: ["Unhandled Promise rejections can crash Node.js servers."],
              keyTakeaway: "Always handle async errors with try/catch. Never leave Promises unhandled."
            }
          }
        ]
      },
      {
        id: 10, title: "Project: Todo App Logic", description: "Build a complete Todo app data layer.",
        challenges: [
          {
            id: "js-10-1", title: "Todo Manager Class",
            code: 'class TodoApp {\n  constructor() {\n    this.todos = [];\n  }\n  add(task) {\n    this.todos.push({ task, done: false });\n  }\n  complete(index) {\n    this.todos[index].done = true;\n  }\n  count() {\n    return this.todos.filter(t => !t.done).length;\n  }\n}\nconst app = new TodoApp();\napp.add("Learn JavaScript");\napp.add("Build a project");\napp.complete(0);\nconsole.log(app.count());',
            expectedOutput: "1",
            explanation: {
              conceptTitle: "Classes & OOP in JavaScript",
              conceptBody: "Classes provide a blueprint for creating objects. They encapsulate data (properties) and behavior (methods) together.",
              breakdown: ["class TodoApp — defines the blueprint", "constructor() — runs on new TodoApp()", "this.todos — instance property", ".filter(t => !t.done) — counts incomplete tasks"],
              commonMistakes: ["Forgetting new before TodoApp() → TypeError.", "this inside arrow functions in class methods refers to the class instance correctly."],
              keyTakeaway: "OOP with classes lets you model real-world concepts as objects with state and behavior."
            }
          },
          {
            id: "js-10-2", title: "Array Map & Filter",
            code: 'const tasks = ["Code", "Review", "Deploy"];\nconst upper = tasks.map(t => t.toUpperCase());\nconst filtered = upper.filter(t => t.length > 4);\nconsole.log(filtered.join(", "));',
            expectedOutput: "REVIEW, DEPLOY",
            explanation: {
              conceptTitle: "map, filter, join — Functional Array Methods",
              conceptBody: "map transforms each element. filter keeps elements matching a condition. join concatenates into a string.",
              breakdown: [".map(fn) — returns new array with transformed elements", ".filter(fn) — returns new array with elements where fn returns true", ".join(', ') — combines into comma-separated string"],
              commonMistakes: ["map and filter do NOT mutate the original array — they return new arrays."],
              keyTakeaway: "Chaining map().filter().reduce() is the functional programming pattern in modern JavaScript."
            }
          }
        ]
      }
    ]
  },

  // ─────────────────────────── PYTHON ──────────────────────────────────
  python: {
    levels: [
      {
        id: 1, title: "Print & Variables", description: "Output text and define variables.",
        challenges: [
          {
            id: "py-1-1", title: "Hello, Python!",
            code: 'print("Hello, Python!")',
            expectedOutput: "Hello, Python!",
            explanation: {
              conceptTitle: "The print() Function",
              conceptBody: "In Python, print() outputs text or values to the console. No semicolons or curly braces needed.",
              breakdown: ['print() — built-in output function', '"Hello, Python!" — string argument'],
              commonMistakes: ['Print("Hi") → NameError: Python is case-sensitive.', 'print "Hi" → SyntaxError in Python 3.'],
              keyTakeaway: "Python 3 requires parentheses: print('text'). Python 2 style print 'text' won't work."
            }
          },
          {
            id: "py-1-2", title: "Variable Assignment",
            code: 'lang = "Python"\nversion = 3\nprint(lang, version)',
            expectedOutput: "Python 3",
            explanation: {
              conceptTitle: "Dynamic Typing in Python",
              conceptBody: "Python variables are created by assignment. No type declarations needed — Python infers the type.",
              breakdown: ['lang = "Python" — string variable', 'version = 3 — integer variable', 'print(lang, version) — prints space-separated'],
              commonMistakes: ["No let, const, or var keywords in Python."],
              keyTakeaway: "Python is dynamically typed — variables can hold any type and can be reassigned to different types."
            }
          }
        ]
      },
      {
        id: 2, title: "Strings", description: "Format and manipulate Python strings.",
        challenges: [
          {
            id: "py-2-1", title: "F-Strings",
            code: 'name = "Alice"\nage = 30\nprint(f"My name is {name} and I am {age} years old.")',
            expectedOutput: "My name is Alice and I am 30 years old.",
            explanation: {
              conceptTitle: "F-String Formatting",
              conceptBody: "F-strings (formatted string literals) allow embedding expressions directly using {variable} syntax. Prefix string with f.",
              breakdown: ["f'...' — prefix with f to enable formatting", "{name} — evaluates and inserts the variable", "{age} — works with any data type"],
              commonMistakes: ["Forgetting the f prefix makes {} print literally.", "f-strings require Python 3.6+."],
              keyTakeaway: "F-strings are the modern, readable way to format strings in Python 3.6+."
            }
          },
          {
            id: "py-2-2", title: "String Methods",
            code: 'text = "  hello world  "\nprint(text.strip().title())',
            expectedOutput: "Hello World",
            explanation: {
              conceptTitle: "Chaining String Methods",
              conceptBody: "Python strings are objects with dozens of methods. Methods can be chained because each returns a new string.",
              breakdown: [".strip() — removes leading/trailing whitespace", ".title() — capitalizes first letter of each word", "Chaining — right to left, each returns new string"],
              commonMistakes: ["Strings are immutable — methods return new strings, originals unchanged."],
              keyTakeaway: "Learn .strip(), .split(), .join(), .replace(), .upper(), .lower() — the most-used string methods."
            }
          }
        ]
      },
      {
        id: 3, title: "Lists", description: "Python's versatile ordered collections.",
        challenges: [
          {
            id: "py-3-1", title: "List Basics",
            code: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits[1])\nprint(len(fruits))',
            expectedOutput: "banana\n3",
            explanation: {
              conceptTitle: "Lists & Indexing",
              conceptBody: "Python lists are mutable, ordered sequences. Access with zero-based indices. len() returns element count.",
              breakdown: ["[ ] — list literal", "fruits[1] — second element (zero-based)", "len(fruits) — built-in length function"],
              commonMistakes: ["fruits[3] on a 3-item list → IndexError (out of range)."],
              keyTakeaway: "Python lists can hold mixed types: [1, 'hello', True, None] is valid."
            }
          },
          {
            id: "py-3-2", title: "List Comprehension",
            code: 'numbers = [1, 2, 3, 4, 5]\nsquares = [n ** 2 for n in numbers]\nprint(squares)',
            expectedOutput: "[1, 4, 9, 16, 25]",
            explanation: {
              conceptTitle: "List Comprehensions",
              conceptBody: "List comprehensions create new lists by applying an expression to each item in an iterable. More Pythonic than loops.",
              breakdown: ["[expr for item in iterable] — comprehension syntax", "n ** 2 — exponentiation operator", "Creates a new list, doesn't mutate original"],
              commonMistakes: ["Confusing list comprehension with generator expression: [] vs ()."],
              keyTakeaway: "List comprehensions are more Pythonic and often faster than equivalent for loops."
            }
          }
        ]
      },
      {
        id: 4, title: "Dictionaries", description: "Key-value storage in Python.",
        challenges: [
          {
            id: "py-4-1", title: "Dict Basics",
            code: 'user = {"name": "Bob", "age": 25}\nprint(user["name"])\nprint(user.get("email", "No email"))',
            expectedOutput: "Bob\nNo email",
            explanation: {
              conceptTitle: "Python Dictionaries",
              conceptBody: "Dicts store key:value pairs. Access with [] or .get(). .get() with default avoids KeyError.",
              breakdown: ['user["name"] — bracket access, raises KeyError if missing', '.get("email", "No email") — safe access with default'],
              commonMistakes: ['user["email"] when key missing → KeyError crash. Use .get() for safety.'],
              keyTakeaway: 'Always use .get(key, default) when the key might not exist. Prevents runtime crashes.'
            }
          }
        ]
      },
      {
        id: 5, title: "Loops & Conditionals", description: "Control program flow.",
        challenges: [
          {
            id: "py-5-1", title: "For Loop with Range",
            code: 'for i in range(1, 4):\n    print(f"Step {i}")',
            expectedOutput: "Step 1\nStep 2\nStep 3",
            explanation: {
              conceptTitle: "for Loop with range()",
              conceptBody: "Python's for loop iterates over any iterable. range(start, stop) generates numbers from start up to (not including) stop.",
              breakdown: ["range(1, 4) — generates 1, 2, 3 (stop is exclusive)", "for i in — loop variable set each iteration", "4 spaces indentation — required in Python (no braces)"],
              commonMistakes: ["range(1, 4) gives 1, 2, 3 — NOT 1, 2, 3, 4. Stop is exclusive.", "Missing or wrong indentation → IndentationError."],
              keyTakeaway: "Indentation IS the code structure in Python. 4 spaces is the standard."
            }
          },
          {
            id: "py-5-2", title: "If / Elif / Else",
            code: 'grade = 85\nif grade >= 90:\n    print("A")\nelif grade >= 80:\n    print("B")\nelse:\n    print("C")',
            expectedOutput: "B",
            explanation: {
              conceptTitle: "Conditional Statements",
              conceptBody: "Python uses if/elif/else (not else-if). The colon : and indented block replace curly braces.",
              breakdown: ["if grade >= 90: — first condition", "elif grade >= 80: — else-if in Python", "else: — catches everything else", ": and indentation — Python block syntax"],
              commonMistakes: ["elif not else if — using else if causes SyntaxError.", "No parentheses needed around conditions (but allowed)."],
              keyTakeaway: "Python's indentation-based syntax eliminates brace confusion but requires consistent spacing."
            }
          }
        ]
      },
      {
        id: 6, title: "Functions", description: "Write reusable Python functions.",
        challenges: [
          {
            id: "py-6-1", title: "Function Definition",
            code: 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\nprint(greet("Alice"))\nprint(greet("Bob", "Hi"))',
            expectedOutput: "Hello, Alice!\nHi, Bob!",
            explanation: {
              conceptTitle: "def — Function Definition",
              conceptBody: "Python functions use def keyword. Default parameter values make arguments optional.",
              breakdown: ['def — keyword to define a function', 'name — required argument', 'greeting="Hello" — optional with default', 'return — sends value back'],
              commonMistakes: ["Required args must come before args with defaults.", "Forgetting return gives None implicitly."],
              keyTakeaway: "Python functions are first-class objects — they can be passed as arguments and returned from functions."
            }
          }
        ]
      },
      {
        id: 7, title: "Classes & OOP", description: "Object-oriented programming in Python.",
        challenges: [
          {
            id: "py-7-1", title: "Class Definition",
            code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return f"{self.name} makes a sound."\ndog = Animal("Rex")\nprint(dog.speak())',
            expectedOutput: "Rex makes a sound.",
            explanation: {
              conceptTitle: "Python Classes",
              conceptBody: "__init__ is the constructor (called on object creation). self refers to the instance being created.",
              breakdown: ["class Animal — defines blueprint", "__init__(self, name) — constructor", "self.name = name — instance attribute", "dog = Animal('Rex') — creates instance"],
              commonMistakes: ["Forgetting self as first parameter → TypeError when calling methods.", "self is convention — it could be any name, but always use self."],
              keyTakeaway: "self is the instance reference in Python — it's like 'this' in JavaScript/Java."
            }
          }
        ]
      },
      {
        id: 8, title: "File I/O", description: "Read and write files in Python.",
        challenges: [
          {
            id: "py-8-1", title: "Write to File",
            code: 'with open("output.txt", "w") as f:\n    f.write("Hello, File!")\nprint("File written.")',
            expectedOutput: "File written.",
            explanation: {
              conceptTitle: "Context Managers & File I/O",
              conceptBody: "with open() as f: is a context manager that automatically closes the file when done, even if an exception occurs.",
              breakdown: ['open("output.txt", "w") — open for writing (creates if needed)', '"w" mode — overwrite; "a" mode would append', "with...as — context manager auto-closes file"],
              commonMistakes: ['Opening in "w" mode erases existing content. Use "a" to append.'],
              keyTakeaway: "Always use 'with open()' — it guarantees the file is closed properly."
            }
          }
        ]
      },
      {
        id: 9, title: "Error Handling", description: "Graceful exception management.",
        challenges: [
          {
            id: "py-9-1", title: "Try / Except",
            code: 'try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")',
            expectedOutput: "Cannot divide by zero!",
            explanation: {
              conceptTitle: "Exception Handling with try/except",
              conceptBody: "try/except catches runtime errors gracefully instead of crashing the program.",
              breakdown: ["try: — code that might raise an exception", "except ZeroDivisionError: — handle specific error type", "10 / 0 → raises ZeroDivisionError"],
              commonMistakes: ["Bare except: catches everything including KeyboardInterrupt — be specific.", "Silently catching exceptions hides bugs — always log or handle meaningfully."],
              keyTakeaway: "Catch specific exceptions, not bare except:. This makes debugging much easier."
            }
          }
        ]
      },
      {
        id: 10, title: "Project: CLI Calculator", description: "Build a complete command-line calculator.",
        challenges: [
          {
            id: "py-10-1", title: "Calculator Class",
            code: 'class Calculator:\n    def __init__(self):\n        self.history = []\n    def calculate(self, a, op, b):\n        if op == "+":\n            result = a + b\n        elif op == "-":\n            result = a - b\n        elif op == "*":\n            result = a * b\n        elif op == "/" and b != 0:\n            result = a / b\n        else:\n            return "Error"\n        self.history.append(f"{a} {op} {b} = {result}")\n        return result\ncalc = Calculator()\nprint(calc.calculate(10, "+", 5))\nprint(calc.calculate(20, "/", 4))',
            expectedOutput: "15\n5.0",
            explanation: {
              conceptTitle: "Building a Class-Based CLI Tool",
              conceptBody: "This calculator encapsulates operations and history in a class — the foundation of any real Python app.",
              breakdown: ["self.history — tracks all past calculations", "elif chain — handles each operator", "b != 0 guard — prevents ZeroDivisionError", "append(f-string) — stores formatted result"],
              commonMistakes: ["Integer division: 20 // 4 = 5 (int), 20 / 4 = 5.0 (float) in Python 3."],
              keyTakeaway: "Real projects combine all concepts: classes, conditionals, string formatting, and error handling."
            }
          }
        ]
      }
    ]
  },

  // ─────────────────────────── HTML ─────────────────────────────────────
  html: {
    levels: [
      {
        id: 1, title: "Document Structure", description: "The skeleton of every webpage.",
        challenges: [
          {
            id: "html-1-1", title: "HTML Boilerplate",
            code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Welcome!</h1>\n</body>\n</html>',
            expectedOutput: "Valid HTML document.",
            explanation: {
              conceptTitle: "The HTML Boilerplate",
              conceptBody: "Every HTML document starts with a DOCTYPE declaration and a root structure of html > head + body.",
              breakdown: ["<!DOCTYPE html> — tells browser to use HTML5 mode", "lang='en' — language for accessibility", "charset='UTF-8' — supports all Unicode characters", "<title> — shown in browser tab", "<body> — visible page content"],
              commonMistakes: ["Omitting charset can cause special characters to display incorrectly.", "Content in <head> is not rendered — only metadata."],
              keyTakeaway: "This boilerplate is the foundation of every single webpage. Know it by heart."
            }
          }
        ]
      },
      {
        id: 2, title: "Headings & Text", description: "Structure content with semantic tags.",
        challenges: [
          {
            id: "html-2-1", title: "Headings Hierarchy",
            code: '<h1>Main Title</h1>\n<h2>Section Heading</h2>\n<h3>Subsection</h3>\n<p>This is a paragraph of body text.</p>',
            expectedOutput: "Valid HTML headings.",
            explanation: {
              conceptTitle: "Heading Hierarchy & Paragraphs",
              conceptBody: "HTML has h1-h6 heading levels. h1 is the main page title — use only one per page. h2-h6 create hierarchy.",
              breakdown: ["<h1> — one per page, main title (affects SEO)", "<h2> — section headings", "<p> — paragraph of text"],
              commonMistakes: ["Multiple <h1> tags hurt SEO.", "Using headings for styling (use CSS instead)."],
              keyTakeaway: "Use headings for semantic structure, not visual size. CSS controls appearance."
            }
          }
        ]
      },
      {
        id: 3, title: "Links & Images", description: "Hyperlinks and media elements.",
        challenges: [
          {
            id: "html-3-1", title: "Anchor Tags",
            code: '<a href="https://example.com" target="_blank" rel="noopener">\n  Visit Example\n</a>',
            expectedOutput: "Valid hyperlink.",
            explanation: {
              conceptTitle: "Anchor Tags & Attributes",
              conceptBody: "<a> creates hyperlinks. href is the URL. target='_blank' opens in a new tab. rel='noopener' is a security best practice.",
              breakdown: ["href — hypertext reference (the URL)", "target='_blank' — open in new tab", "rel='noopener' — prevents tab-napping security exploit"],
              commonMistakes: ["Using target='_blank' without rel='noopener noreferrer' is a security risk."],
              keyTakeaway: "Always add rel='noopener noreferrer' when using target='_blank' on external links."
            }
          },
          {
            id: "html-3-2", title: "Images",
            code: '<img\n  src="photo.jpg"\n  alt="A scenic mountain view"\n  width="800"\n  height="600"\n/>',
            expectedOutput: "Valid image element.",
            explanation: {
              conceptTitle: "The img Element",
              conceptBody: "<img> is a void element (self-closing). The alt attribute is mandatory for accessibility — screen readers use it.",
              breakdown: ["src — path or URL to image file", "alt — text description for screen readers & broken images", "width/height — prevents layout shift while loading"],
              commonMistakes: ["Empty alt='' is acceptable for decorative images, but never omit it entirely.", "Omitting width/height causes Cumulative Layout Shift (bad for UX)."],
              keyTakeaway: "Always write meaningful alt text. Empty alt='' is only for purely decorative images."
            }
          }
        ]
      },
      {
        id: 4, title: "Lists", description: "Ordered and unordered lists.",
        challenges: [
          {
            id: "html-4-1", title: "Unordered & Ordered Lists",
            code: '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>\n<ol>\n  <li>Plan</li>\n  <li>Build</li>\n  <li>Deploy</li>\n</ol>',
            expectedOutput: "Valid list elements.",
            explanation: {
              conceptTitle: "ul, ol, and li Elements",
              conceptBody: "<ul> for bullet lists, <ol> for numbered lists, <li> for each item. Lists must be properly nested.",
              breakdown: ["<ul> — unordered list (bullets)", "<ol> — ordered list (numbers)", "<li> — list item (must be direct child of ul/ol)"],
              commonMistakes: ["Nesting non-li elements directly in ul/ol is invalid HTML.", "Using lists for layout is bad practice — use CSS Grid/Flexbox instead."],
              keyTakeaway: "Use <ul> for items with no order significance, <ol> when sequence matters."
            }
          }
        ]
      },
      {
        id: 5, title: "Forms", description: "Collect user input with forms.",
        challenges: [
          {
            id: "html-5-1", title: "Basic Form",
            code: '<form action="/submit" method="post">\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email" required>\n  <button type="submit">Submit</button>\n</form>',
            expectedOutput: "Valid form structure.",
            explanation: {
              conceptTitle: "Forms, Labels & Inputs",
              conceptBody: "Forms collect user data. label improves accessibility by linking to the input via matching for/id attributes.",
              breakdown: ["for='email' — links label to input#email", "type='email' — validates email format", "name='email' — key sent to server", "required — browser-level validation"],
              commonMistakes: ["Omitting name attribute means field data won't be submitted.", "for= and id= must match exactly for label association."],
              keyTakeaway: "Always pair <label> with <input> using matching for/id. It's essential for accessibility."
            }
          }
        ]
      },
      {
        id: 6, title: "Semantic HTML", description: "Use meaningful structural elements.",
        challenges: [
          {
            id: "html-6-1", title: "Semantic Layout",
            code: '<header>\n  <nav>Navigation</nav>\n</header>\n<main>\n  <article>\n    <h2>Article Title</h2>\n    <p>Content here.</p>\n  </article>\n</main>\n<footer>Footer content</footer>',
            expectedOutput: "Valid semantic structure.",
            explanation: {
              conceptTitle: "Semantic HTML5 Elements",
              conceptBody: "Semantic elements describe meaning, not appearance: <header>, <nav>, <main>, <article>, <footer>. They help SEO and screen readers.",
              breakdown: ["<header> — top section (logo, nav)", "<main> — primary content (only one per page)", "<article> — self-contained content", "<footer> — bottom section"],
              commonMistakes: ["Using <div> for everything when semantic elements exist.", "Multiple <main> per page is invalid."],
              keyTakeaway: "Semantic HTML improves SEO, accessibility, and code readability. Always choose over generic div."
            }
          }
        ]
      },
      {
        id: 7, title: "Project: Personal Webpage", description: "Build a complete personal page.",
        challenges: [
          {
            id: "html-7-1", title: "Full Personal Page",
            code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Jane Doe — Developer</title>\n</head>\n<body>\n  <header>\n    <h1>Jane Doe</h1>\n    <nav>\n      <a href="#about">About</a>\n      <a href="#skills">Skills</a>\n    </nav>\n  </header>\n  <main>\n    <section id="about">\n      <h2>About Me</h2>\n      <p>Full-stack developer passionate about clean code.</p>\n    </section>\n    <section id="skills">\n      <h2>Skills</h2>\n      <ul>\n        <li>HTML5 &amp; CSS3</li>\n        <li>JavaScript</li>\n        <li>Python</li>\n      </ul>\n    </section>\n  </main>\n  <footer>\n    <p>&copy; 2026 Jane Doe</p>\n  </footer>\n</body>\n</html>',
            expectedOutput: "Valid complete HTML page.",
            explanation: {
              conceptTitle: "Putting It All Together",
              conceptBody: "A real personal page combines doctype, viewport meta, semantic structure, navigation, sections, and footer — all working together.",
              breakdown: ["viewport meta — required for responsive design", "Anchor links #about — smooth scroll to section", "&amp; — HTML entity for &", "&copy; — copyright symbol entity", "Semantic structure — header/main/footer"],
              commonMistakes: ["Missing viewport meta makes mobile layout broken.", "Not using entities for special chars like & can break HTML parsing."],
              keyTakeaway: "Congratulations! You can now build semantically correct, accessible HTML pages from scratch."
            }
          }
        ]
      }
    ]
  },

  // ─────────────────────────── CSS ──────────────────────────────────────
  css: {
    levels: [
      {
        id: 1, title: "Selectors & Properties", description: "Target elements and apply styles.",
        challenges: [
          {
            id: "css-1-1", title: "Element & Class Selectors",
            code: 'body {\n  margin: 0;\n  font-family: Arial, sans-serif;\n}\n.title {\n  color: #6c5ce7;\n  font-size: 2rem;\n}',
            expectedOutput: "Valid CSS.",
            explanation: {
              conceptTitle: "CSS Selectors",
              conceptBody: "Element selectors (body) target all elements of that type. Class selectors (.title) target elements with that class attribute.",
              breakdown: ["body — element selector, applies to the body element", ".title — class selector (note the dot prefix)", "font-family: Arial, sans-serif — stack with fallbacks", "2rem — 2x the root font size (usually 32px)"],
              commonMistakes: ["#id vs .class — ID selectors use # and have higher specificity.", "Missing semicolons after property values."],
              keyTakeaway: "Classes are reusable — apply the same class to multiple elements. IDs should be unique."
            }
          }
        ]
      },
      {
        id: 2, title: "Box Model", description: "Understand margin, border, padding, content.",
        challenges: [
          {
            id: "css-2-1", title: "Box Model Properties",
            code: '.card {\n  width: 300px;\n  padding: 1.5rem;\n  border: 2px solid #6c5ce7;\n  border-radius: 12px;\n  margin: 1rem auto;\n}',
            expectedOutput: "Valid CSS.",
            explanation: {
              conceptTitle: "The CSS Box Model",
              conceptBody: "Every element is a box: content + padding + border + margin. Understanding this is fundamental to all layouts.",
              breakdown: ["width — content area size", "padding — space inside the border", "border — visible outline", "border-radius — rounds the corners", "margin: 1rem auto — auto centers horizontally"],
              commonMistakes: ["box-sizing: border-box makes width include padding/border — much more intuitive.", "margin: auto only works for block elements with a set width."],
              keyTakeaway: "Always set box-sizing: border-box in your CSS reset — it makes layout math intuitive."
            }
          }
        ]
      },
      {
        id: 3, title: "Flexbox", description: "One-dimensional layout with Flexbox.",
        challenges: [
          {
            id: "css-3-1", title: "Flexbox Container",
            code: '.nav {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem 2rem;\n}',
            expectedOutput: "Valid Flexbox CSS.",
            explanation: {
              conceptTitle: "CSS Flexbox",
              conceptBody: "Flexbox creates one-dimensional layouts (row or column). The parent becomes a flex container and children become flex items.",
              breakdown: ["display: flex — activates flexbox on container", "align-items: center — vertical center (cross-axis)", "justify-content: space-between — spread items horizontally (main axis)", "gap: 1rem — space between flex children"],
              commonMistakes: ["Applying flex properties to children instead of the container.", "justify-content affects the main axis (row = horizontal)."],
              keyTakeaway: "Flexbox eliminates the need for floats and hacks for most 1D layout scenarios."
            }
          },
          {
            id: "css-3-2", title: "Flex Items",
            code: '.container {\n  display: flex;\n  gap: 1rem;\n}\n.item {\n  flex: 1;\n  min-width: 0;\n  padding: 1rem;\n}',
            expectedOutput: "Valid Flexbox CSS.",
            explanation: {
              conceptTitle: "flex: 1 and Equal Width Columns",
              conceptBody: "flex: 1 makes items grow equally to fill available space. It's shorthand for flex-grow: 1; flex-shrink: 1; flex-basis: 0%.",
              breakdown: ["flex: 1 — each item takes equal share of space", "min-width: 0 — prevents overflow in flex items", "gap: 1rem — spacing between items without margins"],
              commonMistakes: ["min-width: 0 is needed because flex items don't shrink below their content size by default."],
              keyTakeaway: "flex: 1 on all children creates equal-width columns. Combine with gap for clean responsive layouts."
            }
          }
        ]
      },
      {
        id: 4, title: "CSS Grid", description: "Two-dimensional layout with Grid.",
        challenges: [
          {
            id: "css-4-1", title: "Grid Layout",
            code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1.5rem;\n  padding: 2rem;\n}',
            expectedOutput: "Valid CSS Grid.",
            explanation: {
              conceptTitle: "CSS Grid Basics",
              conceptBody: "CSS Grid creates two-dimensional layouts (rows AND columns simultaneously). Perfect for page-level layout.",
              breakdown: ["display: grid — activates grid on container", "grid-template-columns: repeat(3, 1fr) — 3 equal columns", "1fr — fractional unit (equal share of available space)", "gap — space between grid cells"],
              commonMistakes: ["CSS Grid vs Flexbox: Grid for 2D page layout, Flexbox for 1D component layout.", "Forgetting display: grid means grid properties have no effect."],
              keyTakeaway: "Use Grid for page-level 2D layouts. Use Flexbox for component-level 1D layouts."
            }
          }
        ]
      },
      {
        id: 5, title: "Responsive Design", description: "Make layouts work on all screen sizes.",
        challenges: [
          {
            id: "css-5-1", title: "Media Queries",
            code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr;\n  }\n}',
            expectedOutput: "Valid responsive CSS.",
            explanation: {
              conceptTitle: "Media Queries for Responsive Design",
              conceptBody: "@media queries apply CSS conditionally based on screen width. Mobile-first means designing for small screens first, then adding media queries for larger screens.",
              breakdown: ["@media (max-width: 768px) — targets screens 768px and below", "grid-template-columns: 1fr — single column on mobile", "Overrides the desktop 3-column layout"],
              commonMistakes: ["Missing viewport meta tag makes media queries ineffective on mobile.", "max-width vs min-width: max-width is desktop-first, min-width is mobile-first."],
              keyTakeaway: "Mobile-first approach: start with a single column, add complexity with min-width queries."
            }
          }
        ]
      },
      {
        id: 6, title: "CSS Animations", description: "Bring interfaces to life.",
        challenges: [
          {
            id: "css-6-1", title: "Keyframe Animation",
            code: '@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n.element {\n  animation: fadeIn 0.3s ease forwards;\n}',
            expectedOutput: "Valid CSS animation.",
            explanation: {
              conceptTitle: "CSS Keyframe Animations",
              conceptBody: "@keyframes defines animation steps. The animation property applies it to an element with duration, timing, and fill-mode.",
              breakdown: ["@keyframes fadeIn — named animation definition", "from/to — shorthand for 0%/100%", "0.3s — animation duration", "ease — timing function (acceleration curve)", "forwards — keeps final state after animation"],
              commonMistakes: ["Animating width/height triggers expensive layout recalculation. Prefer transform and opacity.", "Missing animation-fill-mode: forwards means element snaps back to start."],
              keyTakeaway: "For performance, only animate transform and opacity. These are GPU-accelerated."
            }
          }
        ]
      },
      {
        id: 7, title: "Project: Styled Card Component", description: "Build a premium card with hover effects.",
        challenges: [
          {
            id: "css-7-1", title: "Premium Card Styles",
            code: ':root {\n  --color-bg: #0f0f11;\n  --color-surface: #18181c;\n  --color-accent: #6c5ce7;\n  --color-text: #e8e8f0;\n}\n.card {\n  background: var(--color-surface);\n  border: 1px solid rgba(108, 92, 231, 0.3);\n  border-radius: 16px;\n  padding: 2rem;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 32px rgba(108, 92, 231, 0.2);\n}',
            expectedOutput: "Valid premium card CSS.",
            explanation: {
              conceptTitle: "CSS Custom Properties & Hover Effects",
              conceptBody: "CSS custom properties (variables) create a design system. Smooth hover effects with transform create a premium feel.",
              breakdown: ["--color-accent: #6c5ce7 — CSS variable definition", "var(--color-surface) — using the variable", "transition: transform 0.2s — animates the property change", "translateY(-4px) — lifts card up on hover", "box-shadow — creates depth illusion"],
              commonMistakes: ["Transition must be on the normal state, not just :hover, or animation only plays in one direction.", "rgba() for semi-transparent colors in borders/shadows."],
              keyTakeaway: "CSS variables + transitions + transforms = premium UI feel. This is the foundation of modern component design."
            }
          }
        ]
      }
    ]
  },

  // ─────────────────────────── JAVA ─────────────────────────────────────
  java: {
    levels: [
      {
        id: 1, title: "Hello World & Output", description: "Basic Java structure and printing.",
        challenges: [
          {
            id: "java-1-1", title: "Hello, World!",
            code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
            expectedOutput: "Hello, World!",
            explanation: {
              conceptTitle: "Java Program Structure",
              conceptBody: "Every Java program needs a class, a main method, and System.out.println() for output. Java is verbose but explicit.",
              breakdown: ["public class Main — class declaration (must match filename)", "public static void main(String[] args) — entry point", "System.out.println() — prints to console with newline", "Semicolons — required at end of every statement"],
              commonMistakes: ["Class name must match filename: Main.java. Case-sensitive.", "System.out.println vs System.out.print — println adds newline."],
              keyTakeaway: "Java requires this boilerplate for every program. The main() method is the entry point."
            }
          }
        ]
      },
      {
        id: 2, title: "Variables & Types", description: "Java's strong type system.",
        challenges: [
          {
            id: "java-2-1", title: "Primitive Types",
            code: 'int age = 25;\ndouble price = 9.99;\nboolean active = true;\nString name = "Alice";\nSystem.out.println(name + " is " + age);',
            expectedOutput: "Alice is 25",
            explanation: {
              conceptTitle: "Java Primitive Types",
              conceptBody: "Java is statically typed — every variable has a declared type. int, double, boolean are primitives. String is a class.",
              breakdown: ["int — integer (32-bit)", "double — floating-point (64-bit)", "boolean — true/false", "String — reference type (note capital S)", '+ operator — concatenates String with other types'],
              commonMistakes: ["String with capital S — it's a class, not a primitive.", "int x = 9.99 → compile error: cannot assign double to int without cast."],
              keyTakeaway: "Java's type system catches errors at compile time. This prevents many runtime bugs."
            }
          }
        ]
      },
      {
        id: 3, title: "Control Flow", description: "Conditionals and loops in Java.",
        challenges: [
          {
            id: "java-3-1", title: "If / Else If",
            code: 'int score = 85;\nif (score >= 90) {\n    System.out.println("A");\n} else if (score >= 80) {\n    System.out.println("B");\n} else {\n    System.out.println("C");\n}',
            expectedOutput: "B",
            explanation: {
              conceptTitle: "if/else if/else in Java",
              conceptBody: "Java uses C-style conditional syntax with mandatory braces for blocks.",
              breakdown: ["Conditions in parentheses — required", "Braces {} — block delimiter (not optional for multi-line)", "else if — alternative condition"],
              commonMistakes: ["= vs == — assignment vs comparison. Common source of bugs.", "Java doesn't support truthy/falsy — condition must evaluate to boolean."],
              keyTakeaway: "Unlike JavaScript, Java if conditions must be true boolean expressions — no truthy coercion."
            }
          }
        ]
      },
      {
        id: 4, title: "Methods", description: "Java method definitions and calls.",
        challenges: [
          {
            id: "java-4-1", title: "Static Methods",
            code: 'public static int add(int a, int b) {\n    return a + b;\n}\nint result = add(3, 7);\nSystem.out.println(result);',
            expectedOutput: "10",
            explanation: {
              conceptTitle: "Method Declarations in Java",
              conceptBody: "Java methods must declare their return type and parameter types explicitly. static means callable without an object instance.",
              breakdown: ["public — access modifier (callable from anywhere)", "static — no instance needed", "int — return type (what the method returns)", "int a, int b — typed parameters"],
              commonMistakes: ["Return type must match what you actually return — compiler enforces this.", "void methods don't return a value."],
              keyTakeaway: "Method signatures in Java are explicit contracts: return type, name, parameter types all declared."
            }
          }
        ]
      },
      {
        id: 5, title: "Classes & OOP", description: "Object-Oriented Programming in Java.",
        challenges: [
          {
            id: "java-5-1", title: "Class with Constructor",
            code: 'public class Car {\n    String model;\n    int year;\n    public Car(String model, int year) {\n        this.model = model;\n        this.year = year;\n    }\n    public String info() {\n        return model + " (" + year + ")";\n    }\n}\nCar c = new Car("Tesla", 2024);\nSystem.out.println(c.info());',
            expectedOutput: "Tesla (2024)",
            explanation: {
              conceptTitle: "Java Classes, Constructors & this",
              conceptBody: "Java classes define object blueprints. Constructors initialize state. this distinguishes instance fields from parameters.",
              breakdown: ["Constructor name == class name", "this.model = model — this refers to the instance", "new Car() — creates an instance", "c.info() — calls instance method"],
              commonMistakes: ["Constructors have no return type (not even void).", "Omitting new creates a compile error."],
              keyTakeaway: "Java's explicit OOP encourages thinking about objects as real-world entities with state and behavior."
            }
          }
        ]
      },
      {
        id: 6, title: "Project: Bank Account", description: "Build a complete bank account simulation.",
        challenges: [
          {
            id: "java-6-1", title: "BankAccount Class",
            code: 'public class BankAccount {\n    private String owner;\n    private double balance;\n    public BankAccount(String owner, double initial) {\n        this.owner = owner;\n        this.balance = initial;\n    }\n    public void deposit(double amount) {\n        if (amount > 0) balance += amount;\n    }\n    public boolean withdraw(double amount) {\n        if (amount > 0 && amount <= balance) {\n            balance -= amount;\n            return true;\n        }\n        return false;\n    }\n    public String status() {\n        return owner + ": $" + balance;\n    }\n}\nBankAccount acc = new BankAccount("Alice", 1000);\nacc.deposit(500);\nacc.withdraw(200);\nSystem.out.println(acc.status());',
            expectedOutput: "Alice: $1300.0",
            explanation: {
              conceptTitle: "Encapsulation with Private Fields",
              conceptBody: "private fields hide implementation details. Public methods are the only interface. This is encapsulation — a core OOP principle.",
              breakdown: ["private — only accessible within the class", "Validation in deposit/withdraw — defensive programming", "boolean return from withdraw — signals success/failure", "Encapsulation — protects data integrity"],
              commonMistakes: ["public fields can be changed by any code — always use private + getters/setters.", "Returning boolean from operations allows callers to handle failure gracefully."],
              keyTakeaway: "Encapsulation (private + methods) is the first pillar of OOP. It protects data from invalid state."
            }
          }
        ]
      }
    ]
  },

  // ─────────────────────────── C ────────────────────────────────────────
  c: {
    levels: [
      {
        id: 1, title: "Hello World & printf", description: "C syntax and formatted output.",
        challenges: [
          {
            id: "c-1-1", title: "Hello, World!",
            code: '#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
            expectedOutput: "Hello, World!",
            explanation: {
              conceptTitle: "C Program Structure",
              conceptBody: "C programs need a #include for libraries and a main() function that returns int. printf() handles formatted output.",
              breakdown: ["#include <stdio.h> — import standard I/O library", "int main() — entry point, returns int exit code", 'printf("...\\n") — formatted print, \\n is newline', "return 0 — signals successful execution"],
              commonMistakes: ["Missing #include <stdio.h> → compiler error for printf.", "No \\n at end causes output to not flush on some systems."],
              keyTakeaway: "C programs return 0 for success from main(). Non-zero signals an error to the operating system."
            }
          }
        ]
      },
      {
        id: 2, title: "Variables & Data Types", description: "C's typed variable system.",
        challenges: [
          {
            id: "c-2-1", title: "Printf Format Specifiers",
            code: '#include <stdio.h>\nint main() {\n    int age = 25;\n    float score = 98.5;\n    char grade = \'A\';\n    printf("Age: %d, Score: %.1f, Grade: %c\\n", age, score, grade);\n    return 0;\n}',
            expectedOutput: "Age: 25, Score: 98.5, Grade: A",
            explanation: {
              conceptTitle: "printf Format Specifiers",
              conceptBody: "printf uses format specifiers (%d, %f, %c, %s) to insert variables into the output string.",
              breakdown: ["%d — decimal integer", "%.1f — float with 1 decimal place", "%c — single character", "char grade = 'A' — single quotes for chars"],
              commonMistakes: ["Mismatching type and specifier causes undefined behavior: printf('%d', 3.14) is wrong.", "Strings use double quotes in C, chars use single quotes."],
              keyTakeaway: "Format specifiers must exactly match the variable types passed to printf."
            }
          }
        ]
      },
      {
        id: 3, title: "Loops & Conditionals", description: "C control flow structures.",
        challenges: [
          {
            id: "c-3-1", title: "For Loop",
            code: '#include <stdio.h>\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("%d ", i);\n    }\n    printf("\\n");\n    return 0;\n}',
            expectedOutput: "1 2 3 4 5 ",
            explanation: {
              conceptTitle: "C for Loop",
              conceptBody: "C's for loop syntax: initialization; condition; update. Identical to Java/JavaScript.",
              breakdown: ["int i = 1 — initializer (can declare in C99+)", "i <= 5 — condition check", "i++ — increment", 'printf("%d ", i) — print with trailing space'],
              commonMistakes: ["In older C standards, variables must be declared before the loop: int i; for(i = 0; ...).", "Infinite loop if condition never becomes false."],
              keyTakeaway: "C99 allows declaring loop variables in the for initializer. Use -std=c99 or higher when compiling."
            }
          }
        ]
      },
      {
        id: 4, title: "Functions", description: "C function declarations and definitions.",
        challenges: [
          {
            id: "c-4-1", title: "Function with Prototype",
            code: '#include <stdio.h>\nint square(int n);\nint main() {\n    printf("%d\\n", square(7));\n    return 0;\n}\nint square(int n) {\n    return n * n;\n}',
            expectedOutput: "49",
            explanation: {
              conceptTitle: "Function Prototypes in C",
              conceptBody: "C requires functions to be declared before use. Prototypes (declarations) tell the compiler about the function signature.",
              breakdown: ["int square(int n); — prototype/forward declaration", "int main() — entry point calls square()", "int square(int n) { } — actual definition can come after main"],
              commonMistakes: ["Calling a function before declaring or defining it → implicit declaration warning/error.", "Prototype must match the definition's return type and parameter types exactly."],
              keyTakeaway: "Header files (.h) contain function prototypes. Implementation files (.c) contain definitions."
            }
          }
        ]
      },
      {
        id: 5, title: "Pointers", description: "The heart of C — memory addressing.",
        challenges: [
          {
            id: "c-5-1", title: "Pointer Basics",
            code: '#include <stdio.h>\nint main() {\n    int x = 10;\n    int *p = &x;\n    printf("Value: %d\\n", *p);\n    *p = 20;\n    printf("New value: %d\\n", x);\n    return 0;\n}',
            expectedOutput: "Value: 10\nNew value: 20",
            explanation: {
              conceptTitle: "Pointers — Memory Addresses",
              conceptBody: "A pointer stores the memory address of a variable. & gets the address. * dereferences to get/set the value.",
              breakdown: ["int *p — pointer to int type", "&x — address-of operator, gets x's memory address", "*p — dereference operator, gets value at address", "*p = 20 — modifies x through the pointer"],
              commonMistakes: ["Dereferencing NULL or uninitialized pointer → segfault (crash).", "int *p vs int* p — both valid but *p is clearer (star belongs to variable)."],
              keyTakeaway: "Pointers enable pass-by-reference, dynamic memory, and data structures. They are C's most powerful (and dangerous) feature."
            }
          }
        ]
      },
      {
        id: 6, title: "Project: Linked List", description: "Build a singly-linked list in C.",
        challenges: [
          {
            id: "c-6-1", title: "Linked List Node",
            code: '#include <stdio.h>\n#include <stdlib.h>\ntypedef struct Node {\n    int data;\n    struct Node* next;\n} Node;\nNode* create(int val) {\n    Node* n = malloc(sizeof(Node));\n    n->data = val;\n    n->next = NULL;\n    return n;\n}\nint main() {\n    Node* head = create(1);\n    head->next = create(2);\n    head->next->next = create(3);\n    Node* cur = head;\n    while (cur != NULL) {\n        printf("%d ", cur->data);\n        cur = cur->next;\n    }\n    return 0;\n}',
            expectedOutput: "1 2 3 ",
            explanation: {
              conceptTitle: "Linked Lists with struct and malloc",
              conceptBody: "Linked lists use self-referential structs. malloc() allocates heap memory. -> dereferences struct pointers.",
              breakdown: ["typedef struct Node — creates reusable type alias", "struct Node* next — pointer to next node (self-referential)", "malloc(sizeof(Node)) — allocate heap memory", "n->data — shorthand for (*n).data", "while (cur != NULL) — traverse until end"],
              commonMistakes: ["Not freeing malloc'd memory → memory leak.", "Accessing cur->data when cur is NULL → segfault."],
              keyTakeaway: "Free every malloc() with free(). This is manual memory management — C's power and responsibility."
            }
          }
        ]
      }
    ]
  },

  // ─────────────────────────── C++ ──────────────────────────────────────
  cpp: {
    levels: [
      {
        id: 1, title: "C++ Basics & cout", description: "C++ output and the standard library.",
        challenges: [
          {
            id: "cpp-1-1", title: "Hello, C++!",
            code: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, C++!" << endl;\n    return 0;\n}',
            expectedOutput: "Hello, C++!",
            explanation: {
              conceptTitle: "C++ cout and Streams",
              conceptBody: "C++ uses stream insertion << with cout instead of printf. endl flushes the buffer and adds newline.",
              breakdown: ["#include <iostream> — C++ I/O library", "using namespace std — avoids writing std:: prefix", "cout << — stream output", "endl — newline + flush (use '\\n' for performance)"],
              commonMistakes: ["Missing using namespace std requires writing std::cout.", "endl flushes buffer (slower than '\\n'). Prefer '\\n' in loops."],
              keyTakeaway: "C++ stream syntax (<<, >>) is more type-safe than C's printf format strings."
            }
          }
        ]
      },
      {
        id: 2, title: "Classes & Objects", description: "OOP in C++.",
        challenges: [
          {
            id: "cpp-2-1", title: "C++ Class",
            code: '#include <iostream>\nusing namespace std;\nclass Rectangle {\npublic:\n    int width, height;\n    Rectangle(int w, int h) : width(w), height(h) {}\n    int area() { return width * height; }\n};\nint main() {\n    Rectangle r(5, 3);\n    cout << r.area() << endl;\n    return 0;\n}',
            expectedOutput: "15",
            explanation: {
              conceptTitle: "C++ Classes with Initializer Lists",
              conceptBody: "C++ classes support public/private access. Constructor initializer lists (:) are more efficient than assignment in the body.",
              breakdown: ["public: — access specifier block", "Rectangle(int w, int h) : width(w), height(h) {} — initializer list", "Rectangle r(5, 3) — stack-allocated object (no new needed)"],
              commonMistakes: ["Forgetting semicolon after class closing brace: } vs };", "Stack objects (Rectangle r;) vs heap objects (Rectangle* r = new Rectangle;)."],
              keyTakeaway: "Prefer stack allocation (no new) in C++ when possible — automatic destruction prevents memory leaks."
            }
          }
        ]
      },
      {
        id: 3, title: "STL Vectors", description: "Dynamic arrays with the Standard Library.",
        challenges: [
          {
            id: "cpp-3-1", title: "std::vector",
            code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums = {1, 2, 3, 4, 5};\n    nums.push_back(6);\n    for (int n : nums) {\n        cout << n << " ";\n    }\n    return 0;\n}',
            expectedOutput: "1 2 3 4 5 6 ",
            explanation: {
              conceptTitle: "std::vector — Dynamic Arrays",
              conceptBody: "std::vector is the C++ equivalent of dynamic arrays. It manages its own memory automatically.",
              breakdown: ["vector<int> — template type: vector of integers", "{1,2,3,4,5} — initializer list", ".push_back(6) — append element", "for (int n : nums) — range-based for loop (C++11)"],
              commonMistakes: ["Accessing out-of-bounds with [] causes undefined behavior (no exception). Use .at() for bounds checking.", "vector<int> vs int arr[] — vector is preferred for dynamic sizing."],
              keyTakeaway: "Use std::vector instead of raw arrays in C++. It handles resizing and memory automatically."
            }
          }
        ]
      },
      {
        id: 4, title: "Inheritance", description: "Class hierarchies in C++.",
        challenges: [
          {
            id: "cpp-4-1", title: "Base & Derived Classes",
            code: '#include <iostream>\nusing namespace std;\nclass Shape {\npublic:\n    virtual double area() = 0;\n};\nclass Circle : public Shape {\n    double r;\npublic:\n    Circle(double r) : r(r) {}\n    double area() override { return 3.14 * r * r; }\n};\nint main() {\n    Circle c(5);\n    cout << c.area() << endl;\n    return 0;\n}',
            expectedOutput: "78.5",
            explanation: {
              conceptTitle: "Virtual Functions & Polymorphism",
              conceptBody: "Pure virtual functions (= 0) make a class abstract. Derived classes must override them. override keyword is a safety check.",
              breakdown: ["virtual double area() = 0 — pure virtual (abstract method)", "class Circle : public Shape — inherits publicly", "override — compile-time check that you're actually overriding", "3.14 * r * r — approximation of π*r²"],
              commonMistakes: ["Forgetting virtual → static dispatch (no polymorphism).", "Using override without virtual in base → compile error."],
              keyTakeaway: "Virtual functions enable runtime polymorphism — the core of OOP in C++."
            }
          }
        ]
      },
      {
        id: 5, title: "Templates", description: "Generic programming with C++ templates.",
        challenges: [
          {
            id: "cpp-5-1", title: "Function Templates",
            code: '#include <iostream>\nusing namespace std;\ntemplate <typename T>\nT maxOf(T a, T b) {\n    return (a > b) ? a : b;\n}\nint main() {\n    cout << maxOf(3, 7) << endl;\n    cout << maxOf(3.14, 2.71) << endl;\n    return 0;\n}',
            expectedOutput: "7\n3.14",
            explanation: {
              conceptTitle: "Function Templates",
              conceptBody: "Templates allow writing generic code that works with any type. The compiler generates type-specific versions at compile time.",
              breakdown: ["template <typename T> — declares type parameter T", "T maxOf(T a, T b) — generic function using T", "maxOf(3, 7) — T inferred as int", "maxOf(3.14, 2.71) — T inferred as double"],
              commonMistakes: ["Template errors are often verbose and hard to read — this is a known C++ challenge.", "Both parameters must be the same type: maxOf(3, 2.5) → error."],
              keyTakeaway: "Templates are the foundation of the STL (vector, map, etc.) and enable zero-overhead generic programming."
            }
          }
        ]
      },
      {
        id: 6, title: "Project: Stack Implementation", description: "Build a generic Stack using templates.",
        challenges: [
          {
            id: "cpp-6-1", title: "Template Stack Class",
            code: '#include <iostream>\n#include <vector>\nusing namespace std;\ntemplate <typename T>\nclass Stack {\n    vector<T> data;\npublic:\n    void push(T val) { data.push_back(val); }\n    void pop() { if (!data.empty()) data.pop_back(); }\n    T top() { return data.back(); }\n    bool empty() { return data.empty(); }\n    int size() { return data.size(); }\n};\nint main() {\n    Stack<int> s;\n    s.push(10);\n    s.push(20);\n    s.push(30);\n    cout << s.top() << endl;\n    s.pop();\n    cout << s.top() << endl;\n    cout << s.size() << endl;\n    return 0;\n}',
            expectedOutput: "30\n20\n2",
            explanation: {
              conceptTitle: "Generic Data Structures with Templates",
              conceptBody: "A stack is a LIFO (Last In, First Out) data structure. Using vector internally and templates makes it generic and reusable.",
              breakdown: ["template <typename T> class Stack — generic class", "vector<T> data — internal storage", "push_back / pop_back — vector's O(1) amortized operations", "Stack<int> s — instantiate with specific type"],
              commonMistakes: ["Calling top() on empty stack → undefined behavior. Always check empty() first.", "Stack overflows in recursive programs can cause crashes."],
              keyTakeaway: "Building data structures teaches you how STL containers work internally. This is essential CS knowledge."
            }
          }
        ]
      }
    ]
  },

  // ─────────────────────────── SQL ──────────────────────────────────────
  sql: {
    levels: [
      {
        id: 1, title: "SELECT Basics", description: "Fetch data from tables.",
        challenges: [
          {
            id: "sql-1-1", title: "Select All",
            code: "SELECT * FROM users;",
            expectedOutput: "All rows returned.",
            explanation: {
              conceptTitle: "The SELECT Statement",
              conceptBody: "SELECT is SQL's read operation. * means all columns. FROM specifies the table. SQL is case-insensitive (convention: keywords uppercase).",
              breakdown: ["SELECT — keyword to fetch data", "* — wildcard for all columns", "FROM users — which table to query", "; — statement terminator"],
              commonMistakes: ["SELECT without WHERE returns ALL rows — be careful with large tables.", "* in production code is bad practice — always name specific columns."],
              keyTakeaway: "Never use SELECT * in production code. Always specify columns: SELECT id, name, email FROM users."
            }
          },
          {
            id: "sql-1-2", title: "Select Specific Columns",
            code: "SELECT name, email, created_at\nFROM users\nORDER BY created_at DESC;",
            expectedOutput: "Sorted user records.",
            explanation: {
              conceptTitle: "Column Selection & ORDER BY",
              conceptBody: "List specific columns to reduce data transfer. ORDER BY sorts results. DESC = descending (newest first).",
              breakdown: ["name, email, created_at — explicit column list", "ORDER BY created_at — sort by this column", "DESC — descending order (newest first)", "ASC — ascending (oldest first, default)"],
              commonMistakes: ["ORDER BY applies AFTER WHERE filtering — the order of clauses matters.", "Without ORDER BY, result row order is undefined/implementation-dependent."],
              keyTakeaway: "Always specify needed columns and ORDER BY for deterministic, efficient queries."
            }
          }
        ]
      },
      {
        id: 2, title: "WHERE & Filtering", description: "Filter rows with conditions.",
        challenges: [
          {
            id: "sql-2-1", title: "WHERE Clause",
            code: "SELECT name, salary\nFROM employees\nWHERE department = 'Engineering'\n  AND salary > 80000\nORDER BY salary DESC;",
            expectedOutput: "Filtered engineering records.",
            explanation: {
              conceptTitle: "WHERE Clause & Logical Operators",
              conceptBody: "WHERE filters rows. AND/OR combine conditions. Strings use single quotes in SQL.",
              breakdown: ["WHERE — filter condition", "AND — both conditions must be true", "department = 'Engineering' — string comparison with single quotes", "> 80000 — numeric comparison"],
              commonMistakes: ["SQL strings use single quotes. Double quotes often mean column/table identifiers.", "NULL comparisons: use IS NULL, not = NULL."],
              keyTakeaway: "NULL is special in SQL. x = NULL is always false. Use IS NULL and IS NOT NULL."
            }
          }
        ]
      },
      {
        id: 3, title: "Aggregations", description: "Count, sum, and group data.",
        challenges: [
          {
            id: "sql-3-1", title: "GROUP BY & COUNT",
            code: "SELECT department, COUNT(*) AS employee_count, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 5\nORDER BY avg_salary DESC;",
            expectedOutput: "Department salary stats.",
            explanation: {
              conceptTitle: "GROUP BY, Aggregate Functions & HAVING",
              conceptBody: "Aggregate functions (COUNT, SUM, AVG, MAX, MIN) operate on groups of rows. HAVING filters groups (like WHERE for groups).",
              breakdown: ["COUNT(*) — count all rows in each group", "AVG(salary) AS avg_salary — column alias", "GROUP BY department — create one row per department", "HAVING COUNT(*) > 5 — filter groups after aggregation"],
              commonMistakes: ["HAVING vs WHERE: WHERE filters rows before grouping, HAVING filters groups after.", "SELECT columns must be in GROUP BY or be aggregates."],
              keyTakeaway: "WHERE filters rows, HAVING filters groups. Both can be used in the same query."
            }
          }
        ]
      },
      {
        id: 4, title: "JOINs", description: "Combine data from multiple tables.",
        challenges: [
          {
            id: "sql-4-1", title: "INNER JOIN",
            code: "SELECT e.name, e.salary, d.department_name\nFROM employees e\nINNER JOIN departments d ON e.department_id = d.id\nWHERE d.department_name = 'Engineering';",
            expectedOutput: "Engineers with dept names.",
            explanation: {
              conceptTitle: "INNER JOIN — Combining Tables",
              conceptBody: "INNER JOIN returns rows where the join condition matches in BOTH tables. It's the most common join type.",
              breakdown: ["FROM employees e — table alias 'e'", "INNER JOIN departments d — join with alias 'd'", "ON e.department_id = d.id — join condition", "e.name, d.department_name — qualified column names"],
              commonMistakes: ["INNER JOIN excludes rows with no match. Use LEFT JOIN to include all rows from the left table.", "Missing ON clause → cross join (cartesian product) — usually a mistake."],
              keyTakeaway: "INNER JOIN = intersection. LEFT JOIN = all from left + matching from right. RIGHT JOIN = opposite."
            }
          }
        ]
      },
      {
        id: 5, title: "Subqueries", description: "Queries within queries.",
        challenges: [
          {
            id: "sql-5-1", title: "Correlated Subquery",
            code: "SELECT name, salary\nFROM employees\nWHERE salary > (\n  SELECT AVG(salary)\n  FROM employees\n)\nORDER BY salary DESC;",
            expectedOutput: "Above-average earners.",
            explanation: {
              conceptTitle: "Subqueries",
              conceptBody: "A subquery is a SELECT inside another query. It runs first and its result is used by the outer query.",
              breakdown: ["WHERE salary > (SELECT AVG...) — subquery returns a single value", "AVG(salary) FROM employees — average across all employees", "Outer query compares each row's salary to the average"],
              commonMistakes: ["Subqueries that return multiple rows can't be used with simple =. Use IN or EXISTS.", "Correlated subqueries run once per row — can be slow on large tables. CTEs or joins are often better."],
              keyTakeaway: "Subqueries are powerful but can be slow. For complex queries, Common Table Expressions (CTEs) improve readability and often performance."
            }
          }
        ]
      },
      {
        id: 6, title: "Project: Employee DB", description: "Design and query a complete employee database.",
        challenges: [
          {
            id: "sql-6-1", title: "Full Schema & Query",
            code: "CREATE TABLE departments (\n  id INT PRIMARY KEY,\n  name VARCHAR(100) NOT NULL\n);\nCREATE TABLE employees (\n  id INT PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  salary DECIMAL(10, 2),\n  dept_id INT,\n  FOREIGN KEY (dept_id) REFERENCES departments(id)\n);\nINSERT INTO departments VALUES (1, 'Engineering'), (2, 'Marketing');\nINSERT INTO employees VALUES (1, 'Alice', 95000, 1), (2, 'Bob', 72000, 2);\nSELECT e.name, e.salary, d.name AS dept\nFROM employees e\nJOIN departments d ON e.dept_id = d.id\nORDER BY e.salary DESC;",
            expectedOutput: "Employee report with departments.",
            explanation: {
              conceptTitle: "Database Design: Schema, Keys & Relationships",
              conceptBody: "A proper database schema uses primary keys, foreign keys, and appropriate data types. This ensures data integrity and enables efficient querying.",
              breakdown: ["PRIMARY KEY — unique row identifier", "FOREIGN KEY — enforces referential integrity", "NOT NULL — required field constraint", "VARCHAR(100) — variable-length string up to 100 chars", "DECIMAL(10,2) — precise decimal for money"],
              commonMistakes: ["Using FLOAT for money → rounding errors. Always use DECIMAL for financial data.", "Missing indexes on JOIN columns → full table scans (slow)."],
              keyTakeaway: "Good database design with proper keys and types prevents data corruption and enables fast queries at scale."
            }
          }
        ]
      }
    ]
  },

  // ─────────────────────────── JSON ─────────────────────────────────────
  json: {
    levels: [
      {
        id: 1, title: "JSON Syntax", description: "Key-value pairs and data types.",
        challenges: [
          {
            id: "json-1-1", title: "Simple Object",
            code: '{\n  "name": "Alice",\n  "age": 30,\n  "active": true,\n  "score": 98.5,\n  "notes": null\n}',
            expectedOutput: "Valid JSON.",
            explanation: {
              conceptTitle: "JSON Data Types",
              conceptBody: "JSON supports 6 data types: string (double quotes only), number, boolean, null, object {}, array [].",
              breakdown: ['"name": "Alice" — string value (must use double quotes)', '"age": 30 — number (no quotes)', '"active": true — boolean (lowercase)', '"notes": null — null value (lowercase)', "No trailing comma after last property"],
              commonMistakes: ["Single quotes are INVALID in JSON — must use double quotes.", "Trailing comma after last item → invalid JSON.", "undefined is not a valid JSON value."],
              keyTakeaway: "JSON is strict: double quotes only, no trailing commas, no comments, no undefined."
            }
          }
        ]
      },
      {
        id: 2, title: "Nested Objects & Arrays", description: "Complex JSON structures.",
        challenges: [
          {
            id: "json-2-1", title: "User Profile JSON",
            code: '{\n  "user": {\n    "id": 42,\n    "name": "Bob Smith",\n    "skills": ["JavaScript", "Python", "SQL"],\n    "address": {\n      "city": "San Francisco",\n      "country": "USA"\n    }\n  }\n}',
            expectedOutput: "Valid nested JSON.",
            explanation: {
              conceptTitle: "Nested Objects and Arrays",
              conceptBody: "JSON supports arbitrary nesting of objects and arrays. This models complex real-world data like API responses.",
              breakdown: ['"user": { } — nested object', '"skills": [ ] — array value', '"address": { } — doubly nested object', "Arrays can contain any JSON type"],
              commonMistakes: ["Forgetting to close all brackets { } and [ ] — use an editor with bracket matching.", "Mixing object {} and array [] syntax."],
              keyTakeaway: "REST APIs exchange data as JSON. Understanding nested JSON lets you work with any API."
            }
          }
        ]
      },
      {
        id: 3, title: "Project: Config File", description: "Write a real application config in JSON.",
        challenges: [
          {
            id: "json-3-1", title: "App Configuration",
            code: '{\n  "app": {\n    "name": "TypeForge",\n    "version": "2.0.0",\n    "debug": false\n  },\n  "server": {\n    "host": "0.0.0.0",\n    "port": 3000,\n    "cors": {\n      "enabled": true,\n      "origins": ["https://typeforge.dev", "http://localhost:5173"]\n    }\n  },\n  "database": {\n    "host": "localhost",\n    "port": 5432,\n    "name": "typeforge_db",\n    "ssl": true\n  }\n}',
            expectedOutput: "Valid config JSON.",
            explanation: {
              conceptTitle: "Real-World JSON Configuration",
              conceptBody: "JSON config files power applications from package.json to Docker configs. Structure should be logical, grouped by concern.",
              breakdown: ["Grouped by concern: app / server / database", "Arrays for lists (origins)", "Booleans for feature flags (debug, ssl)", "Numbers for ports — no quotes"],
              commonMistakes: ["Comments are NOT valid in JSON — use JSONC (.jsonc) or YAML if you need comments in configs.", "Sensitive values like passwords should never be in config files — use environment variables."],
              keyTakeaway: "JSON configs use nested objects grouped by feature/service. Never store secrets in JSON files."
            }
          }
        ]
      }
    ]
  },

  // ─────────────────────────── MARKDOWN ─────────────────────────────────
  markdown: {
    levels: [
      {
        id: 1, title: "Headings & Text Formatting", description: "Structure and emphasize content.",
        challenges: [
          {
            id: "md-1-1", title: "Basic Formatting",
            code: '# Main Title\n\n## Section Heading\n\n**Bold text** and *italic text* and `inline code`.\n\n> This is a blockquote with important information.',
            expectedOutput: "Valid Markdown.",
            explanation: {
              conceptTitle: "Markdown Text Formatting",
              conceptBody: "Markdown converts plain text to formatted HTML. # creates headings, ** bolds, * italics, backticks inline code.",
              breakdown: ["# H1, ## H2, ### H3 — heading levels", "**bold** or __bold__ — bold text", "*italic* or _italic_ — italic text", "`code` — inline code formatting", "> quote — blockquote"],
              commonMistakes: ["Missing blank line between heading and content can break rendering.", "# heading requires a space after the #."],
              keyTakeaway: "Markdown renders consistently on GitHub, npm, dev.to, and most documentation platforms."
            }
          }
        ]
      },
      {
        id: 2, title: "Lists, Links & Code", description: "Lists, hyperlinks, and code blocks.",
        challenges: [
          {
            id: "md-2-1", title: "Lists and Links",
            code: '## Features\n\n- ⚡ Fast and lightweight\n- 🔒 Secure by default\n- 📦 Zero dependencies\n\n## Installation\n\n```bash\nnpm install typeforge\n```\n\nSee the [documentation](https://docs.typeforge.dev) for details.',
            expectedOutput: "Valid Markdown.",
            explanation: {
              conceptTitle: "Lists, Code Blocks & Links",
              conceptBody: "- creates unordered lists. Fenced code blocks (```) with language name enable syntax highlighting on GitHub.",
              breakdown: ["- item — unordered list (also * or +)", "```bash — fenced code block with bash syntax", "[text](url) — hyperlink syntax", "1. item — ordered list"],
              commonMistakes: ["Mixing - and * in the same list can cause inconsistent rendering.", "Code blocks need blank lines before and after for proper rendering in some parsers."],
              keyTakeaway: "Fenced code blocks with language hints (```js, ```python) enable GitHub syntax highlighting."
            }
          }
        ]
      },
      {
        id: 3, title: "Project: README.md", description: "Write a professional GitHub README.",
        challenges: [
          {
            id: "md-3-1", title: "Full README",
            code: '# TypeForge\n\n> Type with purpose. Code with confidence.\n\n[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)\n\n## 🚀 Quick Start\n\n```bash\ngit clone https://github.com/user/typeforge\ncd typeforge\nnpm install\nnpm run dev\n```\n\n## ✨ Features\n\n| Feature | Description |\n|---------|-------------|\n| 10 Languages | JS, Python, HTML, CSS, SQL, and more |\n| Live WPM | Real-time typing statistics |\n| Progress | Saved locally, no account needed |\n\n## 📄 License\n\nMIT © 2026 TypeForge',
            expectedOutput: "Valid README.",
            explanation: {
              conceptTitle: "Professional README Structure",
              conceptBody: "A great README has: project name, tagline, badges, quick start, features table, and license. It's the front door of your project.",
              breakdown: ["Badges — shield.io links for license, build status", "```bash code blocks — installation commands", "| table | syntax | — Markdown tables", "## sections — navigation structure", "Emoji — 🚀✨📄 adds visual scanning cues"],
              commonMistakes: ["Table columns must be aligned with | pipes.", "Missing blank lines before/after code blocks and tables."],
              keyTakeaway: "A great README is as important as the code. It's what convinces developers to use and contribute to your project."
            }
          }
        ]
      }
    ]
  }
};
