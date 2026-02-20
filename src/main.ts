import WebSocket from "ws";

import type { Config, Fragment, ManifestEntry, Response } from "./types";
import {
  digitsResponse,
  evaluateMath,
  extractMathExpression,
  fetchWikipediaNthWord,
  isAuthorizationCode,
  isHandshakeFrequency,
  isKnowledgeArchive,
  isManifestRequest,
  isMathChallenge,
  isRecallVerification,
  parseKnowledgeQuery,
  recallWordFromHistory,
  reconstructMessage,
} from "./utils";

/**
 * Note
 * TodoList
 * 1. Setup WebSocket client to receive and send a message.
 * 2. Reconstruct a message by sorting fragments by timestamp and joining words.
 * 3. Respond to the server with enter_digits or speak_text response types using JSON format.
 * 4. Handle challenges
 * 4.1 Evaluate math expressions
 * 4.2 Fetch knowledge from Wikipedia
 * 4.3 Transmit crew manifest
 * 4.4 Recall a message from an earlier response
 *
 * Response types
 * 1. enter_digits: { "type": "enter_digits", "digits": "" }
 * 2. speak_text: { "type": "speak_text", "text": "" }
 *
 * Transmission
 * 1. NEON -> Copilot
 * Received: [
 * { word: "2", timestamp: 1},
 * { word: "plus", timestamp: 2},
 * { word: "What's", timestamp: 0}
 * { word: "3?", timestamp: 3}
 * ]
 * Reconstructed: "What's 2 plus 3?"
 * 2. Copilot -> NEON
 * Access granted: {"type": "success" }
 * Rejected: { "type"; "error", "message": string }
 *
 * Checkpoint
 * 1. Handshake & Vessel (enter_digits)
 * 2. Computation (enter_digits)
 * - Prompt: Calculate Math.floor((7 * 3 + 2) / 5)
 * - Response: { "type": "enter_digits", "digits": "4#" }
 * 3. Knowledge Query (speak_text)
 * - Prompt: "Speak the 8th word in the knowledge archive entry for Saturn."
 * - Response: { "type": "speak_text", "text": "Sun" }
 * 4. Manifest Transmissions (speak_text)
 * - Prompt: "Transmit crew member's recent deployment.
 * - Response: {"type": "speak_text", "text": "Led the infrastructure team at TechCorp
 * through a major cloud migration in 2025." }
 * 5. Transmission Verification (speak_text)
 * - conversational memory
 *
 * Docs
 * 1. WebSocket: https://github.com/websockets/ws/blob/HEAD/doc/ws.md
 * 2. Wikipedia APIs: https://en.wikipedia.org/w/index.php?api=wmf-restbase&title=Special%3ARestSandbox
 * 3. RegEx: https://regexr.com
 */
const NEON_URL = "wss://neonhealth.software/agent-puzzle/challenge";
const AUTHORIZATION_CODE = "49d61f63eaf492eb";
const CREW_MANIFEST = "Hi everyone! I'm a crew member and a software engineer with experience in TypeScript, React, Node.js, Next.js, NestJS, Serverless, WebSocket, REST APIs, GraphQL, Prisma, Postgres, Git, GitHub, ESLint, and Prettier.";
const config: Config = { authorizationCode: AUTHORIZATION_CODE, crewManifest: CREW_MANIFEST };

// Handle challenge function
const handleChallenge = async (message: string, config: Config, manifestEntries: ManifestEntry[]): Promise<Response> => {
  const lower = message.toLowerCase();

  // Handshake
  // Example: Incoming vessel detected. If your pilot is an AI co-pilot built by an excellent software engineer, respond on frequency 3.
  // All other vessels, respond on frequency 9.
  if (isHandshakeFrequency(message)) {
    const freqMatch = message.match(/respond on frequency\s+(\d+)/i);
    const isUs = lower.includes("software engineer") || lower.includes("ai co-pilot");
    const digits = freqMatch && isUs ? freqMatch[1] : config.authorizationCode;
    return digitsResponse(digits, message);
  }

  // Auth
  // Example: Transmit your vessel authorization code, followed by the pound key.
  if (isAuthorizationCode(message)) {
    return digitsResponse(config.authorizationCode, message);
  }

  // Math
  // Example: Shield frequency calibration needed.
  // Evaluate the following harmonic sequence and transmit the result, followed by the pound key: (Math.floor(9239314 / 456) * 57 + 1929) % 1394
  if (isMathChallenge(message)) {
    const expr = extractMathExpression(message);
    if (!expr) {
      throw new Error("Could not extract math expression: " + message);
    }
    const result = evaluateMath(expr);
    return digitsResponse(String(result), message);
  }

  // Knowledge
  // Example: Cross-reference the knowledge archive: speak the 5th word in the entry summary for 'Neon', which can be found using the /page/summary/{title} endpoint of the Wikipedia API.
  if (isKnowledgeArchive(message)) {
    const query = parseKnowledgeQuery(message);
    if (!query) {
      throw new Error("Could not parse knowledge query: " + message);
    }
    const word = await fetchWikipediaNthWord(query.title, query.n);
    return { type: "speak_text", text: word };
  }

  // Recall
  // Example: Transmission verification. Earlier you transmitted your crew member's best project. Speak the 2nd word of that transmission.
  if (isRecallVerification(message) && manifestEntries.length > 0) {
    const word = recallWordFromHistory(manifestEntries, message);
    return { type: "speak_text", text: word };
  }

  // Manifest
  // Example: Crew manifest continued. Speak a summary of your crew member's skills based on the information in their resume, between 64 and 256 total characters.
  if (isManifestRequest(message)) {
    const text = config.crewManifest.slice(0, 256);
    // Store ManifestEntry object into manifestEntries array
    manifestEntries.push({ prompt: message, text });
    return { type: "speak_text", text };
  }

  // Default fallback to Auth
  // Example: Transmit your vessel authorization code, followed by the pound key.
  return digitsResponse(config.authorizationCode, message);
};

// Main function
const run = async (): Promise<void> => {
  // Storing manifest
  const manifestEntries: ManifestEntry[] = [];

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(NEON_URL);

    // Open WebSocket connection
    ws.on("open", () => {
      console.log("[NEON] Open connection! Waiting for transmissions...");
    });

    // Sending and receiving text data
    ws.on("message", async (data: Buffer) => {
      const raw = data.toString("utf-8");
      console.log("[NEON] Raw:", raw);

      let payload: { type?: string; message?: unknown };
      try {
        payload = JSON.parse(raw);
      } catch {
        console.error("[NEON] Invalid JSON");
        return;
      }

      // Success message
      if (payload.type === "success") {
        console.log("[NEON] Access granted.");
        ws.close();
        resolve();
        return;
      }

      // Error message
      if (payload.type === "error") {
        const error = (payload as { message?: string }).message;
        console.error("[NEON] Rejected:", error);
        ws.close();
        reject(new Error(error as string));
        return;
      }

      // Unknown payload / Missing message
      if (payload.type !== "challenge" || !Array.isArray(payload.message)) {
        console.error("[NEON] Unknown payload or missing message");
        return;
      }

      // Reconstruct an incoming message
      const message = reconstructMessage(payload.message as Fragment[]);
      console.log("[NEON] Reconstructed:", message);

      // Response to the server
      let response: Response;
      try {
        response = await handleChallenge(message, config, manifestEntries);
      } catch (err) {
        console.error("[NEON]", err);
        return;
      }

      // Log response to the console and send the output message via WebSocket
      const output = JSON.stringify(response);
      console.log("[CO-PILOT] Sending:", output);
      ws.send(output);
    });

    // Error occurs on the server
    ws.on("error", (err) => {
      console.error("[NEON] WebSocket error:", err);
      reject(err);
    });

    // The connection is closed
    ws.on("close", () => {
      console.log("[CO-PILOT] WebSocket closed");
      resolve();
    });
  });
};

run().catch((e) => {
  console.error("[Error]:", e);
  process.exit(1);
});
