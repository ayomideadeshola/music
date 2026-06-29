import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const formatTime = (secs) => {
  if (!secs || isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const Playlist = () => {
  const location = useLocation();
  const selectedSong = location.state?.selectedSong;
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

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

  const handleSeekForward = () => {
    if (audioRef.current) audioRef.current.currentTime = Math.min(duration || 0, audioRef.current.currentTime + 10);
  };

  const handleSeekBackward = () => {
    if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * duration;
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col items-center justify-center p-6">
      {/* Back button */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors w-fit"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="text-sm font-semibold">Back to Home</span>
        </Link>
      </div>

      {selectedSong ? (
        <div className="w-full max-w-md bg-surface-container rounded-2xl p-8 shadow-2xl border border-outline-variant/30">
          {/* Album Art */}
          <div className="relative mx-auto w-64 h-64 rounded-2xl overflow-hidden shadow-2xl mb-8">
            <img
              className="w-full h-full object-cover"
              src={selectedSong.songImage}
              alt={selectedSong.songTitle}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Song Info */}
          <div className="text-center mb-6">
            <h2 className="font-bold text-2xl text-on-surface mb-1">{selectedSong.songTitle}</h2>
            <p className="text-on-surface-variant">{selectedSong.artistName}</p>
            {selectedSong.albumName && (
              <p className="text-sm text-on-surface-variant/60 mt-1">{selectedSong.albumName}</p>
            )}
          </div>

          {/* Action icons */}
          <div className="flex justify-around items-center mb-6 text-on-surface-variant">
            <button className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined">favorite</span>
            </button>
            <button className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined">playlist_add</span>
            </button>
            <button className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined">download</span>
            </button>
            <button className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>

          <audio
            ref={audioRef}
            src={selectedSong.songUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Progress bar */}
          <div className="mb-6">
            <div
              className="w-full h-1.5 bg-outline-variant/30 rounded-full cursor-pointer relative group mb-2"
              onClick={handleSeek}
            >
              <div
                className="absolute left-0 top-0 bottom-0 bg-primary rounded-full"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2"
                style={{ left: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-on-surface-variant font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-10">
            <button
              onClick={handleSeekBackward}
              className="text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">skip_previous</span>
            </button>
            <button
              onClick={handlePlayPause}
              className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-primary/20"
            >
              <span
                className="material-symbols-outlined text-3xl"
                style={{ fontVariationSettings: "'FILL' 1", fontSize: "32px" }}
              >
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
            <button
              onClick={handleSeekForward}
              className="text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">skip_next</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <span className="material-symbols-outlined text-on-surface-variant block mb-4" style={{ fontSize: "64px" }}>music_off</span>
          <p className="text-on-surface-variant mb-6">No song selected</p>
          <Link to="/" className="text-primary hover:underline text-sm font-semibold">
            ← Go to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Playlist;
