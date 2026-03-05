import logo from "@/assets/festify-logo.png";

export const Footer = () => (
  <footer className="relative border-t border-border bg-card/50">
    {/* Flower border */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-violet to-gold" />

    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-3">
          <img src={logo} alt="Festify" className="w-12 h-12 rounded-xl" />
          <p className="text-sm text-muted-foreground font-body italic">"Send joy, forever onchain"</p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-body">Twitter/X</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-body">Discord</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-body">GitHub</a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="text-sm font-body text-avax font-semibold">Built on Avalanche ⚡</span>
          <span className="text-xs text-muted-foreground font-body">18,000+ NFTs Minted on Base & Avalanche</span>
        </div>
      </div>

      <div className="mt-12 text-center text-xs text-muted-foreground font-body">
        © 2026 Festify. All rights reserved.
      </div>
    </div>
  </footer>
);
