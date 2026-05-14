"use client"

import { useRef, useState, useEffect } from "react";
import LyricsCard from "./LyricsCard";

type Song = {
    title: string
    artist: string
    cover: string
    audio: string
    lyricsFile: string | null
}

const songs: Song[] = [
    {
        title: "Which One",
        artist: "Drake",
        cover: "/covers/DrakeWhichOneCover.png",
        audio:"/songs/DrakeWhichOneSong.mp3",
        lyricsFile: null
    },
    {
        title: "Passionfruit",
        artist: "Drake",
        cover: "/covers/DrakePassionfruitCover.png",
        audio:"/songs/DrakePassionfruitSong.mp3",
        lyricsFile: "/lyrics/PassionfruitLyrics.json"
    }
]

export default function MusicPlayerCard() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [currentSong, setCurrentSong] = useState<number>(0);
    const [isPlaying, setIsPLaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [lyrics, setLyrics] = useState<any[] | null>(null);
    const [showLyrics, setShowLyrics] = useState<boolean>(false);

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
    const prev = (currentSong - 1 + songs.length) % songs.length
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

    useEffect(() => {
        const loadLyrics = async () => {
            if (!song.lyricsFile) {
                setLyrics(null)
                return
            }

            try {
                const res = await fetch(song.lyricsFile)
                const data = await res.json()
                setLyrics(data.entries)
            } catch (err) {
                console.error("Lyrics not found", err)
                setLyrics(null);
            }
        }
        loadLyrics()
    }, [currentSong])


  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center">

        <LyricsCard
            show={showLyrics}
            currentTime={progress}
            lyrics={lyrics}
        />

      <div className="relative z-10 w-72.5 rounded-[22px] overflow-hidden bg-[#ffffff] shadow-2xl " >
    
            <button
                onClick={() => setShowLyrics(!showLyrics)}
                className="absolute top-4 left-4 z-20 rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white hover:bg-black"
            >
                Lyrics
            </button>

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
            className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shadow-lg cursor-pointer
            transition-all duration-300 active:scale-90 hover:scale-105 " 
            onClick={togglePlay}
            > <span
                className="inline-block transition-all duration-300 animate-[pop_0.3s_ease] "
                >
                {isPlaying ? "⏸︎" : "▶︎"}</span>
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
