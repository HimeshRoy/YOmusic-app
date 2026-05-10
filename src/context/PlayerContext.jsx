import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const PlayerContext =
  createContext();

export const PlayerProvider =
({
  children,
}) => {

  const audioRef =
    useRef(new Audio());

  const [songs, setSongs] =
    useState([]);

  const [currentIndex,
    setCurrentIndex] =
    useState(0);

  const [currentSong,
    setCurrentSong] =
    useState(null);

  const [isPlaying,
    setIsPlaying] =
    useState(false);

  const [currentTime,
    setCurrentTime] =
    useState(0);

  const [duration,
    setDuration] =
    useState(0);

  const [volume,
    setVolume] =
    useState(1);

  // FIX HYDRATION
  const [isReady,
    setIsReady] =
    useState(false);

  // AUDIO READY
  const [audioLoaded,
    setAudioLoaded] =
    useState(false);

  // RESTORE PLAYER
  useEffect(() => {

    const savedPlayer =

      JSON.parse(
        localStorage.getItem(
          "yomusic-player"
        )
      );

    // NO SAVED PLAYER
    if (!savedPlayer) {

      setIsReady(true);

      return;

    }

    setSongs(
      savedPlayer.songs || []
    );

    setCurrentIndex(
      savedPlayer.currentIndex || 0
    );

    setCurrentSong(
      savedPlayer.currentSong || null
    );

    setCurrentTime(
      savedPlayer.currentTime || 0
    );

    setIsPlaying(
      savedPlayer.isPlaying || false
    );

    setVolume(
      savedPlayer.volume || 1
    );

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

      })

    );

  }, [

    songs,

    currentIndex,

    currentSong,

    currentTime,

    isPlaying,

    volume,

    isReady,

  ]);

  // PLAY SONG
  const playSong = (
    song,
    index,
    songList
  ) => {

    setSongs(songList);

    setCurrentIndex(index);

    setCurrentSong(song);

    setCurrentTime(0);

    setIsPlaying(true);

  };

  // LOAD SONG
  useEffect(() => {

    if (!currentSong) return;

    const audio =
      audioRef.current;

    setAudioLoaded(false);

    audio.src =
      currentSong
        .downloadUrl[4].url;

    const handleLoaded =
      () => {

      audio.currentTime =
        currentTime;

      setDuration(
        audio.duration || 0
      );

      setAudioLoaded(true);

    };

    audio.addEventListener(
      "loadedmetadata",
      handleLoaded
    );

    return () => {

      audio.removeEventListener(
        "loadedmetadata",
        handleLoaded
      );

    };

  }, [currentSong]);

  // PLAY / PAUSE
  useEffect(() => {

    if (
      !currentSong ||
      !audioLoaded
    ) return;

    const audio =
      audioRef.current;

    if (isPlaying) {

      audio
        .play()
        .catch((err) =>
          console.log(err)
        );

    } else {

      audio.pause();

    }

  }, [

    isPlaying,

    currentSong,

    audioLoaded,

  ]);

  // TIME UPDATE
  useEffect(() => {

    const audio =
      audioRef.current;

    const updateTime =
      () => {

      setCurrentTime(
        audio.currentTime
      );

    };

    // AUTO NEXT
    const handleEnded =
      () => {

      nextSong();

    };

    audio.addEventListener(
      "timeupdate",
      updateTime
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    return () => {

      audio.removeEventListener(
        "timeupdate",
        updateTime
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );

    };

  }, [currentSong, currentIndex]);

  // VOLUME
  useEffect(() => {

    audioRef.current.volume =
      volume;

  }, [volume]);

  // SEEK
  const seekSong =
    (time) => {

    const audio =
      audioRef.current;

    audio.currentTime =
      time;

    setCurrentTime(time);

    if (isPlaying) {

      audio
        .play()
        .catch((err) =>
          console.log(err)
        );

    }

  };

  // NEXT
  const nextSong =
    () => {

    if (
      currentIndex <
      songs.length - 1
    ) {

      const next =
        songs[currentIndex + 1];

      setCurrentIndex(
        currentIndex + 1
      );

      setCurrentSong(next);

      setCurrentTime(0);

      setIsPlaying(true);

    }

  };

  // PREVIOUS
  const prevSong =
    () => {

    if (currentIndex > 0) {

      const prev =
        songs[currentIndex - 1];

      setCurrentIndex(
        currentIndex - 1
      );

      setCurrentSong(prev);

      setCurrentTime(0);

      setIsPlaying(true);

    }

  };

  return (

    <PlayerContext.Provider
      value={{

        currentSong,

        isPlaying,
        setIsPlaying,

        currentTime,
        duration,

        volume,
        setVolume,

        seekSong,

        playSong,

        nextSong,
        prevSong,

        isReady,

      }}
    >

      {children}

    </PlayerContext.Provider>

  );

};

export const usePlayer =
() =>
  useContext(PlayerContext);