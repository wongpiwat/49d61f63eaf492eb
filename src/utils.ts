import type { Fragment, Response, ManifestEntry } from "./types";

// Message type detection
export const isHandshakeFrequency = (message: string): boolean => {
  const lower = message.toLowerCase();
  return lower.includes("respond on frequency");
};

export const isAuthorizationCode = (message: string): boolean => {
  const lower = message.toLowerCase();
  return lower.includes("authorization code");
};

export const isMathChallenge = (message: string): boolean => {
  const lower = message.toLowerCase();
  return lower.includes("math");
};

export const isKnowledgeArchive = (message: string): boolean => {
  const lower = message.toLowerCase();
  return lower.includes("knowledge archive");
};

export const isRecallVerification = (message: string): boolean => {
  const lower = message.toLowerCase();
  return lower.includes("transmission verification");
};

export const isManifestRequest = (message: string): boolean => {
  const lower = message.toLowerCase();
  return lower.includes("crew manifest") && !lower.includes("result");
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
  // Check if it's asking for Math evaluation
  if (message.includes("Math")) {
    const match = message.match(/:\s*(.+)$/s);
    if (match) {
      const expr = match[1].replace(/\s+/g, " ").trim();
      if (expr.includes("Math.floor")) {
        return expr;
      }
    }
  }

  // Try to match expressions with modulo
  const modMatch = message.match(/(Math\.floor\s*\((?:[^()]+|\([^()]*\))+\)\s*%\s*\d+)/);
  if (modMatch) {
    return modMatch[1].replace(/\s+/g, " ");
  }

  // Simple Math.floor pattern
  const simpleMatch = message.match(/Math\.floor\s*\((?:[^()]+|\([^()]*\))+\)/);
  if (simpleMatch) {
    return simpleMatch[0].replace(/\s+/g, " ");
  }

  return null;
};

export const evaluateMath = (expr: string): number => {
  const cleaned = expr.replace(/\s+/g, " ").trim();
  const fn = new Function("Math", `return (${cleaned})`);
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

  const response = await fetch(url, {
    headers: { "User-Agent": "NEON-CoPilot/1.0" },
  });

  if (!response.ok) {
    throw new Error(`Wikipedia API error: ${response.status}`);
  }

  const data = (await response.json()) as { extract?: string };
  const extract = data.extract ?? "";
  const words = extract.split(/\s+/).filter(Boolean);
  const idx = wordIndex - 1;

  if (idx < 0 || idx >= words.length) {
    throw new Error(`Word index ${wordIndex} out of range`);
  }

  return words[idx];
};

// Parsing utilities
export const parseKnowledgeQuery = (message: string): { n: number; title: string } | null => {
  const nthMatch = message.match(/(\d+)(?:st|nd|rd|th)\s+word/i);
  if (!nthMatch) return null;

  const n = parseInt(nthMatch[1], 10);

  // Check for quoted title
  const quotedMatch = message.match(/['"]([^'"]+)['"]/);
  if (quotedMatch) {
    return { n, title: quotedMatch[1].trim() };
  }

  // Try different patterns for title extraction
  const titleMatch = message.match(/knowledge archive entry for\s+([^.?"]+)/i) || message.match(/entry summary for\s+([^.?"]+)/i) || message.match(/entry for\s+([^.?"]+)/i);

  if (titleMatch) {
    return { n, title: titleMatch[1].trim() };
  }

  return null;
};

// Find min and max characters
export const parseLength = (message: string): { min: number; max: number } | null => {
  // Example: between 64 and 256 total characters.
  const rangeMatch = message.match(/between\s+(\d+)\s+and\s+(\d+)\s+characters/i);
  if (rangeMatch) {
    return {
      min: parseInt(rangeMatch[1], 10),
      max: parseInt(rangeMatch[2], 10),
    };
  }
  return null;
};

// Text manipulation
export const fitLength = (text: string, min: number, max: number): string => {
  const trimmed = text.slice(0, 256);

  if (trimmed.length >= min && trimmed.length <= max) {
    return trimmed;
  }

  if (trimmed.length > max) {
    return trimmed.slice(0, max).trim();
  }

  return trimmed;
};

export const buildManifestText = (crewManifest: string, message: string): string => {
  const lengthReq = parseLength(message);
  let text = crewManifest.slice(0, 256);

  if (lengthReq) {
    text = fitLength(text, lengthReq.min, lengthReq.max);
  }

  return text;
};

// Recall
// [CO-PILOT] Sending: {"type":"speak_text","text":"Hi everyone! I'm a crew member...... }
// Transmission verification. Earlier you transmitted your crew member's best project. Speak the 4th word of that transmission.
// [CO-PILOT] Sending: {"type":"speak_text","text":"a"}

const getOrdinal = (message: string, before: string): number | null => {
  const re = new RegExp(`(\\d+)(?:st|nd|rd|th)\\s*${before}`, "i");
  const m = message.match(re);
  return m ? parseInt(m[1], 10) : null;
};

export const recallWordFromHistory = (manifestEntries: ManifestEntry[], message: string): string => {
  const wordIndex = getOrdinal(message, "word") ?? 1;
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
