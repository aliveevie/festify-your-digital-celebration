import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { usePaymentFetch } from "@/hooks/usePaymentFetch";
import { generateMessages } from "@/lib/x402-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const FestifyBotSVG = () => (
  <div className="relative animate-robot-bob">
    <svg viewBox="0 0 200 260" width="200" height="260" className="drop-shadow-2xl">
      <g className="animate-antenna">
        <line x1="100" y1="30" x2="100" y2="10" stroke="hsl(263,67%,66%)" strokeWidth="3" />
        <text x="92" y="12" fontSize="16">❤️</text>
      </g>
      <rect x="55" y="30" width="90" height="70" rx="20" fill="hsl(263,67%,66%)" />
      <circle cx="80" cy="60" r="10" fill="hsl(38,91%,50%)" className="animate-blink" />
      <circle cx="120" cy="60" r="10" fill="hsl(38,91%,50%)" className="animate-blink" style={{ animationDelay: '0.1s' }} />
      <circle cx="82" cy="58" r="4" fill="hsl(252,30%,8%)" />
      <circle cx="122" cy="58" r="4" fill="hsl(252,30%,8%)" />
      <path d="M 82 80 Q 100 92 118 80" fill="none" stroke="hsl(38,91%,50%)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="60" y="105" width="80" height="90" rx="15" fill="hsl(263,67%,66%)" />
      <rect x="75" y="115" width="50" height="30" rx="8" fill="hsl(252,30%,12%)" />
      <text x="83" y="135" fontSize="9" fill="hsl(38,91%,50%)" fontWeight="bold" fontFamily="Syne">F</text>
      <rect x="30" y="115" width="25" height="12" rx="6" fill="hsl(263,67%,66%)" />
      <rect x="145" y="110" width="25" height="12" rx="6" fill="hsl(263,67%,66%)" transform="rotate(-15 145 110)" />
      <rect x="155" y="90" width="30" height="40" rx="4" fill="hsl(0,78%,58%)" transform="rotate(-10 160 110)" />
      <text x="162" y="115" fontSize="12" transform="rotate(-10 160 110)">🌸</text>
      <rect x="72" y="198" width="18" height="30" rx="8" fill="hsl(263,67%,66%)" />
      <rect x="110" y="198" width="18" height="30" rx="8" fill="hsl(263,67%,66%)" />
      <ellipse cx="81" cy="232" rx="14" ry="8" fill="hsl(263,67%,66%)" />
      <ellipse cx="119" cy="232" rx="14" ry="8" fill="hsl(263,67%,66%)" />
    </svg>
  </div>
);

const steps = [
  { num: "1", label: "Design", icon: "🎨" },
  { num: "2", label: "FestifyBot Reviews", icon: "🤖" },
  { num: "3", label: "Mint NFT", icon: "⛏️" },
  { num: "4", label: "Deliver Forever", icon: "💎" },
];

const OCCASIONS = [
  "Birthday", "Graduation", "Anniversary", "Love", "Holiday",
  "Baby Shower", "Housewarming", "Thank You", "Ramadan", "Halloween",
  "Christmas", "New Year", "Eid", "Diwali",
];

const TONES = ["Heartfelt", "Funny", "Formal", "Casual", "Poetic", "Short & Sweet"];

export const FestifyBotSection = () => {
  const navigate = useNavigate();
  const { isConnected } = useAppKitAccount();
  const { open: openWallet } = useAppKit();
  const { paymentFetch, isReady } = usePaymentFetch();

  const [occasion, setOccasion] = useState("");
  const [tone, setTone] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const canGenerate = isReady && occasion && tone && !loading;

  const handleGenerate = async () => {
    if (!paymentFetch || !occasion || !tone) return;
    setError("");
    setLoading(true);
    try {
      const next = await generateMessages(
        {
          occasion,
          tone,
          recipientName: recipientName || undefined,
          senderName: senderName || undefined,
          additionalContext: additionalContext || undefined,
        },
        paymentFetch,
      );
      setMessages(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUseMessage = (message: string) => {
    navigate("/mint", { state: { prefilledMessage: message } });
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading font-bold text-center mb-4"
        >
          AI-Powered Minting on Avalanche
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-16 text-lg font-body"
        >
          Meet FestifyBot — Your AI Minting Companion
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <FestifyBotSVG />
            <div className="mt-6 relative bg-card border border-border rounded-2xl px-6 py-4 max-w-xs">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l border-t border-border rotate-45" />
              <p className="text-sm font-body text-foreground/90">
                {messages.length
                  ? "Pick a message and mint it as an NFT! ✨"
                  : "I'll write 3 message ideas for your card — pay $0.01 in USDC to generate."}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-6 space-y-4"
          >
            {!isConnected ? (
              <div className="space-y-4 text-center py-4">
                <p className="text-sm text-muted-foreground font-body">
                  Connect your wallet to use FestifyBot and pay $0.01 USDC via x402 on Avalanche.
                </p>
                <Button onClick={() => openWallet()} className="w-full">
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Occasion</Label>
                    <Select value={occasion} onValueChange={setOccasion}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {OCCASIONS.map((o) => (
                          <SelectItem key={o} value={o}>{o}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {TONES.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Recipient name (optional)</Label>
                    <Input
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Alex"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Your name (optional)</Label>
                    <Input
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Sam"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Extra context (optional)</Label>
                  <Textarea
                    value={additionalContext}
                    onChange={(e) => setAdditionalContext(e.target.value)}
                    placeholder="e.g. 10th anniversary, they love hiking"
                    rows={2}
                    className="resize-none"
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive font-body">{error}</p>
                )}
                <Button
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  className="w-full bg-gradient-to-r from-avax to-violet text-foreground hover:opacity-90"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Paying & generating…
                    </span>
                  ) : (
                    <>Generate 3 messages — $0.01 USDC</>
                  )}
                </Button>
                {messages.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <Label className="text-xs">Pick one to mint</Label>
                    {messages.map((msg, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleUseMessage(msg)}
                        className="w-full text-left rounded-lg bg-secondary border border-border px-4 py-3 text-sm font-body hover:border-primary/50 transition-colors"
                      >
                        &ldquo;{msg}&rdquo;
                        <span className="block text-xs text-primary mt-1">Use in Mint →</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-xs text-muted-foreground font-body">Step {s.num}</div>
              <div className="text-sm font-heading font-semibold">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
