export interface Fragment {
  word: string;
  timestamp: number;
}

export interface Config {
  authorizationCode: string;
  crewManifest: string;
}

export type Response = { type: "enter_digits"; digits: string } | { type: "speak_text"; text: string };

export interface ManifestEntry {
  prompt: string;
  text: string;
}
