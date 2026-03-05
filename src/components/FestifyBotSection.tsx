import { motion } from "framer-motion";

const FestifyBotSVG = () => (
  <div className="relative animate-robot-bob">
    <svg viewBox="0 0 200 260" width="200" height="260" className="drop-shadow-2xl">
      {/* Antenna */}
      <g className="animate-antenna">
        <line x1="100" y1="30" x2="100" y2="10" stroke="hsl(263,67%,66%)" strokeWidth="3" />
        <text x="92" y="12" fontSize="16">❤️</text>
      </g>
      {/* Head */}
      <rect x="55" y="30" width="90" height="70" rx="20" fill="hsl(263,67%,66%)" />
      {/* Eyes */}
      <circle cx="80" cy="60" r="10" fill="hsl(38,91%,50%)" className="animate-blink" />
      <circle cx="120" cy="60" r="10" fill="hsl(38,91%,50%)" className="animate-blink" style={{ animationDelay: '0.1s' }} />
      <circle cx="82" cy="58" r="4" fill="hsl(252,30%,8%)" />
      <circle cx="122" cy="58" r="4" fill="hsl(252,30%,8%)" />
      {/* Mouth */}
      <path d="M 82 80 Q 100 92 118 80" fill="none" stroke="hsl(38,91%,50%)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Body */}
      <rect x="60" y="105" width="80" height="90" rx="15" fill="hsl(263,67%,66%)" />
      <rect x="75" y="115" width="50" height="30" rx="8" fill="hsl(252,30%,12%)" />
      {/* Festify text on chest */}
      <text x="83" y="135" fontSize="9" fill="hsl(38,91%,50%)" fontWeight="bold" fontFamily="Syne">F</text>
      {/* Arms */}
      <rect x="30" y="115" width="25" height="12" rx="6" fill="hsl(263,67%,66%)" />
      <rect x="145" y="110" width="25" height="12" rx="6" fill="hsl(263,67%,66%)" transform="rotate(-15 145 110)" />
      {/* Card in hand */}
      <rect x="155" y="90" width="30" height="40" rx="4" fill="hsl(0,78%,58%)" transform="rotate(-10 160 110)" />
      <text x="162" y="115" fontSize="12" transform="rotate(-10 160 110)">🌸</text>
      {/* Legs */}
      <rect x="72" y="198" width="18" height="30" rx="8" fill="hsl(263,67%,66%)" />
      <rect x="110" y="198" width="18" height="30" rx="8" fill="hsl(263,67%,66%)" />
      {/* Feet */}
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

export const FestifyBotSection = () => (
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
        {/* Bot */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <FestifyBotSVG />
          {/* Speech bubble */}
          <div className="mt-6 relative bg-card border border-border rounded-2xl px-6 py-4 max-w-xs">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l border-t border-border rotate-45" />
            <p className="text-sm font-body text-foreground/90">
              "I'll mint your card to the Avalanche blockchain in seconds! 🎉"
            </p>
          </div>
        </motion.div>

        {/* Mock minting UI */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-6 space-y-4"
        >
          <div className="h-40 rounded-xl bg-gradient-to-br from-violet to-avax flex items-center justify-center text-4xl">
            🌸
          </div>
          <div>
            <label className="text-xs text-muted-foreground font-body mb-1 block">Recipient Address</label>
            <div className="bg-secondary rounded-lg px-4 py-3 text-sm font-mono text-foreground/60">
              0x1234...abcd
            </div>
          </div>
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-avax to-violet text-foreground font-heading font-bold text-sm hover:opacity-90 transition-opacity">
            Mint & Send ✨
          </button>
        </motion.div>
      </div>

      {/* Steps */}
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
