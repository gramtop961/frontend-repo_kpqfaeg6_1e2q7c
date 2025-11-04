import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CosmicText from './CosmicText';

const Section = ({ children, index, colorFrom, colorTo }) => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6">
      {/* Decorative nebulas */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute -z-0 top-10 left-1/4 h-72 w-72 rounded-full blur-3xl bg-gradient-to-br ${colorFrom}`} />
        <div className={`absolute -z-0 bottom-10 right-1/4 h-80 w-80 rounded-full blur-3xl bg-gradient-to-tr ${colorTo}`} />
      </div>
      <div className="relative z-10 max-w-4xl text-center">
        {children}
      </div>
    </section>
  );
};

const PlanetFinale = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-6">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {/* Glowing planet */}
        <div className="relative">
          <div className="h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 blur-[2px]" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_60%)]" />
          <div className="absolute -inset-6 rounded-full blur-3xl bg-indigo-500/20" />
        </div>
      </div>
      <div className="relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
          <CosmicText text="FLAMES" className="text-5xl sm:text-6xl font-semibold tracking-[0.2em] text-white/90" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="mt-6 text-lg sm:text-xl text-white/70"
        >
          The universe is still expanding…
        </motion.p>
      </div>
    </section>
  );
};

const GalaxyScroller = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  const shift = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const hue = useTransform(scrollYProgress, [0, 1], [240, 300]);

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white">
      {/* Slow drifting star shimmer overlay */}
      <motion.div
        aria-hidden
        style={{ y: shift, filter: hue.to((h) => `hue-rotate(${h}deg)`) }}
        className="pointer-events-none absolute inset-0 opacity-40"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.10),transparent_45%)]" />
      </motion.div>

      <Section colorFrom="from-indigo-500/25 to-transparent" colorTo="from-fuchsia-500/20 to-transparent">
        <div className="space-y-6">
          <CosmicText text="You don’t click here — you drift." className="text-2xl sm:text-4xl font-medium" />
          <p className="text-white/70 max-w-2xl mx-auto">
            Scroll gently. The space around you shifts. Layers fold. Meanings form.
          </p>
        </div>
      </Section>

      <Section colorFrom="from-cyan-400/25 to-transparent" colorTo="from-purple-500/20 to-transparent">
        <div className="space-y-6">
          <CosmicText text="Constellations twist into intent." className="text-2xl sm:text-4xl font-medium" />
          <p className="text-white/70 max-w-2xl mx-auto">
            Ideas become signals, signals become structure. Code-shaped clouds breathe.
          </p>
        </div>
      </Section>

      <Section colorFrom="from-blue-500/20 to-transparent" colorTo="from-pink-500/20 to-transparent">
        <div className="space-y-6">
          <CosmicText text="This isn’t a site — it’s a mindscape." className="text-2xl sm:text-4xl font-medium" />
          <p className="text-white/70 max-w-2xl mx-auto">
            Quiet power. Infinite drift. A feeling more than a page.
          </p>
        </div>
      </Section>

      <PlanetFinale />

      {/* Infinite drift spacer */}
      <div className="h-[50vh]" />
    </div>
  );
};

export default GalaxyScroller;
