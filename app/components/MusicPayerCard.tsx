"use client"

import { useRef, useState } from "react";

type Song = {
    title: string
    artist: string
    cover: string
    audio: string
}

const songs: Song[] = [
    {
        title: "Which One",
        artist: "Drake",
        cover: "/covers/DrakeWhichOneCover.png",
        audio:"/songs/DrakeWhichOneSong.mp3"
    }
]

export default function MusicPlayerCard() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [currentSong, setCurrentSong] = useState<number>(0);
    const [isPlaying, setIsPLaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const song = songs[currentSong];
    
    const togglePlay = async () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPLaying(false);
        } else {
            await audioRef.current.play();
            setIsPLaying(true);
        }
    }

    const nextSong = () => {
        const next = (currentSong + 1) % songs.length
        setCurrentSong(next)
        setProgress(0)

        if (isPlaying) {
            setTimeout(() => {
                audioRef.current?.play()
            }, 0)
        }
    }

    const prevSong = () => {
    const prev = (currentSong - 1) % songs.length
    setCurrentSong(prev)
    setProgress(0)

    if (isPlaying) {
        setTimeout(() => {
            audioRef.current?.play()
        }, 0)
        }
    }

    const updateProgress = () => {
        if (!audioRef.current) return;

        setProgress(audioRef.current.currentTime);
        setDuration(audioRef.current.duration || 0);
    }

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return

        const value = Number(e.target.value)
        audioRef.current.currentTime = value
        setProgress(value);
    }

    const formatTime = (time: number) => {
        if (!time) return "0:00"

        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)

        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }


  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-72.5 rounded-[22px] overflow-hidden bg-[#ffffff] shadow-2xl " >

        {/* Music Cover */}
        <div className="relative h-57.5 " >
            <img
                src={song.cover}
                alt={song.title}
                className="w-full h-full object-cover"
            />

            <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-sm shadow " >
                ⁝
            </button>
        </div>

        {/* Music Info */}
        <div className="px-5 pt-4 flex items-center justify-between " >
            <span className="text-sm text-black" >⬅︎</span>

            <div className="text-center">
                <h2 className="text-[16px] font-semibold text-black ">
                    {song.title}
                </h2>
                <p className="text-[11px] text-black/60 mt-1 " >
                    {song.artist}
                </p>
            </div>
            <span className="text-sm text-black " >❤︎</span>
        </div>

        {/* Progress */}
        <div className="px-5 mt-4" >
            <input
                type="range"
                min={0}
                max={duration || 0}
                value={progress}
                onChange={handleProgressChange}
                className="w-full accent-black cursor-pointer "
            />

            <div className="flex justify-between text-[10px] text-black/60 mt-1 " >
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>

        {/* Music Controls */}
        <div className="flex items-center justify-center gap-6 py-6 " >
            <button
                className="text-lg cursor-pointer"
                onClick={prevSong}
            >
                ⏮︎
            </button>

            <button 
            className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shadow-lg cursor-pointer " 
            onClick={togglePlay}
            > ⏯︎
            </button>

            <button
                className="text-lg cursor-pointer"
                onClick={nextSong}
            >
                ⏭︎
            </button>

        </div>

        <audio
            ref={audioRef}
            src={song.audio}
            onTimeUpdate={updateProgress}
            onLoadedMetadata={updateProgress}
            onEnded={nextSong}
        
        />
      </div>
    </div>
  );
}
