import React from "react";

export function PortfolioHero() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {/* Centered Main Name - Scaled responsively to prevent overflow/wrapping */}
      <div className="w-full text-center">
        <h1 
          className="font-bold text-[16vw] sm:text-[14vw] md:text-[10rem] leading-[0.8] tracking-tighter uppercase text-white select-none flex justify-center overflow-hidden" 
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          AKASH
        </h1>
        <h1 
          className="font-bold text-[16vw] sm:text-[14vw] md:text-[10rem] leading-[0.8] tracking-tighter uppercase text-white select-none flex justify-center overflow-hidden" 
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          TIWARI
        </h1>
      </div>

      {/* Tagline - Custom Antic font */}
      <div className="mt-12 sm:mt-16 text-center w-full px-4 max-w-4xl mx-auto relative z-20">
        <p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-400 tracking-wide" 
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          BUILDING COMPLETE SYSTEMS FROM UI FLOW TO BACKEND.
        </p>
      </div>
    </div>
  );
}