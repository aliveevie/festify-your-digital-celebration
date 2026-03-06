import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { WalletGate } from "@/components/WalletGate";
import { FESTIFY_CONTRACT } from "@/lib/contract";
import { useNavigate } from "react-router-dom";
import {
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
  useAccount,
} from "wagmi";
import { parseEther, formatEther, isAddress } from "viem";

const occasions = [
  { emoji: "🎂", label: "Birthday", gradient: "from-pink-500 to-purple-600" },
  { emoji: "🎓", label: "Graduation", gradient: "from-amber-400 to-orange-500" },
  { emoji: "💍", label: "Anniversary", gradient: "from-violet-500 to-indigo-600" },
  { emoji: "💝", label: "Love", gradient: "from-rose-400 to-pink-500" },
  { emoji: "🎄", label: "Holiday", gradient: "from-emerald-500 to-teal-600" },
  { emoji: "👶", label: "Baby Shower", gradient: "from-sky-400 to-blue-500" },
  { emoji: "🏠", label: "Housewarming", gradient: "from-yellow-400 to-amber-500" },
  { emoji: "🙏", label: "Thank You", gradient: "from-fuchsia-500 to-pink-600" },
];

const Mint = () => {
  const location = useLocation();
  const [selected, setSelected] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [step, setStep] = useState(1);
  const [mintError, setMintError] = useState("");
  const navigate = useNavigate();

  const prefilledMessage = (location.state as { prefilledMessage?: string } | null)?.prefilledMessage;
  useEffect(() => {
    if (prefilledMessage && typeof prefilledMessage === "string") {
      setMessage(prefilledMessage);
    }
  }, [prefilledMessage]);

  const { chainId } = useAccount();
  const { switchChain } = useSwitchChain();

  const { data: mintFee } = useReadContract({
    address: FESTIFY_CONTRACT.address,
    abi: FESTIFY_CONTRACT.abi,
    functionName: "mintFee",
    chainId: FESTIFY_CONTRACT.chainId,
  });

  const {
    writeContract,
    data: txHash,
    isPending: isWriting,
    reset: resetWrite,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash,
    });

  const minting = isWriting || isConfirming;

  if (isConfirmed && step === 3) {
    setStep(4);
  }

  const handleMint = async () => {
    setMintError("");

    if (!isAddress(recipient)) {
      setMintError("Invalid recipient wallet address.");
      return;
    }

    if (selected === null) return;

    if (chainId !== FESTIFY_CONTRACT.chainId) {
      switchChain({ chainId: FESTIFY_CONTRACT.chainId });
      return;
    }

    const festival = occasions[selected].label;
    const metadataURI = `data:application/json,${encodeURIComponent(
      JSON.stringify({
        name: `Festify ${festival} Card`,
        description: message,
        image: "",
        attributes: [
          { trait_type: "Festival", value: festival },
          { trait_type: "Message", value: message },
        ],
      })
    )}`;

    writeContract(
      {
        address: FESTIFY_CONTRACT.address,
        abi: FESTIFY_CONTRACT.abi,
        functionName: "mintGreetingCard",
        args: [recipient as `0x${string}`, metadataURI, festival],
        value: mintFee ?? parseEther("0"),
        chainId: FESTIFY_CONTRACT.chainId,
      },
      {
        onError: (err) => {
          setMintError(err.message.split("\n")[0]);
        },
      }
    );
  };

  const displayFee = mintFee ? formatEther(mintFee) : "...";

  return (
    <WalletGate>
    <div className="relative min-h-screen bg-background overflow-hidden">
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-4">
              Mint Your <span className="text-primary">NFT Card</span>
            </h1>
            <p className="text-muted-foreground font-body text-lg">
              Create a personalized greeting card, mint it on Avalanche, and send it forever onchain
            </p>
          </motion.div>

          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm transition-all ${
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {s === 4 && step >= 4 ? "✓" : s}
                </div>
                {s < 4 && (
                  <div className={`w-12 h-0.5 ${step > s ? "bg-primary" : "bg-secondary"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Choose template */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-heading font-bold text-center">Choose a Template</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {occasions.map((o, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelected(i)}
                    className={`relative rounded-2xl p-6 bg-gradient-to-br ${o.gradient} flex flex-col items-center gap-3 transition-all ${
                      selected === i
                        ? "ring-4 ring-primary ring-offset-2 ring-offset-background scale-105"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span className="text-4xl">{o.emoji}</span>
                    <span className="text-sm font-body font-semibold text-foreground">{o.label}</span>
                  </motion.button>
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => selected !== null && setStep(2)}
                  disabled={selected === null}
                  className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-heading font-bold disabled:opacity-40 hover:opacity-90 transition-opacity"
                >
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Personalize */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 max-w-lg mx-auto"
            >
              <h2 className="text-2xl font-heading font-bold text-center">Personalize Your Card</h2>

              {selected !== null && (
                <div className={`rounded-2xl p-8 bg-gradient-to-br ${occasions[selected].gradient} text-center`}>
                  <span className="text-6xl block mb-4">{occasions[selected].emoji}</span>
                  <p className="text-foreground font-body text-lg min-h-[2rem]">
                    {message || "Your message here..."}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-body text-muted-foreground mb-1 block">Your Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Happy Birthday! Wishing you all the best..."
                    className="w-full rounded-xl bg-secondary border border-border p-4 text-foreground font-body resize-none h-28 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-body text-muted-foreground mb-1 block">Recipient Wallet Address</label>
                  <input
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="0x..."
                    className="w-full rounded-xl bg-secondary border border-border p-4 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-full bg-secondary text-foreground font-heading font-bold hover:opacity-90 transition-opacity"
                >
                  ← Back
                </button>
                <button
                  onClick={() => message && recipient && setStep(3)}
                  disabled={!message || !recipient}
                  className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-heading font-bold disabled:opacity-40 hover:opacity-90 transition-opacity"
                >
                  Preview & Mint →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review & Mint */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 max-w-lg mx-auto text-center"
            >
              <h2 className="text-2xl font-heading font-bold">Review & Mint</h2>

              {selected !== null && (
                <div className={`rounded-2xl p-8 bg-gradient-to-br ${occasions[selected].gradient}`}>
                  <span className="text-6xl block mb-4">{occasions[selected].emoji}</span>
                  <p className="text-foreground font-body text-lg">{message}</p>
                </div>
              )}

              <div className="bg-card rounded-xl p-4 text-left space-y-2 border border-border">
                <p className="text-sm font-body text-muted-foreground">
                  To: <span className="text-foreground font-mono text-xs">{recipient}</span>
                </p>
                <p className="text-sm font-body text-muted-foreground">
                  Network: <span className="text-avax font-semibold">Avalanche C-Chain</span>
                </p>
                <p className="text-sm font-body text-muted-foreground">
                  Mint Fee: <span className="text-foreground">{displayFee} AVAX</span>
                </p>
              </div>

              {mintError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-left">
                  <p className="text-sm font-body text-red-400">{mintError}</p>
                </div>
              )}

              {chainId !== FESTIFY_CONTRACT.chainId && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
                  <p className="text-sm font-body text-amber-400">
                    Please switch to Avalanche C-Chain to mint.
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => { setStep(2); setMintError(""); resetWrite(); }}
                  className="px-6 py-3 rounded-full bg-secondary text-foreground font-heading font-bold hover:opacity-90 transition-opacity"
                >
                  ← Back
                </button>
                <button
                  onClick={handleMint}
                  disabled={minting}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-avax to-violet text-foreground font-heading font-bold animate-glow-pulse hover:scale-105 transition-transform disabled:opacity-60"
                >
                  {isWriting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Confirm in Wallet...
                    </span>
                  ) : isConfirming ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Minting on Avalanche...
                    </span>
                  ) : chainId !== FESTIFY_CONTRACT.chainId ? (
                    "Switch to Avalanche"
                  ) : (
                    "Mint & Send 🎉"
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 max-w-lg mx-auto"
            >
              <div className="text-7xl">🎉</div>
              <h2 className="text-3xl font-heading font-extrabold text-primary">Card Minted!</h2>
              <p className="text-muted-foreground font-body">
                Your NFT greeting card has been minted on Avalanche and sent to the recipient's wallet.
              </p>
              {txHash && (
                <div className="bg-card rounded-xl p-4 border border-border">
                  <p className="text-xs font-mono text-muted-foreground break-all mb-2">
                    TX: {txHash}
                  </p>
                  <a
                    href={`https://snowtrace.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-body text-primary hover:underline"
                  >
                    View on Snowtrace →
                  </a>
                </div>
              )}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setStep(1);
                    setSelected(null);
                    setMessage("");
                    setRecipient("");
                    setMintError("");
                    resetWrite();
                  }}
                  className="px-6 py-3 rounded-full bg-secondary text-foreground font-heading font-bold hover:opacity-90 transition-opacity"
                >
                  Mint Another
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-heading font-bold hover:opacity-90 transition-opacity"
                >
                  Back Home
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
    </WalletGate>
  );
};

export default Mint;
