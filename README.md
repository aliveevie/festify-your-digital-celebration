<div align="center">

<br />

<img src="https://img.shields.io/badge/Avalanche-E84142?style=for-the-badge&logo=avalanche&logoColor=white" alt="Avalanche" />
<img src="https://img.shields.io/badge/x402_Protocol-8B5CF6?style=for-the-badge&logoColor=white" alt="x402" />
<img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" />
<img src="https://img.shields.io/badge/USDC-2775CA?style=for-the-badge&logo=circle&logoColor=white" alt="USDC" />

<br /><br />

# Festify

### Send Joy Forever. Onchain.

**The world's first NFT greeting card platform on Avalanche**<br />
Mint, send, and treasure moments forever — with AI-powered message generation via x402 micropayments.

<br />

<a href="https://avalanche.festify.ibxlab.com/"><img src="https://img.shields.io/badge/LIVE_DEMO-E84142?style=for-the-badge&logoColor=white" alt="Live Demo" /></a>
&nbsp;
<a href="https://youtu.be/K6FS8sJs8oY"><img src="https://img.shields.io/badge/DEMO_VIDEO-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Demo Video" /></a>
&nbsp;
<a href="https://snowtrace.io/address/0x822F7cb652befF262Ec5aE9F4203DD066E3174cd/contract/43114/code">
  <img src="https://img.shields.io/badge/Verified_Contract-Snowtrace-16a34a?style=for-the-badge&logo=ethereum&logoColor=white" alt="Verified Contract" />
</a>
<a href="https://github.com/aliveevie/festify-your-digital-celebration/pull/1"><img src="https://img.shields.io/badge/x402_PR_%231-6f42c1?style=for-the-badge&logo=github&logoColor=white" alt="PR #1" /></a>

<br /><br />

### Demo Walkthrough

[![Watch the demo](https://img.youtube.com/vi/K6FS8sJs8oY/maxresdefault.jpg)](https://youtu.be/K6FS8sJs8oY)

**[Watch on YouTube (4:30)](https://youtu.be/K6FS8sJs8oY)**

</div>

<br />

---

<br />

## What is Festify?

Festify lets you create personalized greeting cards and mint them as **ERC-721 NFTs on Avalanche C-Chain**. Pick an occasion, write a message (or let AI write it), choose a recipient wallet, and send a card that lives onchain forever.

With the **x402 payment protocol**, our AI assistant **FestifyBot** writes 3 unique messages for just **$0.01 USDC** — paid via a gasless wallet signature, settled automatically on Avalanche.

<br />

## Key Features

<table>
<tr>
<td width="50%" valign="top">

### NFT Greeting Cards
- **8 occasion templates** — Birthday, Graduation, Anniversary, Love, Holiday, Baby Shower, Housewarming, Thank You
- Custom messages with **live card preview**
- Mint to **any wallet address** on Avalanche
- View transactions on **Snowtrace**
- ERC-721 compliant — works in any NFT wallet

</td>
<td width="50%" valign="top">

### FestifyBot AI Generation
- **3 unique AI-written messages** per request
- Powered by **OpenAI gpt-4o-mini**
- Paid via **x402 protocol** ($0.01 USDC)
- **Gasless EIP-712 signature** — no gas to pay
- One-click **"Use in Mint"** flow

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Live Onchain Data
- **60,000+** total mints tracked
- **2,400+** cards collected
- Real-time community activity feed
- Powered by **Avalanche API** — all real data

</td>
<td width="50%" valign="top">

### x402 Payment Protocol
- **HTTP 402** Payment Required flow
- **PayAI facilitator** on Avalanche mainnet
- USDC `TransferWithAuthorization` (EIP-3009)
- Buyer pays **zero gas** — facilitator settles onchain

</td>
</tr>
</table>

<br />

---

<br />

## x402 Integration — How It Works

Festify uses the **[x402 payment protocol](https://docs.x402.org)** to gate AI generation behind a $0.01 USDC micropayment on Avalanche. The entire flow happens in-app with a single wallet popup.

<br />

```
  User clicks "Generate 3 Messages"
    │
    ▼
  Frontend POSTs to /api/generate
    │
    ▼
  Backend returns HTTP 402
  + PAYMENT-REQUIRED header (base64 JSON)
    │
    ▼
  @x402/fetch client parses requirements
  Prompts wallet to sign EIP-712 USDC authorization
    │
    ▼
  Frontend retries with PAYMENT-SIGNATURE header
    │
    ▼
  PayAI facilitator verifies & settles USDC on Avalanche
    │
    ▼
  Backend calls OpenAI gpt-4o-mini
  Returns 3 AI-generated messages
    │
    ▼
  User picks a message → "Use in Mint" → NFT minted
```

<br />

<table>
<tr>
<th>Detail</th>
<th>Value</th>
</tr>
<tr><td><strong>Protocol version</strong></td><td>x402 v2</td></tr>
<tr><td><strong>Headers</strong></td><td><code>PAYMENT-REQUIRED</code> / <code>PAYMENT-SIGNATURE</code></td></tr>
<tr><td><strong>Network</strong></td><td>Avalanche C-Chain (<code>eip155:43114</code>)</td></tr>
<tr><td><strong>Payment asset</strong></td><td>Native USDC — <code>0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E</code></td></tr>
<tr><td><strong>Facilitator</strong></td><td><a href="https://facilitator.payai.network">PayAI</a> (supports Avalanche mainnet)</td></tr>
<tr><td><strong>Price</strong></td><td>$0.01 USDC per AI generation</td></tr>
<tr><td><strong>Signing method</strong></td><td>EIP-712 <code>TransferWithAuthorization</code> (gasless)</td></tr>
<tr><td><strong>Server SDK</strong></td><td><code>@x402/express</code> + <code>@x402/evm</code> + custom Avalanche USDC money parser</td></tr>
<tr><td><strong>Client SDK</strong></td><td><code>@x402/fetch</code> + <code>@x402/evm</code></td></tr>
</table>

> **Note:** The `@x402/evm` package doesn't include Avalanche in its default asset map, so we register the USDC contract via `registerMoneyParser()`. See [`backend/src/middleware/x402.ts`](backend/src/middleware/x402.ts) for implementation.

<br />

---

<br />

## Avalanche Data API

All onchain stats displayed in the app are real — pulled live from the **Avalanche API**:

- Total mints across the platform (60,000+)
- Active wallets and community participants (2,400+)
- Recent minting activity and card interactions
- Contract interaction history via Snowtrace

See [`src/lib/avalanche-data.ts`](src/lib/avalanche-data.ts) for the data fetching implementation.

<br />

---

<br />

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion |
| **Wallet** | wagmi, viem, Reown AppKit (WalletConnect) |
| **Backend** | Node.js, Express, TypeScript, tsx |
| **AI** | OpenAI gpt-4o-mini |
| **Payments** | x402 v2 — `@x402/express`, `@x402/fetch`, `@x402/evm` |
| **Facilitator** | [PayAI](https://facilitator.payai.network) — Avalanche mainnet |
| **Blockchain** | Avalanche C-Chain (ERC-721 NFT + USDC) |
| **Data** | Avalanche API (real-time onchain stats) |

<br />

---

<br />

## Architecture

```
festify-your-digital-celebration/
├── src/                              # Frontend (React + Vite)
│   ├── components/
│   │   ├── HeroSection.tsx           # Landing hero with animated cards
│   │   ├── FestifyBotSection.tsx     # AI generation UI + x402 payment
│   │   ├── Navbar.tsx                # Navigation with wallet connect
│   │   └── WalletGate.tsx            # Wallet connection guard
│   ├── pages/
│   │   ├── Index.tsx                 # Landing page
│   │   ├── Mint.tsx                  # NFT minting flow (4 steps)
│   │   └── AppPage.tsx               # App dashboard
│   ├── lib/
│   │   ├── x402-client.ts            # x402 payment-enabled fetch
│   │   ├── contract.ts               # Festify NFT contract ABI
│   │   ├── web3config.ts             # wagmi + Reown config
│   │   └── avalanche-data.ts         # Avalanche API data helpers
│   └── hooks/
│       └── usePaymentFetch.ts        # React hook for x402 payments
│
├── backend/                          # Backend (Express + x402)
│   └── src/
│       ├── index.ts                  # Express server (port 3001)
│       ├── config.ts                 # Zod-validated env config
│       ├── middleware/x402.ts        # x402 payment middleware + Avalanche USDC
│       ├── routes/generate.ts        # POST /api/generate (x402-gated)
│       ├── routes/health.ts          # GET /api/health (free)
│       └── services/ai.ts            # OpenAI gpt-4o-mini integration
│
├── .env.example                      # Frontend env template
└── backend/.env.example              # Backend env template
```

<br />

---

<br />

## Getting Started

### Prerequisites

- **Node.js 18+** and npm
- An Avalanche-compatible wallet (MetaMask, Core, etc.)
- **OpenAI API key** (for AI generation)
- USDC on Avalanche C-Chain (for x402 payments — $0.01 per generation)

### 1. Clone & Install

```bash
git clone https://github.com/aliveevie/festify-your-digital-celebration.git
cd festify-your-digital-celebration

# Frontend dependencies
npm install

# Backend dependencies
cd backend && npm install && cd ..
```

### 2. Configure

```bash
# Frontend (optional — defaults to http://localhost:3001)
cp .env.example .env

# Backend (required)
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
OPENAI_API_KEY=sk-...                              # Your OpenAI key
PAY_TO_ADDRESS=0xYourWallet                         # Receives USDC payments
FACILITATOR_URL=https://facilitator.payai.network   # PayAI (Avalanche support)
NETWORK=eip155:43114                                # Avalanche C-Chain
GENERATION_PRICE=$0.01                              # Per AI generation
PORT=3001
CORS_ORIGINS=http://localhost:8080,https://festify.club
```

### 3. Run

```bash
# Terminal 1 — Backend
cd backend && npm run dev
# → Festify backend running on http://localhost:3001

# Terminal 2 — Frontend
npm run dev
# → App running on http://localhost:8080
```

### 4. Verify

```bash
# Health check (free)
curl http://localhost:3001/api/health
# → {"status":"ok"}

# Test x402 gate (expect 402)
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{"occasion":"Birthday","tone":"warm"}'
# → HTTP 402 with PAYMENT-REQUIRED header
```

<br />

---

<br />

## Links

| | |
|---|---|
| **Live Demo** | [avalanche.festify.ibxlab.com](https://avalanche.festify.ibxlab.com/) |
| **Demo Video** | [youtu.be/K6FS8sJs8oY](https://youtu.be/K6FS8sJs8oY) |
| **Verified Contract** | [Snowtrace](https://snowtrace.io/address/0x822F7cb652befF262Ec5aE9F4203DD066E3174cd/contract/43114/code) |
| **x402 Integration PR** | [PR #1](https://github.com/aliveevie/festify-your-digital-celebration/pull/1) |
| **x402 Protocol Docs** | [docs.x402.org](https://docs.x402.org) |
| **PayAI Facilitator** | [facilitator.payai.network](https://facilitator.payai.network) |
| **Avalanche** | [avax.network](https://www.avax.network/) |

<br />

---

<div align="center">
<br />

**Built on Avalanche. Powered by x402.**

<br />

MIT License

<br />
</div>
