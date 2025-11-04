import React, { useEffect, useRef } from 'react';

// Subtle generative ambience using Web Audio API. Starts on first user interaction.
const AmbientAudio = () => {
  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const noiseGainRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const start = async () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      ctxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.value = 0.05; // very subtle
      gainRef.current = master;
      master.connect(ctx.destination);

      // Pad: two detuned sines through a gentle filter
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const padGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.value = 110; // A2
      osc2.frequency.value = 111.5; // slight beat
      padGain.gain.value = 0.15;

      osc1.connect(padGain);
      osc2.connect(padGain);
      padGain.connect(filter);
      filter.connect(master);

      osc1.start();
      osc2.start();

      // Noise layer: filtered for airy texture
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 800;
      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.02;
      noiseGainRef.current = noiseGain;

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(master);
      noise.start();

      // React to motion subtly: mouse X/Y modulate gains and filter
      const onMove = (e) => {
        if (!ctxRef.current) return;
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        const targetPad = 0.08 + x * 0.12; // 0.08 - 0.2
        const targetNoise = 0.01 + (1 - y) * 0.03; // 0.01 - 0.04
        const targetFreq = 800 + (x - 0.5) * 600; // 500 - 1100
        noiseGain.gain.linearRampToValueAtTime(targetNoise, ctx.currentTime + 0.2);
        padGain.gain.linearRampToValueAtTime(targetPad, ctx.currentTime + 0.2);
        filter.frequency.linearRampToValueAtTime(Math.max(300, targetFreq), ctx.currentTime + 0.3);
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('scroll', () => {
        if (!ctxRef.current) return;
        const t = (window.scrollY % 500) / 500;
        const bump = 0.02 * Math.sin(t * Math.PI * 2);
        master.gain.linearRampToValueAtTime(0.05 + bump, ctx.currentTime + 0.2);
      });

      // Cleanup on unmount
      return () => {
        window.removeEventListener('pointermove', onMove);
        try { ctx.close(); } catch {}
        ctxRef.current = null;
      };
    };

    const resumeOnInteract = async () => {
      if (startedRef.current) return;
      await start();
    };

    const events = ['pointerdown', 'pointermove', 'wheel', 'touchstart'];
    events.forEach((ev) => window.addEventListener(ev, resumeOnInteract, { once: true }));

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, resumeOnInteract));
    };
  }, []);

  return null; // no UI
};

export default AmbientAudio;
