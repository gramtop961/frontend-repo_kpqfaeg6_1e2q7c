import React from 'react';
import HeroUniverse from './components/HeroUniverse';
import GalaxyScroller from './components/GalaxyScroller';
import AmbientAudio from './components/AmbientAudio';

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white selection:bg-fuchsia-500/30 selection:text-white/90">
      <AmbientAudio />
      <HeroUniverse />
      <GalaxyScroller />
    </div>
  );
}

export default App;
