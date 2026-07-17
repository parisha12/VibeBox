import { createContext, useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from '../services/favoriteService';

export const MusicContext = createContext();

export function MusicProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Favorites state ❤️
  const [favorites, setFavorites] = useState([]);

  // Load favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');

      if (!token) return;

      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavorites();
  }, []);

  const playSong = (song) => {
    setCurrentSong(song);

    audioRef.current.src = song.audioUrl;

    audioRef.current.play();

    setIsPlaying(true);

    audioRef.current.ontimeupdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration);
    };
  };

  const pauseSong = () => {
    audioRef.current.pause();

    setIsPlaying(false);
  };

  const resumeSong = () => {
    audioRef.current.play();

    setIsPlaying(true);
  };

  const seekSong = (time) => {
    audioRef.current.currentTime = time;

    setCurrentTime(time);
  };

  // Add favorite ❤️
  const likeSong = async (song) => {
    try {
      await addFavorite(song._id);

      setFavorites((prev) => [
        ...prev,
        {
          song,
        },
      ]);

      toast.success('Added to favorites ❤️');
    } catch (error) {
      toast.error('Already in favorites');
    }
  };

  // Remove favorite 💔
  const unlikeSong = async (songId) => {
    try {
      await removeFavorite(songId);

      setFavorites((prev) => prev.filter((item) => item.song._id !== songId));

      toast.success('Removed from favorites');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  // Check favorite status
  const isFavorite = (songId) => {
    return favorites.some((item) => item.song._id === songId);
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,

        playSong,
        pauseSong,
        resumeSong,
        seekSong,

        favorites,
        likeSong,
        unlikeSong,
        isFavorite,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
