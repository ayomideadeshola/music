import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import Home from "./Home";

const formatTime = (secs) => {
  if (!secs || isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const Owlpage = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handleSelectSong = (song) => {
    if (currentSong?.songUrl === song.songUrl) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentSong(song);
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
    }
  };

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.songUrl;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [currentSong]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipPrev = () => {
    if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };

  const handleSkipNext = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.duration || 0,
        audioRef.current.currentTime + 10
      );
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * duration;
  };

  return (
    <div className="flex min-h-screen bg-surface-container-lowest">
      <Navbar />

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <main className={`flex-1 flex flex-col min-h-screen md:ml-64 relative ${currentSong ? "pb-24" : "pb-16 md:pb-0"}`}>
        <Home
          onSelectSong={handleSelectSong}
          currentSong={currentSong}
          isPlaying={isPlaying}
        />

        <footer className="flex flex-col md:flex-row justify-between items-center px-6 py-4 border-t border-outline-variant bg-surface-container-lowest mt-auto">
          <span className="text-xs text-on-surface font-bold mb-3 md:mb-0">© 2024 Aura Music</span>
          <div className="flex gap-6">
            {["Legal", "Privacy", "Cookies", "About"].map((link) => (
              <a key={link} href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </div>
        </footer>
      </main>

      {/* Bottom Nav — mobile only */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-16 md:hidden bg-surface-container-highest z-50 rounded-t-xl shadow-[0_-4px_12px_rgba(0,0,0,0.4)]">
        <a href="#" className="flex flex-col items-center justify-center text-primary text-xs gap-1">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "22px" }}>home</span>
          <span>Home</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant text-xs gap-1">
          <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>search</span>
          <span>Search</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant text-xs gap-1">
          <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>library_music</span>
          <span>Library</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant text-xs gap-1">
          <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>workspace_premium</span>
          <span>Premium</span>
        </a>
      </nav>

      {/* Persistent Player Bar */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-surface-container/95 backdrop-blur-xl border-t border-outline-variant z-[60] flex items-center justify-between px-6 md:px-10">
          {/* Track info */}
          <div className="flex items-center gap-4 w-1/3 min-w-0">
            <div className="w-14 h-14 bg-surface-container-high rounded-lg overflow-hidden flex-shrink-0 border border-outline-variant/30">
              <img className="w-full h-full object-cover" src={currentSong.songImage} alt={currentSong.songTitle} />
            </div>
            <div className="hidden sm:block truncate">
              <h4 className="font-bold text-on-surface text-sm truncate">{currentSong.songTitle}</h4>
              <p className="text-xs text-on-surface-variant truncate">{currentSong.artistName}</p>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors ml-2">
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>favorite</span>
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-1 w-full max-w-xl">
            <div className="flex items-center gap-6">
              <button onClick={handleSkipPrev} className="text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">skip_previous</span>
              </button>
              <button
                onClick={handlePlayPause}
                className="w-10 h-10 bg-on-surface text-surface rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isPlaying ? "pause" : "play_arrow"}
                </span>
              </button>
              <button onClick={handleSkipNext} className="text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">skip_next</span>
              </button>
            </div>
            <div className="w-full flex items-center gap-2 group">
              <span className="text-[10px] text-on-surface-variant font-mono">{formatTime(currentTime)}</span>
              <div
                className="flex-1 h-1 bg-outline-variant/30 rounded-full relative cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 bg-primary rounded-full"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2"
                  style={{ left: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] text-on-surface-variant font-mono">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center justify-end gap-4 w-1/3">
            <button className="text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">playlist_play</span>
            </button>
            <button className="text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">devices</span>
            </button>
            <div className="flex items-center gap-2 w-32">
              <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "18px" }}>volume_up</span>
              <div className="flex-1 h-1 bg-outline-variant/30 rounded-full">
                <div className="h-full bg-on-surface-variant rounded-full" style={{ width: "70%" }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Owlpage;
