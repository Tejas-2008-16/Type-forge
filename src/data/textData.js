/**
 * Word Lists & Text Datasets for Mode A
 */

export const ENGLISH_200 = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "system", "program", "code", "data", "array", "string", "object", "function", "variable", "value",
  "build", "design", "create", "develop", "test", "run", "logic", "algorithm", "digital", "network",
  "web", "server", "client", "input", "output", "screen", "keyboard", "process", "memory", "storage"
];

export const TECH_TERMS = [
  "algorithm", "asynchronous", "boolean", "class", "compiler", "component", "constructor", "database",
  "dependency", "dictionary", "encryption", "exception", "framework", "function", "inheritance", "instance",
  "interface", "iteration", "lambda", "library", "middleware", "namespace", "object", "parameter",
  "polymorphism", "recursion", "refactor", "repository", "runtime", "schema", "stack", "statement",
  "template", "thread", "transaction", "variable", "virtual", "worktree", "binary", "byte"
];

export const HINDI_200 = [
  "नमस्ते", "भारत", "ज्ञान", "समय", "सफलता", "मेहनत", "जीवन", "सपना", "लक्ष्य", "अभ्यास",
  "किताब", "भाषा", "सोच", "काम", "मित्र", "दुनिया", "सत्य", "अहिंसा", "शिक्षा", "विकास",
  "प्रगति", "नवाचार", "कौशल", "प्रौद्योगिकी", "कंप्यूटर", "इंटरनेट", "सॉफ्टवेयर", "डिजिटल", "वेबसाइट", "कोड"
];

export const MARATHI_200 = [
  "नमस्कार", "महाराष्ट्र", "ज्ञान", "वेळ", "यश", "कष्ट", "जीवन", "स्वप्न", "ध्येय", "सराव",
  "पुस्तक", "भाषा", "विचार", "काम", "मित्र", "जग", "सत्य", "शिक्षण", "विकास", "प्रगती",
  "तंत्रज्ञान", "संगणक", "इंटरनेट", "सॉफ्टवेअर", "डिजिटल", "वेबसाईट", "संशोधन", "प्रकल्प", "कौशल्य", "कोड"
];

export const SENTENCES_EASY = [
  "The quick brown fox jumps over the lazy dog.",
  "TypeForge helps developers type code with speed and precision.",
  "Practice daily to build muscle memory and increase typing speed.",
  "Clean code always reads like well-written prose.",
  "Debugging is twice as hard as writing the code in the first place."
];

export function getRandomWords(count = 25, dataset = ENGLISH_200) {
  const words = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * dataset.length);
    words.push(dataset[randomIndex]);
  }
  return words.join(" ");
}
