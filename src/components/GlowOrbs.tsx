const orbs = [
  { size: 300, top: '10%', left: '5%', color: 'bg-violet', duration: 10, delay: 0 },
  { size: 200, top: '60%', left: '80%', color: 'bg-avax', duration: 14, delay: 2 },
  { size: 250, top: '80%', left: '20%', color: 'bg-primary', duration: 12, delay: 4 },
  { size: 180, top: '30%', left: '70%', color: 'bg-gold', duration: 16, delay: 1 },
  { size: 220, top: '50%', left: '40%', color: 'bg-violet', duration: 11, delay: 3 },
];

export const GlowOrbs = () => (
  <>
    {orbs.map((orb, i) => (
      <div
        key={i}
        className={`absolute rounded-full ${orb.color} opacity-[0.07] animate-orb-drift`}
        style={{
          width: orb.size,
          height: orb.size,
          top: orb.top,
          left: orb.left,
          filter: 'blur(80px)',
          animationDuration: `${orb.duration}s`,
          animationDelay: `${orb.delay}s`,
        }}
      />
    ))}
  </>
);
