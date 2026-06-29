import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary tracking-tighter mb-2">Aura</h1>
        <p className="text-xs text-on-surface-variant opacity-70 mb-10 uppercase tracking-widest">Premium Audio</p>
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default Loading;
