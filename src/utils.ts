import type { Fragment, ManifestEntry, Response } from "./types";

// Message type detection
export const isHandshakeFrequency = (message: string): boolean => {
  const text = message.toLowerCase();
  return text.includes("respond on frequency");
};

export const isAuthorizationCode = (message: string): boolean => {
  const text = message.toLowerCase();
  return text.includes("authorization code");
};

export const isMathChallenge = (message: string): boolean => {
  const text = message.toLowerCase();
  return text.includes("math");
};

export const isKnowledgeArchive = (message: string): boolean => {
  const text = message.toLowerCase();
  return text.includes("knowledge archive");
};

export const isRecallVerification = (message: string): boolean => {
  const text = message.toLowerCase();
  return text.includes("transmission verification");
};

export const isManifestRequest = (message: string): boolean => {
  const text = message.toLowerCase();
  return text.includes("crew manifest");
};

// Message reconstruction
export const reconstructMessage = (fragments: Fragment[]): string => {
  const sorted = [...fragments].sort((a, b) => a.timestamp - b.timestamp);
  return sorted.map((f) => f.word).join(" ");
};

// Response helpers
export const isPoundKey = (msg: string): boolean => {
  const lower = msg.toLowerCase();
  return lower.includes("pound key");
};

export const digitsResponse = (digits: string, message: string): Response => {
  const suffix = isPoundKey(message) ? "#" : "";
  return { type: "enter_digits", digits: digits + suffix };
};

export const extractMathExpression = (message: string): string | null => {
  // Check if it's math evaluation
  // Capture: followed by the pound key: Math.floor((58911 + 59731 + 44079) * 587 / 19) % 1064
  if (message.includes("Math")) {
    // find colon: in the message
    const match = message.match(/:\s*(.+)$/s);
    if (match) {
      // Use the text after the colon like Math.floor((58911 + 59731 + 44079) * 587 / 19) % 1064
      const expr = match[1].replace(/\s+/g, " ").trim();
      if (expr.includes("Math.floor")) {
        return expr;
      }
    }
  }
  return null;
};

export const evaluateMath = (expr: string): number => {
  const fn = new Function("Math", `return (${expr})`);
  const result = fn(Math);

  if (typeof result !== "number") {
    throw new Error(`Invalid math result: ${result}`);
  }

  return Math.floor(result);
};

// Wikipedia API
export const fetchWikipediaNthWord = async (title: string, wordIndex: number): Promise<string> => {
  const slug = encodeURIComponent(title.replace(/ /g, "_"));
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Wikipedia API error: ${response.status}`);
  }

  const json = await response.json();
  const data = json as { extract?: string };
  const extract = data.extract ?? "";
  const words = extract.split(/\s+/);
  const idx = wordIndex - 1;

  if (idx < 0 || idx >= words.length) {
    throw new Error(`Word index ${wordIndex} out of range`);
  }

  return words[idx];
};

// Parsing utilities
// Example: Cross-reference the knowledge archive: speak the 11th word in the entry summary for 'Pulsar', which can be found using the /page/summary/{title} endpoint of the Wikipedia API.
export const parseKnowledgeQuery = (message: string): { n: number; title: string } | null => {
  const nthMatch = getOrdinal(message);
  if (!nthMatch) return null;

  // Check for quoted title
  const quotedMatch = message.match(/['"]([^'"]+)['"]/);
  if (quotedMatch) {
    return { n: nthMatch, title: quotedMatch[1].trim() };
  }

  return null;
};

// get a number before st, nd, rd, th
const getOrdinal = (message: string): number | null => {
  const re = new RegExp(`(\\d+)(?:st|nd|rd|th)`, "i");
  const m = message.match(re);
  return m ? parseInt(m[1], 10) : null;
};

// Recall
// [CO-PILOT] Sending: {"type":"speak_text","text":"Hi everyone! I'm a crew member...... }
// Transmission verification. Earlier you transmitted your crew member's best project. Speak the 4th word of that transmission.
// [CO-PILOT] Sending: {"type":"speak_text","text":"a"}
export const recallWordFromHistory = (manifestEntries: ManifestEntry[], message: string): string => {
  const wordIndex = getOrdinal(message) ?? 1;
  let text = "";

  // if the manifestEntries array has text, pick text from the manifest by index.
  if (manifestEntries.length > 0) {
    const idx = Math.min(0, manifestEntries.length - 1);
    text = manifestEntries[idx]?.text ?? "";
  }

  // Fallback: if the manifestEntries array is empty, pick a single "word" from text by index
  const words = text.split(/\s+/);
  const i = Math.max(0, Math.min(wordIndex - 1, words.length - 1));
  const word = words[i];
  return word.slice(0, 256);
};
