import { FloatingPetals } from "./FloatingPetals";
import { GlowOrbs } from "./GlowOrbs";

export const BackgroundEffects = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <FloatingPetals />
    <GlowOrbs />
  </div>
);
