import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import logo from "@/assets/festify-logo.png";

const innerAvatars = 4;
const middleAvatars = 6;
const outerAvatars = 8;

const seeds = [
  "Felix", "Luna", "Max", "Aria", "Leo", "Nova", "Kai", "Zoe",
  "Milo", "Ivy", "Oscar", "Ruby", "Finn", "Sage", "Rex", "Jade",
  "Axel", "Wren",
];

const Avatar = ({ seed, size = 36 }: { seed: string; size?: number }) => (
  <img
    src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`}
    alt={seed}
    width={size}
    height={size}
    className="rounded-full border-2 border-primary bg-card"
  />
);

const OrbitRing = ({
  radius,
  count,
  speed,
  clockwise,
  startIndex,
}: {
  radius: number;
  count: number;
  speed: number;
  clockwise: boolean;
  startIndex: number;
}) => (
  <div
    className={`absolute rounded-full border border-border/30 ${clockwise ? 'animate-orbit-cw' : 'animate-orbit-ccw'}`}
    style={{
      width: radius * 2,
      height: radius * 2,
      top: '50%',
      left: '50%',
      marginTop: -radius,
      marginLeft: -radius,
      animationDuration: `${speed}s`,
    }}
  >
    {Array.from({ length: count }).map((_, i) => {
      const angle = (360 / count) * i;
      return (
        <div
          key={i}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
            marginTop: -18,
            marginLeft: -18,
          }}
        >
          <div className={clockwise ? 'animate-orbit-ccw' : 'animate-orbit-cw'} style={{ animationDuration: `${speed}s` }}>
            <Avatar seed={seeds[startIndex + i]} />
          </div>
        </div>
      );
    })}
  </div>
);

const CountUp = ({ target }: { target: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export const AvatarShowcase = () => (
  <section className="relative py-24 overflow-hidden">
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-heading font-bold text-center mb-16"
      >
        Join the Festify Community
      </motion.h2>

      <div className="relative w-full flex justify-center" style={{ height: 400 }}>
        <div className="relative" style={{ width: 400, height: 400 }}>
          {/* Center logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <img src={logo} alt="Festify" className="w-16 h-16 rounded-xl" />
          </div>
          <OrbitRing radius={80} count={innerAvatars} speed={20} clockwise={true} startIndex={0} />
          <OrbitRing radius={130} count={middleAvatars} speed={30} clockwise={false} startIndex={4} />
          <OrbitRing radius={185} count={outerAvatars} speed={45} clockwise={true} startIndex={10} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-8"
      >
        <p className="text-5xl font-heading font-extrabold text-gold">
          <CountUp target={2400} />+
        </p>
        <p className="text-muted-foreground font-body mt-2">Collectors & Growing</p>
      </motion.div>
    </div>
  </section>
);
