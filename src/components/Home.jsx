import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GENRES = [
  { name: "Pop",     bg: "#a078ff", emoji: "🎵" },
  { name: "Chill",   bg: "#2D46B9", emoji: "🌊" },
  { name: "Focus",   bg: "#E8115B", emoji: "🎯" },
  { name: "Workout", bg: "#1E3264", emoji: "💪" },
  { name: "Afrobeat",bg: "#148A08", emoji: "🥁" },
  { name: "Hip-Hop", bg: "#8B4513", emoji: "🎤" },
];

const TABS = ["All", "Songs", "Artists", "Albums", "Playlists"];

const Home = ({ onSelectSong, currentSong, isPlaying }) => {
  const [apidata, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://robo-music-api.onrender.com/music/my-api")
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const gotoPlayList = (song) => {
    navigate("/playlist", { state: { selectedSong: song } });
  };

  const filteredSongs = apidata.filter((song) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      song.artistName?.toLowerCase().includes(q) ||
      song.songTitle?.toLowerCase().includes(q) ||
      song.albumName?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* Top Header */}
      <header className="flex justify-between items-center px-6 py-4 w-full z-40 sticky top-0 bg-background/80 backdrop-blur-md border-b border-outline-variant/20">
        <div className="flex items-center gap-6 flex-1">
          <div className="relative w-full max-w-xl">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: "20px" }}>
              search
            </span>
            <input
              className="w-full h-12 pl-12 pr-4 glass-search rounded-full text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface-variant/50"
              placeholder="Artists, songs, or albums"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 ml-6">
          <button className="hover:bg-surface-container-high rounded-full p-2 transition-all duration-300 text-on-background">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="hover:bg-surface-container-high rounded-full p-2 transition-all duration-300 text-on-background">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      {/* Page Content */}
      <div className="p-6 md:p-10 space-y-10">

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Browse All — Genre Grid */}
        {!searchQuery && (
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="font-bold text-2xl text-on-surface">Browse All</h2>
              <a href="#" className="text-xs text-primary hover:underline">Show All</a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {GENRES.map((genre) => (
                <div
                  key={genre.name}
                  className="genre-card relative overflow-hidden rounded-xl p-4 cursor-pointer"
                  style={{ backgroundColor: genre.bg }}
                >
                  <span className="font-bold text-lg text-white relative z-10 block">{genre.name}</span>
                  <span className="absolute right-3 bottom-3 text-4xl opacity-40 select-none">{genre.emoji}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Songs Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="font-bold text-2xl text-on-surface">
              {searchQuery ? "Search Results" : "Trending Songs"}
            </h2>
            {!searchQuery && (
              <a href="#" className="text-xs text-primary hover:underline">Show All</a>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : filteredSongs.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant block mb-4">music_off</span>
              <p className="text-on-surface-variant text-sm">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant text-xs text-on-surface-variant uppercase tracking-widest">
                    <th className="px-6 py-3 w-12 text-center">#</th>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3 hidden md:table-cell">Album</th>
                    <th className="px-6 py-3 text-right">
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>schedule</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-on-surface">
                  {filteredSongs.map((song, index) => {
                    const isActive = currentSong?.songUrl === song.songUrl;
                    return (
                      <tr
                        key={index}
                        className="track-row group cursor-pointer transition-colors"
                        onClick={() => onSelectSong(song)}
                      >
                        <td className="px-6 py-3 text-center text-on-surface-variant">
                          {isActive ? (
                            <span
                              className="material-symbols-outlined text-primary"
                              style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px" }}
                            >
                              {isPlaying ? "pause" : "play_arrow"}
                            </span>
                          ) : (
                            <>
                              <span className="group-hover:hidden">{index + 1}</span>
                              <span
                                className="material-symbols-outlined hidden group-hover:inline text-primary"
                                style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px" }}
                              >
                                play_arrow
                              </span>
                            </>
                          )}
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-surface-container-high rounded overflow-hidden flex-shrink-0">
                              <img
                                className="w-full h-full object-cover"
                                src={song.songImage}
                                alt={song.songTitle}
                              />
                            </div>
                            <div>
                              <p className={`font-bold text-sm ${isActive ? "text-primary" : ""}`}>{song.songTitle}</p>
                              <p className="text-xs text-on-surface-variant">{song.artistName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-3 hidden md:table-cell text-on-surface-variant text-sm">
                          {song.albumName}
                        </td>
                        <td className="px-6 py-3 text-right">
                          <button
                            onClick={(e) => { e.stopPropagation(); gotoPlayList(song); }}
                            className="text-on-surface-variant hover:text-primary transition-colors"
                            title="Open full player"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>open_in_new</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
