import { motion } from "framer-motion";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundEffects } from "@/components/BackgroundEffects";

export const WalletGate = ({ children }: { children: React.ReactNode }) => {
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();

  if (isConnected) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10 pt-24 pb-20 flex items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="text-7xl mb-6">🔒</div>
          <h2 className="text-3xl font-heading font-extrabold mb-3">
            Connect Your Wallet
          </h2>
          <p className="text-muted-foreground font-body text-lg mb-8">
            You need to connect your wallet to access this page and interact with the app.
          </p>
          <button
            onClick={() => open()}
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-heading font-bold hover:opacity-90 transition-opacity"
          >
            Connect Wallet
          </button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};
