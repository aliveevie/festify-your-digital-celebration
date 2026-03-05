import { FESTIFY_CONTRACT } from "./contract";

const GLACIER_BASE = "https://glacier-api.avax.network";
const CHAIN_ID = "43114";

export interface NftToken {
  tokenId: string;
  tokenUri: string;
  metadata: {
    indexStatus?: string;
    name?: string;
    description?: string;
    imageUri?: string;
    attributes?: string | Record<string, unknown>[];
  };
  ownerAddress?: string;
}

export interface WalletNft {
  tokenId: string;
  tokenUri: string;
  metadata: {
    indexStatus?: string;
    name?: string;
    description?: string;
    imageUri?: string;
    attributes?: string | Record<string, unknown>[];
  };
  ownerAddress?: string;
}

export interface NativeBalance {
  balance: string;
  symbol: string;
  decimals: number;
  price: {
    currencyCode: string;
    value: number;
  };
  balanceValue: {
    currencyCode: string;
    value: number;
  };
  logoUri: string;
}

export interface ParsedCardMeta {
  name: string;
  description: string;
  festival: string;
  template: string;
  theme: string;
  sender: string;
  recipient: string;
  image: string;
}

/** Parse token metadata from tokenUri (handles JSON string or data: URI) */
export function parseCardMetadata(tokenUri?: string): ParsedCardMeta {
  const defaults: ParsedCardMeta = {
    name: "", description: "", festival: "", template: "",
    theme: "", sender: "", recipient: "", image: "",
  };
  if (!tokenUri) return defaults;

  try {
    let jsonStr = tokenUri;
    if (jsonStr.startsWith("data:application/json,")) {
      jsonStr = decodeURIComponent(jsonStr.replace("data:application/json,", ""));
    }
    const json = JSON.parse(jsonStr);
    const result = { ...defaults };
    result.name = json.name || "";
    result.description = json.description || "";
    result.image = json.image || "";

    const attrs: Record<string, unknown>[] = Array.isArray(json.attributes) ? json.attributes : [];
    for (const a of attrs) {
      const key = String(a.trait_type || "");
      const val = String(a.value || "");
      if (key === "Festival") result.festival = val;
      else if (key === "Template") result.template = val;
      else if (key === "Theme") result.theme = val;
      else if (key === "Sender") result.sender = val;
      else if (key === "Recipient") result.recipient = val;
      else if (key === "Message") result.description = val;
    }
    return result;
  } catch {
    return defaults;
  }
}

/** Get native AVAX balance with USD price */
export async function getNativeBalance(walletAddress: string): Promise<NativeBalance | null> {
  const url = `${GLACIER_BASE}/v1/chains/${CHAIN_ID}/addresses/${walletAddress}/balances:getNative`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data.nativeTokenBalance ?? null;
}

/** Get user's Festify NFTs with full metadata from the Data API */
export async function getWalletFestifyNfts(walletAddress: string): Promise<WalletNft[]> {
  const url = `${GLACIER_BASE}/v1/chains/${CHAIN_ID}/addresses/${walletAddress}/balances:listErc721?contractAddress=${FESTIFY_CONTRACT.address}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.erc721TokenBalances ?? [];
}

/** Get details for a specific Festify NFT token */
export async function getTokenDetails(tokenId: string): Promise<NftToken | null> {
  const url = `${GLACIER_BASE}/v1/chains/${CHAIN_ID}/nfts/collections/${FESTIFY_CONTRACT.address}/tokens/${tokenId}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

/** List recent tokens from the Festify collection */
export async function listFestifyCollectionTokens(pageSize = 20): Promise<NftToken[]> {
  const url = `${GLACIER_BASE}/v1/chains/${CHAIN_ID}/nfts/collections/${FESTIFY_CONTRACT.address}/tokens?pageSize=${pageSize}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.tokens ?? [];
}
