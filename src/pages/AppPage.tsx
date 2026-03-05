import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { WalletGate } from "@/components/WalletGate";
import { useNavigate } from "react-router-dom";

const quickActions = [
  { emoji: "🎨", title: "Mint a Card", desc: "Create & send an NFT greeting card", path: "/mint" },
  { emoji: "🖼️", title: "My Collection", desc: "View cards you've minted & received", path: null },
  { emoji: "🤖", title: "FestifyBot", desc: "Let AI design your card", path: null },
  { emoji: "📊", title: "Activity", desc: "Recent mints & transfers", path: null },
];

const recentCards = [
  { emoji: "🎂", label: "Birthday Card #1842", time: "2 min ago", gradient: "from-pink-500 to-purple-600" },
  { emoji: "🎓", label: "Graduation #1841", time: "15 min ago", gradient: "from-amber-400 to-orange-500" },
  { emoji: "💝", label: "Love Card #1840", time: "1 hr ago", gradient: "from-rose-400 to-pink-500" },
  { emoji: "🎄", label: "Holiday Card #1839", time: "3 hrs ago", gradient: "from-emerald-500 to-teal-600" },
];

const AppPage = () => {
  const navigate = useNavigate();

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
              Welcome to <span className="text-primary">Festify</span> 🌸
            </h1>
            <p className="text-muted-foreground font-body text-lg">
              Your dashboard for minting and managing NFT greeting cards on Avalanche
            </p>
          </motion.div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {quickActions.map((a, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => a.path && navigate(a.path)}
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
            className="bg-card border border-border rounded-2xl p-6 mb-12 flex flex-wrap justify-around gap-4"
          >
            <div className="text-center">
              <div className="text-2xl font-heading font-extrabold text-primary">0</div>
              <div className="text-xs text-muted-foreground font-body">Cards Minted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-extrabold text-primary">0</div>
              <div className="text-xs text-muted-foreground font-body">Cards Received</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-extrabold text-avax">Avalanche</div>
              <div className="text-xs text-muted-foreground font-body">Network</div>
            </div>
          </motion.div>

          {/* Recent activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-heading font-bold mb-4">Recent Community Mints 🔥</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {recentCards.map((card, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-2xl shrink-0`}>
                    {card.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-semibold text-sm truncate">{card.label}</p>
                    <p className="text-xs text-muted-foreground font-body">{card.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
    </WalletGate>
  );
};

export default AppPage;
