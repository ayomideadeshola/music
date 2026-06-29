import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 flex flex-col p-6 overflow-y-auto bg-surface-container-lowest border-r border-outline-variant hidden md:flex z-50">
      <div className="mb-16">
        <span className="text-2xl font-bold text-primary tracking-tighter">Aura</span>
        <p className="text-xs text-on-surface-variant opacity-70 mt-1">Premium Audio</p>
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        <Link
          to="/"
          className="flex items-center gap-4 p-2 text-primary font-bold transition-colors duration-200 text-sm"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span>Home</span>
        </Link>
        <a
          href="#"
          className="flex items-center gap-4 p-2 text-on-surface-variant hover:text-primary transition-colors duration-200 text-sm"
        >
          <span className="material-symbols-outlined">search</span>
          <span>Search</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-4 p-2 text-on-surface-variant hover:text-primary transition-colors duration-200 text-sm"
        >
          <span className="material-symbols-outlined">library_music</span>
          <span>Library</span>
        </a>

        <div className="mt-10">
          <button className="w-full py-4 px-6 bg-primary-container text-on-primary-container rounded-xl text-xs font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>add</span>
            Create Playlist
          </button>
        </div>

        <div className="mt-16 flex flex-col gap-2">
          <p className="text-xs text-on-surface-variant uppercase tracking-widest px-2 mb-1">Your Music</p>
          <a
            href="#"
            className="flex items-center gap-4 p-2 text-on-surface-variant hover:text-primary transition-colors text-xs"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>favorite</span>
            Liked Songs
          </a>
          <a
            href="#"
            className="flex items-center gap-4 p-2 text-on-surface-variant hover:text-primary transition-colors text-xs"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>auto_awesome</span>
            Discover Weekly
          </a>
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-outline-variant flex items-center gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            src="https://img.freepik.com/premium-photo/candid-shot-excited-young-african-man-party-with-headphones-beautiful-generative-ai-aig32_31965-210599.jpg?w=100"
            alt="User"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-on-surface font-bold truncate">User Profile</span>
          <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Premium Plan</span>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
