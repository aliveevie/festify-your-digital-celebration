import { paymentMiddleware, x402ResourceServer } from "@x402/express";
import type { Network } from "@x402/express";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { HTTPFacilitatorClient } from "@x402/core/server";
import { env } from "../config.js";

// Avalanche C-Chain USDC (native, not USDC.e)
const AVALANCHE_USDC = {
  address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  name: "USD Coin",
  version: "2",
  decimals: 6,
};

export function createPaymentMiddleware() {
  // PayAI facilitator (supports Avalanche mainnet eip155:43114)
  const facilitatorClient = new HTTPFacilitatorClient({
    url: env.FACILITATOR_URL,
  });

  // Register EVM scheme with custom Avalanche USDC asset
  const evmScheme = new ExactEvmScheme();
  evmScheme.registerMoneyParser(async (amount, network) => {
    if (network === "eip155:43114") {
      const tokenAmount = Math.round(amount * 10 ** AVALANCHE_USDC.decimals).toString();
      return {
        amount: tokenAmount,
        asset: AVALANCHE_USDC.address,
        extra: { name: AVALANCHE_USDC.name, version: AVALANCHE_USDC.version },
      };
    }
    return null; // fall back to default for other networks
  });

  const server = new x402ResourceServer(facilitatorClient)
    .register("eip155:*", evmScheme);

  const routes = {
    "POST /api/generate": {
      accepts: [
        {
          scheme: "exact",
          price: env.GENERATION_PRICE,
          network: env.NETWORK as Network,  // eip155:43114 (Avalanche mainnet)
          payTo: env.PAY_TO_ADDRESS,
        },
      ],
      description: "Generate AI greeting card messages",
      mimeType: "application/json",
    },
  };

  return paymentMiddleware(routes, server);
}
