import { useState } from "react";

const audioFiles = [
  { name: "Morning Vibes", src: "/media/audios/morning.mp3" },
  { name: "Rainy Night", src: "/media/audios/rain.mp3" },
  { name: "Ocean Waves", src: "/media/audios/ocean.mp3" },
];

const ChillingPage = () => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  const handlePlayPause = (audioSrc: string) => {
    if (currentAudio && playingTrack === audioSrc) {
      currentAudio.pause();
      setPlayingTrack(null);
      return;
    }

    const newAudio = new Audio(audioSrc);
    newAudio.play();
    setCurrentAudio(newAudio);
    setPlayingTrack(audioSrc);

    newAudio.onended = () => {
      setPlayingTrack(null);
    };
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(/media/images/cozy.jpeg)",
      }}
    >
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <ul className="list bg-base-100 rounded-box shadow-md text-black">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
              Chill Sounds
            </li>
            {audioFiles.map((audio, index) => (
              <li
                className="list-row flex items-center justify-between p-2"
                key={audio.src}
              >
                <div className="text-4xl font-thin opacity-30 tabular-nums">
                  {index + 1}
                </div>
                <span>{audio.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() => handlePlayPause(audio.src)}
                  >
                    {playingTrack === audio.src ? (
                      <svg
                        className="size-[1.2em]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg
                        className="size-[1.2em]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <g
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="2"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M6 3L20 12 6 21 6 3z"></path>
                        </g>
                      </svg>
                    )}
                  </button>
                  <button className="btn btn-square btn-ghost">
                    <svg
                      className="size-[1.2em]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChillingPage;
