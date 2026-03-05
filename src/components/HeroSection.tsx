import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const heroText = "Send Joy Forever. Onchain.";

const cardMockups = [
  { gradient: "from-pink-500 to-purple-600", label: "🎂 Birthday", rotation: -8, x: -120, y: 60 },
  { gradient: "from-amber-400 to-orange-500", label: "🎓 Graduation", rotation: 6, x: 100, y: -40 },
  { gradient: "from-violet-500 to-indigo-600", label: "💍 Anniversary", rotation: -4, x: -80, y: -80 },
  { gradient: "from-rose-400 to-pink-500", label: "💝 Love", rotation: 10, x: 140, y: 80 },
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
      {/* Blockchain grid */}
      <div className="absolute inset-0 blockchain-grid" />

      {/* Floating NFT cards */}
      <div className="absolute inset-0 hidden lg:block">
        {cardMockups.map((card, i) => (
          <motion.div
            key={i}
            className={`absolute w-36 h-48 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-2xl flex items-end p-3`}
            style={{
              top: `${45 + card.y / 5}%`,
              left: `${50 + card.x / 3}%`,
              rotate: card.rotation,
            }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs font-bold font-body text-background/90 bg-background/20 backdrop-blur-sm px-2 py-1 rounded-full">
              {card.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Letter-by-letter heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold leading-tight mb-6">
          {heroText.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
              className={char === "." ? "text-avax" : "text-foreground"}
              style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body"
        >
          The world's first NFT greeting card platform on Avalanche — mint, send, and treasure moments forever
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="relative inline-block"
        >
          <button
            onClick={handleCTA}
            className="relative px-10 py-4 rounded-full bg-gradient-to-r from-avax to-violet text-foreground font-heading font-bold text-lg animate-glow-pulse hover:scale-105 transition-transform"
          >
            Enter the App →
          </button>
        </motion.div>

        {/* Confetti */}
        {confetti && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: ['#E84142', '#8B5CF6', '#F59E0B', '#EC4899', '#A855F7'][i % 5],
                  animation: `confetti-pop ${0.8 + Math.random() * 0.5}s ease-out forwards`,
                  left: `${40 + Math.random() * 20}%`,
                  top: '50%',
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: `${Math.random() * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
