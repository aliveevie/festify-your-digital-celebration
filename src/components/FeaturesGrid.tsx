import { motion } from "framer-motion";

const features = [
  { icon: "🎁", title: "NFT Greeting Cards", desc: "Mint personalized cards as NFTs, owned forever" },
  { icon: "⚡", title: "Avalanche Speed", desc: "Sub-second finality, near-zero fees" },
  { icon: "🤖", title: "FestifyBot AI", desc: "AI designs and mints your card automatically" },
  { icon: "🌸", title: "Beautiful Templates", desc: "100+ occasion templates for every moment" },
  { icon: "🔗", title: "Cross-Chain Ready", desc: "Base and Avalanche support built-in" },
  { icon: "🎉", title: "18K+ Minted", desc: "A growing community of joy senders" },
];

export const FeaturesGrid = () => (
  <section className="relative py-24 blockchain-grid">
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-heading font-bold text-center mb-16"
      >
        Why Festify?
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(263,67%,66%,0.15)]"
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-lg font-heading font-bold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
