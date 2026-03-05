import { motion } from "framer-motion";

const cards = [
  { gradient: "from-pink-500 to-rose-600", label: "🎂 Birthday", title: "Happy Birthday!" },
  { gradient: "from-purple-500 to-indigo-600", label: "💍 Anniversary", title: "Our Love" },
  { gradient: "from-amber-400 to-orange-500", label: "🎓 Graduation", title: "Congrats Grad!" },
  { gradient: "from-emerald-400 to-teal-500", label: "🎄 Holiday", title: "Season's Joy" },
  { gradient: "from-violet-500 to-purple-600", label: "👶 Baby", title: "Welcome Baby!" },
  { gradient: "from-rose-400 to-pink-600", label: "💝 Valentine", title: "Be Mine" },
  { gradient: "from-blue-400 to-indigo-500", label: "🏠 New Home", title: "New Beginnings" },
  { gradient: "from-cyan-400 to-blue-500", label: "🎊 Celebration", title: "Let's Party!" },
  { gradient: "from-fuchsia-500 to-pink-500", label: "👩‍❤️‍👨 Wedding", title: "Forever Yours" },
  { gradient: "from-yellow-400 to-amber-500", label: "⭐ Thank You", title: "Thanks!" },
  { gradient: "from-red-500 to-rose-600", label: "🌹 Mother's Day", title: "Love You Mom" },
  { gradient: "from-sky-400 to-blue-600", label: "👔 Father's Day", title: "Best Dad Ever" },
];

const doubledCards = [...cards, ...cards];

export const GallerySection = () => (
  <section id="gallery" className="relative py-24 overflow-hidden">
    <div className="container mx-auto px-4 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <span className="inline-block px-4 py-2 rounded-full bg-avax/10 text-avax text-sm font-bold font-body mb-4">
          18,000+ Cards Minted on Base & Avalanche 🔥
        </span>
        <h2 className="text-4xl md:text-5xl font-heading font-bold">NFT Card Gallery</h2>
      </motion.div>
    </div>

    {/* Infinite scroll */}
    <div className="relative w-full overflow-hidden">
      <div className="flex gap-6 animate-scroll-gallery" style={{ width: 'max-content' }}>
        {doubledCards.map((card, i) => (
          <div
            key={i}
            className="card-3d flex-shrink-0 w-48 h-64 rounded-2xl bg-gradient-to-br shadow-xl flex flex-col items-center justify-center gap-3 cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
            }}
          >
            <div className={`w-48 h-64 rounded-2xl bg-gradient-to-br ${card.gradient} flex flex-col items-center justify-center gap-3 p-4`}>
              <span className="text-4xl">{card.label.split(" ")[0]}</span>
              <span className="text-sm font-heading font-bold text-foreground/90">{card.title}</span>
              <span className="text-[10px] bg-background/20 backdrop-blur-sm px-2 py-1 rounded-full font-body text-foreground/80">
                {card.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
