# Add FestifyBot AI Generation with x402 Payments on Avalanche

## Summary

This PR adds a fully functional AI-powered greeting card message generator (FestifyBot) to Festify, paid for via the **x402 payment protocol** using USDC on **Avalanche C-Chain mainnet**. It introduces a new Express backend, integrates x402 payment middleware, and connects everything to the existing React frontend.

## Architecture

```
User clicks "Generate" in FestifyBotSection
  -> Frontend POSTs to backend /api/generate
  -> Backend returns HTTP 402 (Payment Required) with PAYMENT-REQUIRED header
  -> @x402/fetch client auto-signs EIP-712 USDC authorization (wallet popup)
  -> Client retries with PAYMENT-SIGNATURE header
  -> PayAI facilitator verifies & settles USDC on Avalanche
  -> Backend calls OpenAI gpt-4o-mini -> returns 3 message options
  -> User picks a message -> navigates to /mint with it pre-filled
```

## What's New

### Backend (`backend/`)

| File | Purpose |
|---|---|
| `src/index.ts` | Express server on port 3001 with CORS + x402 middleware |
| `src/config.ts` | Zod-validated env config |
| `src/middleware/x402.ts` | x402 payment gate using `@x402/express` + PayAI facilitator |
| `src/routes/generate.ts` | `POST /api/generate` — validates input, calls OpenAI |
| `src/routes/health.ts` | `GET /api/health` — free health check |
| `src/services/ai.ts` | OpenAI gpt-4o-mini integration, returns 3 message options |

**Key decisions:**
- **Facilitator**: PayAI (`https://facilitator.payai.network`) — the only public facilitator that supports Avalanche mainnet (`eip155:43114`)
- **USDC asset**: Native USDC on Avalanche (`0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E`), registered via `registerMoneyParser` since `@x402/evm` doesn't include Avalanche in its default asset map
- **Price**: $0.01 USDC per AI generation
- **x402 version**: v2 (uses `PAYMENT-REQUIRED` / `PAYMENT-SIGNATURE` headers)

### Frontend Changes

| File | Change |
|---|---|
| `src/lib/x402-client.ts` | x402 payment-enabled fetch using `@x402/fetch` + `@x402/evm` client SDK, with fallback to plain fetch |
| `src/hooks/usePaymentFetch.ts` | React hook that builds a payment-enabled fetch from wagmi wallet + public client |
| `src/components/FestifyBotSection.tsx` | Full FestifyBot UI — occasion/tone selectors, AI generation, message picker, "Use in Mint" flow |
| `src/pages/Mint.tsx` | Accepts `prefilledMessage` from FestifyBot via `location.state`, auto-fills the message textarea |
| `src/components/HeroSection.tsx` | Redesigned hero — word-group animation, gradient text, dual CTAs, stats row, better card layout |
| `src/index.css` | Added `bg-gradient-radial` utility |
| `src/lib/crypto-polyfill.ts` | Polyfill for `crypto.getRandomValues` needed by x402 client |
| `vite.config.ts` | Added Node.js polyfill config for x402 dependencies |

### Config

| File | Purpose |
|---|---|
| `.env.example` | Frontend env template (`VITE_BACKEND_URL`) |
| `backend/.env.example` | Backend env template (OpenAI key, pay-to address, facilitator, network) |
| `backend/.gitignore` | Ignores `node_modules`, `dist`, `.env` |

## x402 Payment Flow (Technical)

1. Backend registers `ExactEvmScheme` with a custom money parser for Avalanche USDC
2. `paymentMiddleware` intercepts `POST /api/generate` and returns HTTP 402 with base64-encoded payment requirements in `PAYMENT-REQUIRED` header
3. Frontend `@x402/fetch` wrapper detects the 402, parses requirements, and prompts the wallet to sign an EIP-712 `TransferWithAuthorization`
4. The signed payload is sent as `PAYMENT-SIGNATURE` header on retry
5. Backend forwards the payment to PayAI facilitator for verification and settlement
6. On success, the request proceeds to the route handler (OpenAI call)

## Verification

```bash
# Start backend
cd backend && npm run dev

# Health check
curl http://localhost:3001/api/health
# -> {"status":"ok"}

# Test 402 response
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{"occasion":"Birthday","tone":"warm"}'
# -> HTTP 402 with PAYMENT-REQUIRED header containing Avalanche USDC requirements

# Frontend: connect wallet on Avalanche, go to homepage,
# use FestifyBot section -> approve wallet signature -> see 3 AI messages
# Pick one -> navigates to /mint with message pre-filled
```

## Dependencies Added

**Backend:**
- `express`, `cors`, `dotenv` — server basics
- `@x402/express`, `@x402/core`, `@x402/evm` — x402 payment middleware
- `openai` — AI generation
- `zod` — input validation
- `tsx` (dev) — TypeScript runner

**Frontend:**
- `@x402/fetch`, `@x402/core`, `@x402/evm` — x402 client-side payment handling
