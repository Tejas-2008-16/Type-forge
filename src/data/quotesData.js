/**
 * Quote Dataset for Mode B (Public Domain & Technology Wisdom Quotes)
 */

export const QUOTES = [
  {
    id: "q-001",
    text: "Talk is cheap. Show me the code.",
    attribution: "Linus Torvalds",
    category: "technology",
    difficulty: "easy",
    source: "Public Statement"
  },
  {
    id: "q-002",
    text: "Simplicity is prerequisite for reliability.",
    attribution: "Edsger W. Dijkstra",
    category: "technology",
    difficulty: "easy",
    source: "ACM Speech"
  },
  {
    id: "q-003",
    text: "The measure of intelligence is the ability to change.",
    attribution: "Albert Einstein",
    category: "wisdom",
    difficulty: "easy",
    source: "Public Domain"
  },
  {
    id: "q-004",
    text: "First, solve the problem. Then, write the code.",
    attribution: "John Johnson",
    category: "technology",
    difficulty: "easy",
    source: "Software Engineering Wisdom"
  },
  {
    id: "q-005",
    text: "The most dangerous phrase in the language is: We've always done it this way.",
    attribution: "Grace Hopper",
    category: "motivation",
    difficulty: "medium",
    source: "US Navy Archives"
  },
  {
    id: "q-006",
    text: "That brain of mine is something more than merely mortal; as time will show.",
    attribution: "Ada Lovelace",
    category: "science",
    difficulty: "medium",
    source: "Lovelace Letters (1843)"
  },
  {
    id: "q-007",
    text: "Make it work, make it right, make it fast.",
    attribution: "Kent Beck",
    category: "technology",
    difficulty: "easy",
    source: "Extreme Programming"
  },
  {
    id: "q-008",
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    attribution: "Martin Fowler",
    category: "technology",
    difficulty: "medium",
    source: "Refactoring (1999)"
  },
  {
    id: "q-009",
    text: "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
    attribution: "William Shakespeare",
    category: "wisdom",
    difficulty: "hard",
    source: "Hamlet (1603)"
  },
  {
    id: "q-010",
    text: "Code is like humor. When you have to explain it, it's bad.",
    attribution: "Cory House",
    category: "technology",
    difficulty: "easy",
    source: "Software Architecture"
  }
];

export function getRandomQuote(category = "all", difficulty = "all") {
  let filtered = QUOTES;
  if (category !== "all") {
    filtered = filtered.filter(q => q.category === category);
  }
  if (difficulty !== "all") {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }
  if (filtered.length === 0) filtered = QUOTES;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}
