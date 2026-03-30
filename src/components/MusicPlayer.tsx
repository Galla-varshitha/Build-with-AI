import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "Cyberpunk Dreams",
    artist: "AI Synth",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "neon-blue"
  },
  {
    id: 2,
    title: "Neon Nights",
    artist: "Digital Pulse",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "neon-pink"
  },
  {
    id: 3,
    title: "Retro Future",
    artist: "Wave Generator",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "neon-purple"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.log("Audio play blocked", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleEnded = () => {
    skipForward();
  };

  return (
    <div className="w-full max-w-md bg-black/60 backdrop-blur-xl p-6 rounded-2xl neon-box-purple flex flex-col gap-4 ring-4 ring-neon-purple/20">
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-lg bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center shadow-lg animate-pulse-neon`}>
          <Music className="text-white w-8 h-8" />
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-lg font-display neon-text-blue truncate">{currentTrack.title}</h3>
          <p className="text-sm text-white/60 truncate">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-neon-purple shadow-[0_0_10px_#bc13fe] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-tighter">
          <span>{isPlaying ? 'Streaming' : 'Paused'}</span>
          <span>Track {currentTrackIndex + 1} / {TRACKS.length}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8">
        <button onClick={skipBackward} className="text-white/60 hover:text-neon-blue transition-colors">
          <SkipBack size={24} />
        </button>
        <button 
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-white/5 neon-border flex items-center justify-center hover:bg-white/10 transition-all group"
        >
          {isPlaying ? (
            <Pause size={28} className="text-neon-pink group-hover:scale-110 transition-transform" />
          ) : (
            <Play size={28} className="ml-1 text-neon-blue group-hover:scale-110 transition-transform" />
          )}
        </button>
        <button onClick={skipForward} className="text-white/60 hover:text-neon-blue transition-colors">
          <SkipForward size={24} />
        </button>
      </div>

      <div className="flex items-center gap-2 text-white/40 justify-center">
        <Volume2 size={14} />
        <div className="w-20 h-1 bg-white/10 rounded-full">
          <div className="w-2/3 h-full bg-white/40 rounded-full" />
        </div>
      </div>
    </div>
  );
}
