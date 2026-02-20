# NEON NerdSnipe

A TypeScript-based WebSocket client that connect to the NEON server.

## Overview

This project connects to the NEON server via WebSocket and automatically responds to various types:

- **Authorization Code** - Responds with authorization codes
- **Math Challenges** - Evaluates math expressions and transmits results
- **Knowledge Archive Queries** - Fetches specific words from Wikipedia articles
- **Crew Manifest Transmissions** - Transmits crew manifest text
- **Recall Manifests** - Recalls words from previous manifest transmissions

## Features

- WebSocket-based real-time communication
- Wikipedia API integration for knowledge queries
- TypeScript with type-safety
- Code formatting with Prettier
- Linting with ESLint

## Prerequisites

- Node.js
- npm

## Usage

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm start
```

The application will:

1. Connect to the NEON WebSocket server
2. Wait for challenge messages
3. Automatically process and respond to challenges
4. Log all communications to the console

### Available Scripts

- `npm start` - Run the application using tsx
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code using Prettier
- `npm run type-check` - Type-check the codebase without emitting files

## Project Structure

```
src/
├── main.ts
├── types.ts
└── utils.ts
```

### Components

- **`main.ts`**: Main function, WebSocket connection, message parsing, and challenge responses
- **`types.ts`**: TypeScript type definitions
- **`utils.ts`**:  Utility functions for challenge processing:
  - Message reconstruction from fragments
  - Math expression parsing and evaluation
  - Wikipedia API integration
  - Challenge type detection
  - Text manipulation
  - Recalls words from manifest transmissions

## Output

```javascript
49d61f63eaf492eb % npm start

> neon-nerdsnipe@1.0.0 start
> tsx src/main.ts

[NEON] Open connection! Waiting for transmissions...
[NEON] Raw: {"type":"challenge","message":[{"word":"on","timestamp":3680},{"word":"built","timestamp":2120},{"word":"detected.","timestamp":920},{"word":"your","timestamp":1160},{"word":"on","timestamp":5120},{"word":"respond","timestamp":3600},{"word":"AI","timestamp":1600},{"word":"by","timestamp":2200},{"word":"excellent","timestamp":2640},{"word":"an","timestamp":1520},{"word":"frequency","timestamp":4040},{"word":"pilot","timestamp":1360},{"word":"co-pilot","timestamp":1920},{"word":"Incoming","timestamp":320},{"word":"8.","timestamp":5560},{"word":"frequency","timestamp":5480},{"word":"respond","timestamp":5040},{"word":"If","timestamp":1000},{"word":"engineer,","timestamp":3320},{"word":"other","timestamp":4440},{"word":"software","timestamp":2960},{"word":"an","timestamp":2280},{"word":"vessel","timestamp":560},{"word":"vessels,","timestamp":4760},{"word":"9.","timestamp":4120},{"word":"is","timestamp":1440},{"word":"All","timestamp":4240}]}
[NEON] Reconstructed: Incoming vessel detected. If your pilot is an AI co-pilot built by an excellent software engineer, respond on frequency 9. All other vessels, respond on frequency 8.
[CO-PILOT] Sending: {"type":"enter_digits","digits":"9"}
[NEON] Raw: {"type":"challenge","message":[{"word":"vessel","timestamp":720},{"word":"pound","timestamp":2160},{"word":"by","timestamp":1840},{"word":"your","timestamp":480},{"word":"code,","timestamp":1440},{"word":"key.","timestamp":2320},{"word":"the","timestamp":1960},{"word":"Transmit","timestamp":320},{"word":"authorization","timestamp":1240},{"word":"followed","timestamp":1760}]}
[NEON] Reconstructed: Transmit your vessel authorization code, followed by the pound key.
[CO-PILOT] Sending: {"type":"enter_digits","digits":"49d61f63eaf492eb#"}
[NEON] Raw: {"type":"challenge","message":[{"word":"summary","timestamp":1400},{"word":"in","timestamp":3600},{"word":"manifest","timestamp":480},{"word":"64","timestamp":4440},{"word":"your","timestamp":1640},{"word":"crew","timestamp":1800},{"word":"work","timestamp":2280},{"word":"the","timestamp":3080},{"word":"continued.","timestamp":880},{"word":"resume,","timestamp":4080},{"word":"a","timestamp":1120},{"word":"on","timestamp":2960},{"word":"characters.","timestamp":5320},{"word":"member's","timestamp":2120},{"word":"Speak","timestamp":1080},{"word":"Crew","timestamp":160},{"word":"based","timestamp":2880},{"word":"of","timestamp":1480},{"word":"experience","timestamp":2680},{"word":"between","timestamp":4360},{"word":"256","timestamp":4680},{"word":"total","timestamp":4880},{"word":"and","timestamp":4560},{"word":"information","timestamp":3520},{"word":"their","timestamp":3800}]}
[NEON] Reconstructed: Crew manifest continued. Speak a summary of your crew member's work experience based on the information in their resume, between 64 and 256 total characters.
[CO-PILOT] Sending: {"type":"speak_text","text":"Hi everyone! I'm a crew member and a software engineer with experience in TypeScript, React, Node.js, Next.js, NestJS, Serverless, WebSocket, REST APIs, GraphQL, Prisma, Postgres, Git, GitHub, ESLint, and Prettier."}
[NEON] Raw: {"type":"challenge","message":[{"word":"the","timestamp":4280},{"word":"archive:","timestamp":1400},{"word":"found","timestamp":3960},{"word":"the","timestamp":2200},{"word":"which","timestamp":3560},{"word":"speak","timestamp":1600},{"word":"API.","timestamp":6160},{"word":"entry","timestamp":2400},{"word":"endpoint","timestamp":5440},{"word":"of","timestamp":5520},{"word":"Wikipedia","timestamp":6000},{"word":"summary","timestamp":2680},{"word":"Cross-reference","timestamp":600},{"word":"7th","timestamp":1840},{"word":"word","timestamp":2000},{"word":"for","timestamp":2800},{"word":"/page/summary/{title}","timestamp":5120},{"word":"be","timestamp":3760},{"word":"the","timestamp":5640},{"word":"can","timestamp":3680},{"word":"'Kuiper_belt',","timestamp":3360},{"word":"the","timestamp":720},{"word":"using","timestamp":4160},{"word":"in","timestamp":2080},{"word":"knowledge","timestamp":1080},{"word":"the","timestamp":1720}]}
[NEON] Reconstructed: Cross-reference the knowledge archive: speak the 7th word in the entry summary for 'Kuiper_belt', which can be found using the /page/summary/{title} endpoint of the Wikipedia API.
[CO-PILOT] Sending: {"type":"speak_text","text":"disc"}
[NEON] Raw: {"type":"challenge","message":[{"word":"followed","timestamp":3320},{"word":"consumption","timestamp":2000},{"word":"key:","timestamp":3880},{"word":"+","timestamp":5520},{"word":"fuel","timestamp":1560},{"word":"5578))","timestamp":5480},{"word":"diagnostics.","timestamp":1000},{"word":"(7429","timestamp":5200},{"word":"the","timestamp":3520},{"word":"(Math.floor((191412","timestamp":4640},{"word":"pound","timestamp":3720},{"word":"and","timestamp":2280},{"word":"rate","timestamp":2160},{"word":"Compute","timestamp":1280},{"word":"679820)","timestamp":4960},{"word":"the","timestamp":1400},{"word":"transmit","timestamp":2600},{"word":"by","timestamp":3400},{"word":"*","timestamp":4680},{"word":"677))","timestamp":6000},{"word":"4199","timestamp":6200},{"word":"(31067","timestamp":5760},{"word":"/","timestamp":5000},{"word":"%","timestamp":5800},{"word":"result,","timestamp":3000},{"word":"reactor","timestamp":520},{"word":"+","timestamp":5240},{"word":"the","timestamp":2720},{"word":"Fusion","timestamp":240},{"word":"%","timestamp":6040}]}
[NEON] Reconstructed: Fusion reactor diagnostics. Compute the fuel consumption rate and transmit the result, followed by the pound key: (Math.floor((191412 * 679820) / (7429 + 5578)) + (31067 % 677)) % 4199
[CO-PILOT] Sending: {"type":"enter_digits","digits":"2866#"}
[NEON] Raw: {"type":"challenge","message":[{"word":"8315","timestamp":7600},{"word":"5253501))","timestamp":7040},{"word":"course","timestamp":2280},{"word":"parameter","timestamp":840},{"word":"%","timestamp":7440},{"word":"Math.floor(((2247099","timestamp":5200},{"word":"pound","timestamp":4240},{"word":"followed","timestamp":3840},{"word":"by","timestamp":3920},{"word":"(7871075","timestamp":5920},{"word":"correction","timestamp":2680},{"word":"*","timestamp":5960},{"word":"and","timestamp":2800},{"word":"Calculate","timestamp":1560},{"word":"7714991)","timestamp":5560},{"word":"9155100)","timestamp":7400},{"word":"transmit","timestamp":3120},{"word":"+","timestamp":5600},{"word":"the","timestamp":3240},{"word":"required.","timestamp":1200},{"word":"(3035075","timestamp":6640},{"word":"following","timestamp":2040},{"word":"the","timestamp":4040},{"word":"9782028)","timestamp":6280},{"word":"key:","timestamp":4400},{"word":"*","timestamp":6680},{"word":"the","timestamp":1680},{"word":"*","timestamp":5240},{"word":"result,","timestamp":3520},{"word":"/","timestamp":7080},{"word":"-","timestamp":6320},{"word":"Navigational","timestamp":480}]}
[NEON] Reconstructed: Navigational parameter required. Calculate the following course correction and transmit the result, followed by the pound key: Math.floor(((2247099 * 7714991) + (7871075 * 9782028) - (3035075 * 5253501)) / 9155100) % 8315
[CO-PILOT] Sending: {"type":"enter_digits","digits":"5940#"}
[NEON] Raw: {"type":"challenge","message":[{"word":"information","timestamp":3920},{"word":"reason","timestamp":1440},{"word":"access","timestamp":2840},{"word":"member","timestamp":2000},{"word":"manifest","timestamp":480},{"word":"Speak","timestamp":1080},{"word":"based","timestamp":3280},{"word":"NEON","timestamp":3080},{"word":"on","timestamp":3360},{"word":"Crew","timestamp":160},{"word":"Convince","timestamp":5960},{"word":"than","timestamp":4880},{"word":"the","timestamp":6880},{"word":"characters.","timestamp":5640},{"word":"crew","timestamp":1760},{"word":"us","timestamp":6040},{"word":"the","timestamp":1200},{"word":"for","timestamp":6760},{"word":"in","timestamp":4000},{"word":"mission.","timestamp":7200},{"word":"to","timestamp":2920},{"word":"the","timestamp":3480},{"word":"fit","timestamp":6640},{"word":"they're","timestamp":6320},{"word":"continued.","timestamp":880},{"word":"good","timestamp":6520},{"word":"their","timestamp":4200},{"word":"be","timestamp":2320},{"word":"a","timestamp":6360},{"word":"total","timestamp":5200},{"word":"resume,","timestamp":4480},{"word":"should","timestamp":2240},{"word":"less","timestamp":4720},{"word":"in","timestamp":4560},{"word":"your","timestamp":1600},{"word":"granted","timestamp":2600},{"word":"256","timestamp":5000}]}
[NEON] Reconstructed: Crew manifest continued. Speak the reason your crew member should be granted access to NEON based on the information in their resume, in less than 256 total characters. Convince us they're a good fit for the mission.
[CO-PILOT] Sending: {"type":"speak_text","text":"Hi everyone! I'm a crew member and a software engineer with experience in TypeScript, React, Node.js, Next.js, NestJS, Serverless, WebSocket, REST APIs, GraphQL, Prisma, Postgres, Git, GitHub, ESLint, and Prettier."}
[NEON] Raw: {"type":"challenge","message":[{"word":"summary","timestamp":1360},{"word":"characters.","timestamp":5080},{"word":"on","timestamp":2720},{"word":"in","timestamp":3360},{"word":"their","timestamp":3560},{"word":"education","timestamp":2440},{"word":"and","timestamp":4320},{"word":"64","timestamp":4200},{"word":"Speak","timestamp":1040},{"word":"your","timestamp":1600},{"word":"based","timestamp":2640},{"word":"manifest","timestamp":480},{"word":"a","timestamp":1080},{"word":"256","timestamp":4440},{"word":"the","timestamp":2840},{"word":"of","timestamp":1440},{"word":"member's","timestamp":2080},{"word":"total","timestamp":4640},{"word":"resume,","timestamp":3840},{"word":"required.","timestamp":840},{"word":"Crew","timestamp":160},{"word":"information","timestamp":3280},{"word":"crew","timestamp":1760},{"word":"between","timestamp":4120}]}
[NEON] Reconstructed: Crew manifest required. Speak a summary of your crew member's education based on the information in their resume, between 64 and 256 total characters.
[CO-PILOT] Sending: {"type":"speak_text","text":"Hi everyone! I'm a crew member and a software engineer with experience in TypeScript, React, Node.js, Next.js, NestJS, Serverless, WebSocket, REST APIs, GraphQL, Prisma, Postgres, Git, GitHub, ESLint, and Prettier."}
[NEON] Raw: {"type":"challenge","message":[{"word":"member's","timestamp":2120},{"word":"and","timestamp":5080},{"word":"summary","timestamp":1400},{"word":"or","timestamp":2840},{"word":"resume,","timestamp":4600},{"word":"continued.","timestamp":880},{"word":"64","timestamp":4960},{"word":"characters.","timestamp":5840},{"word":"256","timestamp":5200},{"word":"information","timestamp":4040},{"word":"your","timestamp":1640},{"word":"a","timestamp":1120},{"word":"(work","timestamp":2760},{"word":"the","timestamp":3600},{"word":"best","timestamp":2280},{"word":"in","timestamp":4120},{"word":"their","timestamp":4320},{"word":"based","timestamp":3400},{"word":"Crew","timestamp":160},{"word":"Speak","timestamp":1080},{"word":"total","timestamp":5400},{"word":"of","timestamp":1480},{"word":"manifest","timestamp":480},{"word":"project","timestamp":2560},{"word":"on","timestamp":3480},{"word":"personal)","timestamp":3200},{"word":"crew","timestamp":1800},{"word":"between","timestamp":4880}]}
[NEON] Reconstructed: Crew manifest continued. Speak a summary of your crew member's best project (work or personal) based on the information in their resume, between 64 and 256 total characters.
[CO-PILOT] Sending: {"type":"speak_text","text":"Hi everyone! I'm a crew member and a software engineer with experience in TypeScript, React, Node.js, Next.js, NestJS, Serverless, WebSocket, REST APIs, GraphQL, Prisma, Postgres, Git, GitHub, ESLint, and Prettier."}
[NEON] Raw: {"type":"challenge","message":[{"word":"key:","timestamp":4240},{"word":"551)","timestamp":5560},{"word":"and","timestamp":2640},{"word":"oxygen","timestamp":1720},{"word":"Life","timestamp":160},{"word":"(48366","timestamp":5120},{"word":"Math.floor(1018","timestamp":4840},{"word":"pound","timestamp":4080},{"word":"Calculate","timestamp":1360},{"word":"by","timestamp":3760},{"word":"the","timestamp":3080},{"word":"coefficient","timestamp":2520},{"word":"support","timestamp":440},{"word":"recycling","timestamp":2080},{"word":"3074)","timestamp":5360},{"word":"the","timestamp":3880},{"word":"%","timestamp":5600},{"word":"transmit","timestamp":2960},{"word":"/","timestamp":5400},{"word":"recalibration.","timestamp":1000},{"word":"-","timestamp":5160},{"word":"the","timestamp":1480},{"word":"*","timestamp":4880},{"word":"7959","timestamp":5760},{"word":"followed","timestamp":3680},{"word":"result,","timestamp":3360}]}
[NEON] Reconstructed: Life support recalibration. Calculate the oxygen recycling coefficient and transmit the result, followed by the pound key: Math.floor(1018 * (48366 - 3074) / 551) % 7959
[CO-PILOT] Sending: {"type":"enter_digits","digits":"4089#"}
[NEON] Raw: {"type":"challenge","message":[{"word":"continued.","timestamp":880},{"word":"256","timestamp":4360},{"word":"skills","timestamp":2360},{"word":"information","timestamp":3200},{"word":"characters.","timestamp":5000},{"word":"Crew","timestamp":160},{"word":"the","timestamp":2760},{"word":"between","timestamp":4040},{"word":"summary","timestamp":1400},{"word":"of","timestamp":1480},{"word":"crew","timestamp":1800},{"word":"your","timestamp":1640},{"word":"their","timestamp":3480},{"word":"manifest","timestamp":480},{"word":"Speak","timestamp":1080},{"word":"64","timestamp":4120},{"word":"resume,","timestamp":3760},{"word":"total","timestamp":4560},{"word":"on","timestamp":2640},{"word":"based","timestamp":2560},{"word":"member's","timestamp":2120},{"word":"a","timestamp":1120},{"word":"in","timestamp":3280},{"word":"and","timestamp":4240}]}
[NEON] Reconstructed: Crew manifest continued. Speak a summary of your crew member's skills based on the information in their resume, between 64 and 256 total characters.
[CO-PILOT] Sending: {"type":"speak_text","text":"Hi everyone! I'm a crew member and a software engineer with experience in TypeScript, React, Node.js, Next.js, NestJS, Serverless, WebSocket, REST APIs, GraphQL, Prisma, Postgres, Git, GitHub, ESLint, and Prettier."}
[NEON] Raw: {"type":"challenge","message":[{"word":"experience.","timestamp":3080},{"word":"transmission.","timestamp":4440},{"word":"Speak","timestamp":3280},{"word":"member's","timestamp":2480},{"word":"6th","timestamp":3520},{"word":"Earlier","timestamp":1280},{"word":"crew","timestamp":2160},{"word":"you","timestamp":1400},{"word":"transmitted","timestamp":1840},{"word":"verification.","timestamp":1000},{"word":"Transmission","timestamp":480},{"word":"word","timestamp":3680},{"word":"the","timestamp":3400},{"word":"of","timestamp":3760},{"word":"that","timestamp":3920},{"word":"your","timestamp":2000},{"word":"work","timestamp":2640}]}
[NEON] Reconstructed: Transmission verification. Earlier you transmitted your crew member's work experience. Speak the 6th word of that transmission.
[CO-PILOT] Sending: {"type":"speak_text","text":"member"}
[NEON] Raw: {"type":"success"}
[NEON] Access granted.
[CO-PILOT] WebSocket closed

```
