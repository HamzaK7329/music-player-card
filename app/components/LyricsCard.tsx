"use client"

export default function LyricsCard({
    show,
    currentTime,
    lyrics,
}: {
    show: boolean;
    currentTime: number;
    lyrics: any[] | null;
}) {
    if (!lyrics) {
        return (
            <div 
            className={`absolute z-0 w-72.5 h-107.5 rounded-[22px] bg-[#111] shadow-2xl transition-all duration-700
            flex items-center justify-center ${show ? "translate-x-77.5 opacity-100" : "opacity-0"} `}>
                <p className="text-white/50 text-sm " >
                    Lyrics not available
                </p>
            </div>
        )
    }

    const activeIndex = lyrics.findIndex((line, index) => {
        const nextLine = lyrics[index + 1]

        return (
            currentTime >= line.time_seconds &&
            (!nextLine || currentTime < nextLine.time_seconds)
        )
    })

    return (
        <div 
        className={`absolute z-0 w-72.5 h-107.5 rounded-[22px] bg-[#111] shadow-2xl transition-all duration-700
        flex items-center justify-center ${show ? "translate-x-77.5 opacity-100" : "opacity-0"} `}>
            <div className="p-5 h-full overflow-y-auto " >
                <h2 className="text-white font-semibold mb-4 ">
                    Lyrics
                </h2>

                <div className="space-y-4">
                    {lyrics.map((line, index) => (
                        <p
                        key={line.timestamp}
                        className={`transition-all duration-300 ${index === activeIndex ? "text-white text-[18px] font-semibold" :
                            "text-white/40 text-[15px]"
                        }`}
                        >
                            {line.lyric}
                        </p>
                    ))}
                </div>

            </div>
        </div>
    )

}

