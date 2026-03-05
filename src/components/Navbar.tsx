import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/festify-logo.png";

const navLinks = ["Home", "Gallery", "Mint", "About"];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <a href="#" className="flex-shrink-0">
            <img src={logo} alt="Festify" className="h-10 w-10 rounded-lg" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors font-body"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity font-body">
              Connect Wallet
            </button>
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-72 z-50 glass-nav p-8 flex flex-col gap-6 pt-20"
          >
            <button
              className="absolute top-5 right-5 text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              <X size={24} />
            </button>
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-lg font-heading font-semibold text-foreground/80 hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}
            <button className="mt-4 px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold font-body">
              Connect Wallet
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
