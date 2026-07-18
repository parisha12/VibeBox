import { createContext, useContext, useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import { AuthContext } from './AuthContext';

import { addRecentlyPlayed } from '../services/recentlyPlayedService';
import { increasePlayCount } from '../services/playService';

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from '../services/favoriteService';

export const MusicContext = createContext();

export function MusicProvider({ children }) {
  const audioRef = useRef(new Audio());

  const { user } = useContext(AuthContext);

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  // Audio events
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const playSong = async (song) => {
    setCurrentSong(song);

    audioRef.current.src = song.audioUrl;

    try {
      await audioRef.current.play();

      setIsPlaying(true);

      await increasePlayCount(song._id);

      if (user) {
        await addRecentlyPlayed(song._id);
      }
    } catch (error) {
      console.log('Play error:', error);
    }
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

  // Check favorite
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
