const petalColors = [
  "bg-pink-400", "bg-purple-400", "bg-pink-300", "bg-amber-300",
  "bg-violet-400", "bg-rose-300", "bg-amber-400", "bg-fuchsia-300",
  "bg-pink-500", "bg-purple-300", "bg-rose-400", "bg-amber-200",
  "bg-violet-300", "bg-fuchsia-400", "bg-pink-200", "bg-purple-500",
];

const petals = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  color: petalColors[i % petalColors.length],
  left: `${(i * 6.25) + Math.random() * 3}%`,
  size: 6 + Math.random() * 10,
  duration: 12 + Math.random() * 16,
  delay: Math.random() * 20,
  reverse: i % 3 === 0,
}));

export const FloatingPetals = () => (
  <>
    {petals.map((p) => (
      <div
        key={p.id}
        className={`absolute rounded-full opacity-40 ${p.color} ${p.reverse ? 'animate-petal-fall-reverse' : 'animate-petal-fall'}`}
        style={{
          left: p.left,
          width: p.size,
          height: p.size * 1.4,
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
          borderRadius: '50% 50% 50% 0',
          filter: 'blur(1px)',
        }}
      />
    ))}
  </>
);
