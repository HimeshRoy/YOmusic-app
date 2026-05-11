import { createContext, useContext, useEffect, useRef, useState } from "react";

import { useRecentlyPlayed } from "./RecentlyPlayedContext";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  const {
    addRecentlyPlayed,

    recentlyPlayed,
  } = useRecentlyPlayed();

  // QUEUE
  const [songs, setSongs] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // PLAYER
  const [currentSong, setCurrentSong] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);

  // MODES
  const [isShuffle, setIsShuffle] = useState(false);

  const [loopMode, setLoopMode] = useState("off");

  // HYDRATION
  const [isReady, setIsReady] = useState(false);

  const [audioLoaded, setAudioLoaded] = useState(false);

  // QUEUE PANEL
  const [queueOpen, setQueueOpen] = useState(false);

  // RESTORE PLAYER
  useEffect(() => {
    const savedPlayer = JSON.parse(localStorage.getItem("yomusic-player"));

    // NO SAVED DATA
    if (!savedPlayer) {
      setIsReady(true);

      return;
    }

    setSongs(savedPlayer.songs || []);

    setCurrentIndex(savedPlayer.currentIndex || 0);

    setCurrentSong(savedPlayer.currentSong || null);

    setCurrentTime(savedPlayer.currentTime || 0);

    // IMPORTANT
    // NEVER AUTOPLAY AFTER REFRESH
    setIsPlaying(false);

    setVolume(savedPlayer.volume || 1);

    setIsShuffle(savedPlayer.isShuffle || false);

    setLoopMode(savedPlayer.loopMode || "off");

    setIsReady(true);
  }, []);

  // SAVE PLAYER
  useEffect(() => {
    if (!isReady) return;

    localStorage.setItem(
      "yomusic-player",

      JSON.stringify({
        songs,

        currentIndex,

        currentSong,

        currentTime,

        isPlaying,

        volume,

        isShuffle,

        loopMode,
      }),
    );
  }, [
    songs,

    currentIndex,

    currentSong,

    currentTime,

    isPlaying,

    volume,

    isShuffle,

    loopMode,

    isReady,
  ]);

  // PLAY SONG
  const playSong = (song, index, songList) => {
    setSongs(songList);

    setCurrentIndex(index);

    setCurrentSong(song);

    addRecentlyPlayed(song);

    setCurrentTime(0);

    setIsPlaying(true);
  };

  // LOAD SONG
  useEffect(() => {
    if (!currentSong) return;

    const audio = audioRef.current;

    setAudioLoaded(false);

    // SAFE URL
    const audioUrl =
      currentSong?.downloadUrl?.[4]?.url || currentSong?.downloadUrl?.[0]?.url;

    if (!audioUrl) return;

    audio.src = audioUrl;

    const handleLoaded = () => {
      audio.currentTime = currentTime;

      setDuration(audio.duration || 0);

      setAudioLoaded(true);
    };

    audio.addEventListener("loadedmetadata", handleLoaded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [currentSong]);

  // PLAY / PAUSE
  useEffect(() => {
    if (!currentSong || !audioLoaded) return;

    const audio = audioRef.current;

    if (isPlaying) {
      audio
        .play()

        .then(() => {
          setIsPlaying(true);
        })

        .catch(() => {
          // AUTOPLAY BLOCKED
          setIsPlaying(false);
        });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong, audioLoaded]);

  // TIME UPDATE
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    // AUTO NEXT
    const handleEnded = () => {
      nextSong();
    };

    audio.addEventListener("timeupdate", updateTime);

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);

      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, currentIndex, songs, loopMode, isShuffle]);

  // VOLUME
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  // SEEK
  const seekSong = (time) => {
    const audio = audioRef.current;

    audio.currentTime = time;

    setCurrentTime(time);

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
  };

  // NEXT SONG
  const nextSong = () => {
    // LOOP ONE
    if (loopMode === "one") {
      audioRef.current.currentTime = 0;

      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });

      return;
    }

    // SHUFFLE
    if (isShuffle && songs.length > 1) {
      const randomIndex = Math.floor(Math.random() * songs.length);

      setCurrentIndex(randomIndex);

      setCurrentSong(songs[randomIndex]);

      addRecentlyPlayed(songs[randomIndex]);

      setCurrentTime(0);

      setIsPlaying(true);

      return;
    }

    // NORMAL NEXT
    if (currentIndex < songs.length - 1) {
      const next = songs[currentIndex + 1];

      setCurrentIndex(currentIndex + 1);

      setCurrentSong(next);

      addRecentlyPlayed(next);

      setCurrentTime(0);

      setIsPlaying(true);
    }

    // LOOP ALL
    else if (loopMode === "all") {
      setCurrentIndex(0);

      setCurrentSong(songs[0]);

      addRecentlyPlayed(songs[0]);

      setCurrentTime(0);

      setIsPlaying(true);
    }

    // END
    else {
      setIsPlaying(false);
    }
  };

  // PREVIOUS SONG
  const prevSong = () => {
    if (currentIndex > 0) {
      const prev = songs[currentIndex - 1];

      setCurrentIndex(currentIndex - 1);

      setCurrentSong(prev);

      addRecentlyPlayed(prev);

      setCurrentTime(0);

      setIsPlaying(true);
    }
  };

  // PLAY FROM QUEUE
  const playFromQueue = (index) => {
    setCurrentIndex(index);

    setCurrentSong(songs[index]);

    addRecentlyPlayed(songs[index]);

    setCurrentTime(0);

    setIsPlaying(true);
  };

  // REMOVE FROM QUEUE
  const removeFromQueue = (index) => {
    const updatedSongs = songs.filter((_, i) => i !== index);

    setSongs(updatedSongs);

    // REMOVED CURRENT SONG
    if (index === currentIndex) {
      if (updatedSongs.length > 0) {
        const newIndex = Math.min(index, updatedSongs.length - 1);

        setCurrentIndex(newIndex);

        setCurrentSong(updatedSongs[newIndex]);
      } else {
        setCurrentSong(null);

        setIsPlaying(false);
      }
    }

    // SHIFT INDEX
    else if (index < currentIndex) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        // PLAYER
        currentSong,

        isPlaying,
        setIsPlaying,

        currentTime,
        duration,

        volume,
        setVolume,

        isReady,

        // MODES
        isShuffle,
        setIsShuffle,

        loopMode,
        setLoopMode,

        // QUEUE
        queueOpen,
        setQueueOpen,
        songs,

        currentIndex,

        // HISTORY
        recentlyPlayed,

        // ACTIONS
        seekSong,

        playSong,

        nextSong,
        prevSong,

        playFromQueue,

        removeFromQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
