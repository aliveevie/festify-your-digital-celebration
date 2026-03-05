import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { WalletGate } from "@/components/WalletGate";
import { FESTIFY_CONTRACT } from "@/lib/contract";
import {
  listFestifyCollectionTokens,
  getWalletFestifyNfts,
  getNativeBalance,
  parseCardMetadata,
  type NftToken,
  type WalletNft,
  type NativeBalance,
} from "@/lib/avalanche-data";
import { useNavigate } from "react-router-dom";
import { useAccount, useReadContract } from "wagmi";
import { formatEther } from "viem";

const quickActions = [
  { emoji: "🎨", title: "Mint a Card", desc: "Create & send an NFT greeting card", path: "/mint" },
  { emoji: "🖼️", title: "My Collection", desc: "View cards you've minted & received", path: "#collection" },
  { emoji: "📊", title: "Activity", desc: "Recent mints & transfers", path: "#activity" },
];

const festivalGradients: Record<string, string> = {
  Birthday: "from-pink-500 to-purple-600",
  Graduation: "from-amber-400 to-orange-500",
  Anniversary: "from-violet-500 to-indigo-600",
  Love: "from-rose-400 to-pink-500",
  Holiday: "from-emerald-500 to-teal-600",
  "Baby Shower": "from-sky-400 to-blue-500",
  Housewarming: "from-yellow-400 to-amber-500",
  "Thank You": "from-fuchsia-500 to-pink-600",
  Ramadan: "from-emerald-400 to-teal-500",
  Halloween: "from-orange-500 to-amber-600",
  Christmas: "from-red-500 to-green-600",
  "New Year": "from-indigo-500 to-blue-600",
  Eid: "from-teal-400 to-emerald-500",
  Diwali: "from-amber-400 to-red-500",
};

const festivalEmojis: Record<string, string> = {
  Birthday: "🎂", Graduation: "🎓", Anniversary: "💍", Love: "💝",
  Holiday: "🎄", "Baby Shower": "👶", Housewarming: "🏠", "Thank You": "🙏",
  Ramadan: "🌙", Halloween: "🎃", Christmas: "🎄", "New Year": "🎆",
  Eid: "🕌", Diwali: "🪔",
};

function getGradient(festival: string) {
  return festivalGradients[festival] || "from-primary to-violet";
}
function getEmoji(festival: string) {
  return festivalEmojis[festival] || "🎉";
}

const AppPage = () => {
  const navigate = useNavigate();
  const { address } = useAccount();

  const [recentTokens, setRecentTokens] = useState<NftToken[]>([]);
  const [loadingTokens, setLoadingTokens] = useState(true);
  const [myNfts, setMyNfts] = useState<WalletNft[]>([]);
  const [loadingMyNfts, setLoadingMyNfts] = useState(true);
  const [avaxBalance, setAvaxBalance] = useState<NativeBalance | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Contract reads
  const { data: sentIds } = useReadContract({
    address: FESTIFY_CONTRACT.address,
    abi: FESTIFY_CONTRACT.abi,
    functionName: "getSentGreetings",
    args: address ? [address] : undefined,
    chainId: FESTIFY_CONTRACT.chainId,
    query: { enabled: !!address },
  });

  const { data: receivedIds } = useReadContract({
    address: FESTIFY_CONTRACT.address,
    abi: FESTIFY_CONTRACT.abi,
    functionName: "getReceivedGreetings",
    args: address ? [address] : undefined,
    chainId: FESTIFY_CONTRACT.chainId,
    query: { enabled: !!address },
  });

  const { data: totalSupply } = useReadContract({
    address: FESTIFY_CONTRACT.address,
    abi: FESTIFY_CONTRACT.abi,
    functionName: "totalSupply",
    chainId: FESTIFY_CONTRACT.chainId,
  });

  const { data: mintFee } = useReadContract({
    address: FESTIFY_CONTRACT.address,
    abi: FESTIFY_CONTRACT.abi,
    functionName: "mintFee",
    chainId: FESTIFY_CONTRACT.chainId,
  });

  // Avalanche Data API - wallet NFTs + balance
  useEffect(() => {
    if (!address) return;
    let cancelled = false;

    setLoadingMyNfts(true);
    getWalletFestifyNfts(address).then((nfts) => {
      if (!cancelled) { setMyNfts(nfts); setLoadingMyNfts(false); }
    }).catch(() => { if (!cancelled) setLoadingMyNfts(false); });

    getNativeBalance(address).then((bal) => {
      if (!cancelled) setAvaxBalance(bal);
    }).catch(() => {});

    return () => { cancelled = true; };
  }, [address]);

  // Avalanche Data API - collection tokens
  useEffect(() => {
    let cancelled = false;
    setLoadingTokens(true);
    listFestifyCollectionTokens(10).then((tokens) => {
      if (!cancelled) { setRecentTokens(tokens); setLoadingTokens(false); }
    }).catch(() => { if (!cancelled) setLoadingTokens(false); });
    return () => { cancelled = true; };
  }, []);

  const sentCount = sentIds ? sentIds.length : 0;
  const receivedCount = receivedIds ? receivedIds.length : 0;
  const supply = totalSupply ? Number(totalSupply) : 0;

  const avaxFormatted = avaxBalance
    ? parseFloat(formatEther(BigInt(avaxBalance.balance))).toFixed(4)
    : null;

  return (
    <WalletGate>
    <div className="relative min-h-screen bg-background overflow-hidden">
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Welcome header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold mb-2">
              Welcome to <span className="text-primary">Festify</span>
            </h1>
            <p className="text-muted-foreground font-body text-lg">
              Your dashboard for minting and managing NFT greeting cards on Avalanche
            </p>
            {address && (
              <p className="text-xs font-mono text-muted-foreground mt-2">
                {address}
              </p>
            )}
          </motion.div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
          >
            {quickActions.map((a, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (a.path?.startsWith("#")) {
                    document.getElementById(a.path.slice(1))?.scrollIntoView({ behavior: "smooth" });
                  } else if (a.path) {
                    navigate(a.path);
                  }
                }}
                className="bg-card border border-border rounded-2xl p-6 text-left hover:border-primary/50 transition-colors group"
              >
                <span className="text-3xl block mb-3">{a.emoji}</span>
                <h3 className="font-heading font-bold text-sm mb-1 group-hover:text-primary transition-colors">{a.title}</h3>
                <p className="text-xs text-muted-foreground font-body">{a.desc}</p>
              </motion.button>
            ))}
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6 mb-12 grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            <div className="text-center">
              <div className="text-2xl font-heading font-extrabold text-primary">{sentCount}</div>
              <div className="text-xs text-muted-foreground font-body">Cards Sent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-extrabold text-primary">{receivedCount}</div>
              <div className="text-xs text-muted-foreground font-body">Cards Received</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-extrabold text-primary">{supply}</div>
              <div className="text-xs text-muted-foreground font-body">Total Minted</div>
            </div>
            {avaxBalance && (
              <div className="text-center">
                <div className="text-2xl font-heading font-extrabold text-avax">{avaxFormatted}</div>
                <div className="text-xs text-muted-foreground font-body">
                  AVAX (${avaxBalance.balanceValue.value.toFixed(2)})
                </div>
              </div>
            )}
            {mintFee !== undefined && (
              <div className="text-center">
                <div className="text-2xl font-heading font-extrabold text-foreground">
                  {formatEther(mintFee)}
                </div>
                <div className="text-xs text-muted-foreground font-body">Mint Fee (AVAX)</div>
              </div>
            )}
          </motion.div>

          {/* My Collection - Avalanche Data API rich NFT data */}
          <motion.div
            id="collection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-12"
          >
            <h2 className="text-xl font-heading font-bold mb-1">My Collection</h2>
            <p className="text-xs text-muted-foreground font-body mb-4">
              Your Festify NFTs via the Avalanche Data API
            </p>

            {loadingMyNfts ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl p-5 animate-pulse">
                    <div className="w-12 h-12 rounded-xl bg-secondary mb-3" />
                    <div className="h-4 bg-secondary rounded w-3/4 mb-2" />
                    <div className="h-3 bg-secondary rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : myNfts.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">🌟</div>
                <p className="text-muted-foreground font-body mb-4">
                  You don't own any Festify cards yet.
                </p>
                <button
                  onClick={() => navigate("/mint")}
                  className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-heading font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Mint Your First Card
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myNfts.map((nft) => {
                  const meta = parseCardMetadata(nft.tokenUri);
                  const gradient = getGradient(meta.festival);
                  const emoji = getEmoji(meta.festival);
                  const isExpanded = expandedCard === nft.tokenId;

                  return (
                    <motion.div
                      key={nft.tokenId}
                      layout
                      onClick={() => setExpandedCard(isExpanded ? null : nft.tokenId)}
                      className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-primary/40 transition-colors"
                    >
                      <div className={`h-24 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <span className="text-4xl">{emoji}</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-heading font-bold text-sm truncate">
                          {meta.name || `Card #${nft.tokenId}`}
                        </h3>
                        {meta.festival && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-body">
                            {meta.festival}
                          </span>
                        )}
                        {meta.description && (
                          <p className="text-xs text-muted-foreground font-body mt-2 line-clamp-2">
                            {meta.description}
                          </p>
                        )}

                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 pt-3 border-t border-border space-y-1.5"
                          >
                            <p className="text-xs font-body text-muted-foreground">
                              Token ID: <span className="text-foreground font-mono">#{nft.tokenId}</span>
                            </p>
                            {meta.template && (
                              <p className="text-xs font-body text-muted-foreground">
                                Template: <span className="text-foreground">{meta.template}</span>
                              </p>
                            )}
                            {meta.theme && (
                              <p className="text-xs font-body text-muted-foreground">
                                Theme: <span className="text-foreground">{meta.theme}</span>
                              </p>
                            )}
                            {meta.sender && (
                              <p className="text-xs font-body text-muted-foreground">
                                From: <span className="text-foreground font-mono text-[10px]">{meta.sender}</span>
                              </p>
                            )}
                            {meta.recipient && (
                              <p className="text-xs font-body text-muted-foreground">
                                To: <span className="text-foreground font-mono text-[10px]">{meta.recipient}</span>
                              </p>
                            )}
                            <a
                              href={`https://snowtrace.io/token/${FESTIFY_CONTRACT.address}?a=${nft.tokenId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-block text-xs text-primary hover:underline mt-1"
                            >
                              View on Snowtrace →
                            </a>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Recent Community Mints - Avalanche Data API */}
          <motion.div
            id="activity"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-heading font-bold mb-1">Recent Community Mints</h2>
            <p className="text-xs text-muted-foreground font-body mb-4">
              Powered by the Avalanche Data API (Glacier)
            </p>

            {loadingTokens ? (
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-4 animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-secondary" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-secondary rounded w-3/4" />
                        <div className="h-3 bg-secondary rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentTokens.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-muted-foreground font-body">
                  No cards minted in this collection yet. Be the first!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {recentTokens.map((token) => {
                  const meta = parseCardMetadata(token.tokenUri);
                  const gradient = getGradient(meta.festival);
                  const emoji = getEmoji(meta.festival);

                  return (
                    <div
                      key={token.tokenId}
                      className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shrink-0`}>
                        {emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body font-semibold text-sm truncate">
                          {meta.name || `Card #${token.tokenId}`}
                        </p>
                        {meta.description && (
                          <p className="text-xs text-muted-foreground font-body truncate">
                            {meta.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          {meta.festival && (
                            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-body">
                              {meta.festival}
                            </span>
                          )}
                          <a
                            href={`https://snowtrace.io/token/${FESTIFY_CONTRACT.address}?a=${token.tokenId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-primary hover:underline"
                          >
                            #{token.tokenId}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
    </WalletGate>
  );
};

export default AppPage;
