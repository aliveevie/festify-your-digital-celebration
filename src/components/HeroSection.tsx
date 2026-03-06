import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cardMockups = [
  { gradient: "from-pink-500 to-fuchsia-500", emoji: "🎂", label: "Birthday", rotate: -12, top: "18%", left: "4%", delay: 0 },
  { gradient: "from-amber-400 to-orange-500", emoji: "🎓", label: "Graduation", rotate: 8, top: "12%", right: "6%", delay: 0.8 },
  { gradient: "from-violet-500 to-indigo-600", emoji: "💍", label: "Anniversary", rotate: -6, bottom: "22%", left: "8%", delay: 1.6 },
  { gradient: "from-rose-400 to-pink-500", emoji: "💝", label: "Love", rotate: 10, bottom: "16%", right: "4%", delay: 0.4 },
  { gradient: "from-emerald-400 to-teal-500", emoji: "🎄", label: "Holiday", rotate: -3, top: "48%", left: "1%", delay: 1.2 },
  { gradient: "from-sky-400 to-blue-500", emoji: "🙏", label: "Thank You", rotate: 5, top: "44%", right: "2%", delay: 2.0 },
];

const wordGroups = [
  { text: "Send Joy", highlight: false },
  { text: "Forever.", highlight: true },
  { text: "Onchain.", highlight: true },
];

export const HeroSection = () => {
  const [confetti, setConfetti] = useState(false);
  const navigate = useNavigate();

  const handleCTA = () => {
    setConfetti(true);
    setTimeout(() => {
      setConfetti(false);
      navigate("/app");
    }, 800);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 blockchain-grid" />

      {/* Radial glow behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-violet/10 via-avax/5 to-transparent blur-3xl pointer-events-none" />

      {/* Floating NFT cards — positioned around edges */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none">
        {cardMockups.map((card, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: card.top,
              bottom: (card as { bottom?: string }).bottom,
              left: card.left,
              right: (card as { right?: string }).right,
            }}
            initial={{ opacity: 0, y: 40, rotate: card.rotate }}
            animate={{ opacity: 1, y: 0, rotate: card.rotate }}
            transition={{ delay: 0.6 + card.delay, duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              className={`w-28 h-36 sm:w-32 sm:h-40 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-xl shadow-black/20 flex flex-col items-center justify-center gap-2 border border-white/10`}
            >
              <span className="text-3xl">{card.emoji}</span>
              <span className="text-[10px] font-bold font-body text-white/80 bg-black/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                {card.label}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-body text-muted-foreground">Live on Avalanche C-Chain</span>
        </motion.div>

        {/* Word-by-word heading — no more letter-by-letter breaks */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-extrabold leading-[1.05] tracking-tight mb-8">
          {wordGroups.map((group, gi) => (
            <motion.span
              key={gi}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + gi * 0.15, duration: 0.6, ease: "easeOut" }}
              className="inline-block mr-[0.25em] last:mr-0"
            >
              {group.text.split("").map((char, ci) => (
                <span
                  key={ci}
                  className={
                    char === "."
                      ? "text-avax"
                      : group.highlight
                        ? "bg-gradient-to-r from-violet to-avax bg-clip-text text-transparent"
                        : "text-foreground"
                  }
                >
                  {char}
                </span>
              ))}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto mb-10 font-body leading-relaxed"
        >
          The world's first NFT greeting card platform on Avalanche — mint, send, and treasure moments forever
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleCTA}
            className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-avax to-violet text-foreground font-heading font-bold text-base animate-glow-pulse hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Minting
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          <a
            href="#features"
            className="px-8 py-3.5 rounded-full border border-border/60 text-muted-foreground font-heading font-semibold text-base hover:border-primary/40 hover:text-foreground transition-all duration-300"
          >
            How it works
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex items-center justify-center gap-8 sm:gap-12 mt-16 pt-8 border-t border-border/30"
        >
          {[
            { value: "x402", label: "Payment Protocol" },
            { value: "$0.01", label: "Per AI Generation" },
            { value: "USDC", label: "On Avalanche" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-lg sm:text-xl font-heading font-bold text-foreground">{stat.value}</div>
              <div className="text-[11px] sm:text-xs font-body text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Confetti */}
      {confetti && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: ['#E84142', '#8B5CF6', '#F59E0B', '#EC4899', '#10B981'][i % 5],
                animation: `confetti-pop ${0.6 + Math.random() * 0.6}s ease-out forwards`,
                left: `${35 + Math.random() * 30}%`,
                top: '45%',
                animationDelay: `${Math.random() * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};
