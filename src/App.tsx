import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Trophy, Gamepad2, Music as MusicIcon } from 'lucide-react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-pink/10 blur-[120px] rounded-full pointer-events-none" />
      
      <header className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between mb-8 gap-4 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 neon-border rounded-lg bg-black/40">
            <Gamepad2 className="text-neon-blue w-6 h-6" />
          </div>
          <h1 className="text-6xl md:text-8xl font-digital tracking-tighter neon-text-blue animate-glitch">
            NEON<span className="text-neon-pink">SNAKE</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-display">High Score</span>
            <div className="flex items-center gap-2">
              <Trophy className="text-neon-green w-4 h-4" />
              <span className="text-6xl font-digital neon-text-green animate-glitch">0000</span>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-white/10" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-display">Current Score</span>
            <span className="text-6xl font-digital neon-text-blue animate-glitch">{score.toString().padStart(4, '0')}</span>
          </div>
        </div>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10">
        {/* Left Sidebar - Info */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
          <div className="p-6 bg-black/40 backdrop-blur-md rounded-2xl neon-box-pink ring-4 ring-neon-pink/20">
            <h2 className="text-xs font-display uppercase tracking-widest text-neon-pink mb-4">Instructions</h2>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex gap-2">
                <span className="text-neon-blue">↑↓←→</span>
                <span>Navigate Snake</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neon-blue">SPACE</span>
                <span>Pause / Resume</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neon-pink">FOOD</span>
                <span>Grows Snake</span>
              </li>
            </ul>
          </div>
          
          <div className="p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5">
            <h2 className="text-xs font-display uppercase tracking-widest text-white/40 mb-4">System Status</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px]">
                <span>CPU LOAD</span>
                <span className="text-neon-green">12%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[12%] bg-neon-green shadow-[0_0_5px_#39ff14]" />
              </div>
            </div>
          </div>
        </div>

        {/* Center - Game */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-pink rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <SnakeGame onScoreChange={setScore} />
          </div>
          
          <div className="mt-8 lg:hidden w-full">
            <MusicPlayer />
          </div>
        </div>

        {/* Right Sidebar - Music (Desktop) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <MusicIcon className="text-neon-purple w-4 h-4" />
            <h2 className="text-xs font-display uppercase tracking-widest text-neon-purple">Audio Core</h2>
          </div>
          <MusicPlayer />
          
          <div className="p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5">
            <h2 className="text-xs font-display uppercase tracking-widest text-white/40 mb-4">Visualizer</h2>
            <div className="flex items-end gap-1 h-12">
              {[40, 70, 45, 90, 65, 30, 85, 50, 75, 40].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-neon-purple/40 rounded-t-sm animate-pulse"
                  style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-[10px] text-white/20 uppercase tracking-[0.5em] font-display z-10">
        &copy; 2026 NEON BEATS PROTOCOL // V1.0.4
      </footer>
    </div>
  );
}
