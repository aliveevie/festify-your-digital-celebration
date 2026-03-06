/**
 * Browser polyfill for Node's crypto.randomBytes used by @x402/extensions.
 * Uses Web Crypto API.
 */
export function randomBytes(length: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(length));
}
