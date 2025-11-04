import React from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const HeroUniverse = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft color fogs for depth - do not block interactions */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/20" />
        <div className="absolute -right-16 top-1/3 h-72 w-72 rounded-full blur-3xl bg-gradient-to-tr from-cyan-400/20 to-purple-500/20" />
        <div className="absolute left-1/4 bottom-0 h-64 w-64 rounded-full blur-3xl bg-gradient-to-tl from-blue-500/20 to-pink-500/20" />
      </div>

      {/* Centered statement */}
      <div className="pointer-events-none relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl tracking-wide font-medium text-white/90 drop-shadow-[0_0_25px_rgba(124,58,237,0.35)]">
            Create an immersive, dark, reactive space
          </h1>
          <p className="mt-4 text-white/70 text-base sm:text-lg md:text-xl">
            An infinite particle universe that unfolds as you scroll — motion, text, and depth blending into calm power and silent dominance.
          </p>
        </motion.div>
      </div>

      {/* Subtle bottom haze */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
    </section>
  );
};

export default HeroUniverse;
