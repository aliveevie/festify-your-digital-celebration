import { useState, useEffect } from "react";
import { useWalletClient, usePublicClient } from "wagmi";
import { createPaymentFetch } from "@/lib/x402-client";

type FetchFn = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

/**
 * Returns a payment-enabled fetch when wallet is connected and on a supported chain.
 * Falls back to plain fetch if x402 packages aren't available.
 */
export function usePaymentFetch(): {
  paymentFetch: FetchFn | null;
  isReady: boolean;
  chainId: number | undefined;
} {
  const { data: walletClient } = useWalletClient();
  const chainId = walletClient?.chain?.id;
  const publicClient = usePublicClient({ chainId });
  const [paymentFetch, setPaymentFetch] = useState<FetchFn | null>(null);

  useEffect(() => {
    if (!walletClient || !publicClient) {
      setPaymentFetch(null);
      return;
    }

    let cancelled = false;
    createPaymentFetch(walletClient, publicClient).then((fn) => {
      if (!cancelled) {
        // If x402 client creation succeeded, use it; otherwise fall back to plain fetch
        setPaymentFetch(() => fn ?? fetch);
      }
    });

    return () => { cancelled = true; };
  }, [walletClient, publicClient]);

  return {
    paymentFetch,
    isReady: !!paymentFetch,
    chainId,
  };
}
