/**
 * x402 payment client for Festify backend.
 *
 * When x402 is enabled on the backend, uses @x402/fetch + wagmi wallet to auto-pay.
 * When x402 is disabled, calls the backend directly with plain fetch.
 */
import type { WalletClient, PublicClient } from "viem";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

type FetchFn = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

/**
 * Create a payment-enabled fetch using @x402/fetch (lazy-loaded).
 * Returns null if the signer can't be built.
 */
export async function createPaymentFetch(
  walletClient: WalletClient,
  publicClient: PublicClient,
): Promise<FetchFn | null> {
  const account = walletClient.account;
  if (!account?.address) return null;

  try {
    const [{ wrapFetchWithPayment }, { x402Client }, { ExactEvmScheme }] = await Promise.all([
      import("@x402/fetch"),
      import("@x402/core/client"),
      import("@x402/evm/exact/client"),
    ]);

    const signer = {
      address: account.address,
      signTypedData: (args: Parameters<typeof walletClient.signTypedData>[0]) =>
        walletClient.signTypedData(args),
      readContract: (args: Parameters<typeof publicClient.readContract>[0]) =>
        publicClient.readContract(args),
    };

    const client = new x402Client();
    client.register("eip155:*", new ExactEvmScheme(signer));

    return wrapFetchWithPayment(fetch, client);
  } catch (err) {
    console.warn("x402 client packages not available, using plain fetch:", err);
    return null;
  }
}

/**
 * Call backend POST /api/generate.
 * If paymentFetch is provided, uses it (handles 402 + auto-pay).
 * Otherwise calls with plain fetch (for when x402 is disabled).
 */
export async function generateMessages(
  body: {
    occasion: string;
    tone: string;
    recipientName?: string;
    senderName?: string;
    additionalContext?: string;
  },
  paymentFetch?: FetchFn | null,
): Promise<string[]> {
  const url = `${BACKEND_URL}/api/generate`;
  const fetchFn = paymentFetch ?? fetch;

  const res = await fetchFn(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    let message = errText;
    try {
      const j = JSON.parse(errText);
      message = j.error || j.message || errText;
    } catch {
      // use errText as-is
    }
    throw new Error(message || `Request failed: ${res.status}`);
  }

  const data = (await res.json()) as { messages: string[] };
  if (!Array.isArray(data.messages)) throw new Error("Invalid response from server");
  return data.messages;
}

export { BACKEND_URL };
