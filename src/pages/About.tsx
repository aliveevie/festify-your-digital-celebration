import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundEffects } from "@/components/BackgroundEffects";

const stats = [
  { value: "18,000+", label: "NFTs Minted" },
  { value: "2,400+", label: "Collectors" },
  { value: "2", label: "Chains Supported" },
  { value: "<1s", label: "Mint Time" },
];

const team = [
  { name: "Festify Team", role: "Building joy onchain", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=festify" },
];

const About = () => (
  <div className="relative min-h-screen bg-background overflow-hidden">
    <BackgroundEffects />
    <Navbar />
    <main className="relative z-10 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6">
            About <span className="text-primary">Festify</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto">
            Festify is the world's first NFT greeting card platform — transforming how we celebrate moments by making them permanent, beautiful, and onchain.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="text-3xl font-heading font-extrabold text-primary">{s.value}</div>
              <div className="text-sm text-muted-foreground font-body mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-2xl p-8 md:p-12 mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-center">Our Mission</h2>
          <div className="space-y-4 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <p>
              Every year, billions of greeting cards are sent — but they fade, get lost, or thrown away. We believe moments of joy deserve to last forever.
            </p>
            <p>
              Festify uses the power of <span className="text-avax font-semibold">Avalanche</span> blockchain to turn greeting cards into permanent, ownable NFTs. With sub-second finality and near-zero gas fees, sending a card onchain is as easy as sending a text.
            </p>
            <p>
              Our AI-powered <span className="text-primary font-semibold">FestifyBot</span> helps you design and mint beautiful cards in seconds — no crypto experience needed.
            </p>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", icon: "🎨", title: "Design", desc: "Choose a template or let AI create one" },
              { step: "2", icon: "🤖", title: "FestifyBot", desc: "AI reviews and enhances your card" },
              { step: "3", icon: "⛓️", title: "Mint NFT", desc: "Minted on Avalanche in under 1 second" },
              { step: "4", icon: "🎁", title: "Deliver", desc: "Sent to recipient's wallet forever" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-xs text-primary font-heading font-bold mb-1">STEP {item.step}</div>
                <h3 className="text-lg font-heading font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Chains */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-heading font-bold mb-4">Supported Networks</h2>
          <div className="flex justify-center gap-6">
            <div className="bg-card border border-border rounded-2xl px-8 py-4 flex items-center gap-3">
              <span className="text-avax font-heading font-bold">⚡ Avalanche</span>
            </div>
            <div className="bg-card border border-border rounded-2xl px-8 py-4 flex items-center gap-3">
              <span className="text-primary font-heading font-bold">🔵 Base</span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
    <Footer />
  </div>
);

export default About;
