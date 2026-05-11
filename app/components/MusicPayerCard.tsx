"use client"

import { useRef, useState } from "react";

export default function MusicPlayerCard() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-72.5 rounded-[22px] overflow-hidden bg-[#ffffff] shadow-2xl " >

        {/* Music Cover */}
        <div className="relative h-57.5 " >
            <img
                src={"public/globe.svg"}
                alt={"Dummy ALT"}
                className="w-full h-full object-cover"
            />

            <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-sm shadow " >
                :
            </button>
        </div>

        {/* Music Info */}
        <div className="px-5 pt-4 flex items-center justify-between " >
            <span className="text-sm text-black" >Back</span>

            <div className="text-center">
                <h2 className="text-[16px] font-semibold text-black ">
                    Music Title
                </h2>
                <p className="text-[11px] text-black/60 mt-1 " >
                    Music Artist
                </p>
            </div>
            <span className="text-sm text-black " >Love</span>
        </div>

        {/* Progress */}
        <div className="px-5 mt-4" >
            <input
                type="range"
                min={0}
                max={100}
                className="w-full accent-black cursor-pointer "
            />

            <div className="flex justify-between text-[10px] text-black/60 mt-1 " >
                <span>Progress</span>
                <span>Duration</span>
            </div>
        </div>

        {/* Music Controls */}
        <div className="flex items-center justify-center gap-6 py-6 " >
            <button
                className="text-lg cursor-pointer"
            >
                Back
            </button>

            <button 
            className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shadow-lg cursor-pointer " 
            
            > Play/Pause
            </button>

            <button
                className="text-lg cursor-pointer"
            >
            </button>

        </div>

      </div>
    </div>
  );
}
