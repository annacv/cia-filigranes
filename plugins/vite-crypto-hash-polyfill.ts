/**
 * Vite build-time plugin, not a Nuxt runtime plugin.
 * It must be imported and registered in nuxt.config.ts under vite.plugins.
 * 
 * Purpose: Polyfill crypto.hash for Vite 7.x compatibility
 * 
 * This fixes the "crypto.hash is not a function" error that occurs
 * when Vite 7.x tries to use crypto.hash which may not be available
 * in all Node.js contexts during the build process.
 */

import { createHash } from "node:crypto";
import type { Plugin } from "vite";

// This needs to be set up at module load time before Vite processes files
if (typeof globalThis.crypto === "undefined") {
  (globalThis as any).crypto = {};
}
if (typeof (globalThis.crypto as any).hash === "undefined") {
  (globalThis.crypto as any).hash = (algorithm: string) => {
    return createHash(algorithm);
  };
}

export const cryptoHashPolyfill: Plugin = {
  name: "crypto-hash-polyfill",
  enforce: "pre",
  buildStart() {
    const crypto = globalThis.crypto as any;
    if (!crypto?.hash) {
      (globalThis.crypto as any).hash = (algorithm: string) => {
        return createHash(algorithm);
      };
    }
  },
};

