import { useContext } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

import { MusicContext } from '../../context/MusicContext';

function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    pauseSong,
    resumeSong,
    currentTime,
    duration,
    seekSong,
  } = useContext(MusicContext);

  if (!currentSong) {
    return null;
  }

  const formatTime = (time) => {
    if (!time) return '0:00';

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  };

  return (
    <div
      className="
      fixed bottom-0 left-0 right-0 
      bg-white border-t shadow-2xl 
      p-4 z-50
      "
    >
      <div className="flex items-center justify-between gap-5">
        {/* Song Info */}

        <div className="flex items-center gap-4 w-1/3">
          <img
            src={currentSong.coverImage}
            alt={currentSong.title}
            className="w-14 h-14 rounded-xl object-cover"
          />

          <div>
            <h3 className="font-bold text-gray-800">{currentSong.title}</h3>

            <p className="text-sm text-gray-500">{currentSong.artist}</p>
          </div>
        </div>

        {/* Controls */}

        <div className="flex flex-col items-center w-1/3">
          <button
            onClick={isPlaying ? pauseSong : resumeSong}
            className="
            bg-pink-500 text-white 
            p-3 rounded-full
            "
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <div className="flex items-center gap-3 mt-3 w-full">
            <span className="text-xs text-gray-500">
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => seekSong(Number(e.target.value))}
              className="flex-1 accent-pink-500"
            />

            <span className="text-xs text-gray-500">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
