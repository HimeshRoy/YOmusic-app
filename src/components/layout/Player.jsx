import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

import { motion } from "framer-motion";

import { HiSpeakerWave } from "react-icons/hi2";

import { useState } from "react";

import { usePlayer } from "../../context/PlayerContext";

import FullscreenPlayer from "../player/FullscreenPlayer";

const Player = () => {
  const {
    currentSong,

    isPlaying,
    setIsPlaying,

    isReady,

    currentTime,
    duration,

    volume,
    setVolume,

    seekSong,

    nextSong,
    prevSong,
  } = usePlayer();

  const [open, setOpen] = useState(false);

  if (!isReady || !currentSong) return null;

  // FORMAT TIME
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      {/* FULLSCREEN PLAYER */}
      <FullscreenPlayer open={open} setOpen={setOpen} />

      {/* MINI PLAYER */}
      <div
        className="
          fixed
          bottom-[70px]
          md:bottom-0
          left-0

          w-full

          h-[75px]
          sm:h-[90px]

          bg-black/95
          backdrop-blur-xl

          border-t
          border-zinc-800

          flex
          items-center
          justify-between

          px-3
          sm:px-6
          md:px-8

          z-50
        "
      >
        {/* LEFT */}
        <div
          onClick={() => setOpen(true)}
          className="
            flex
            items-center

            gap-2
            sm:gap-4

            min-w-0
            sm:min-w-[220px]

            w-[40%]

            cursor-pointer
          "
        >
          <motion.img
            animate={{
              y: isPlaying ? [0, -2, 0] : 0,
            }}
            transition={{
              duration: 2.5,

              repeat: Infinity,
            }}
            src={currentSong.image[2].url}
            alt=""
            className="
              w-10
              h-10

              sm:w-14
              sm:h-14

              rounded-lg

              object-cover

              shrink-0
            "
          ></motion.img>

          <div className="min-w-0">
            <h3
              className="
                font-semibold

                text-[11px]
                sm:text-sm

                truncate
              "
            >
              {currentSong.name}
            </h3>

            <p
              className="
                text-zinc-400

                text-[9px]
                sm:text-xs

                truncate
              "
            >
              {currentSong.artists.primary[0]?.name}
            </p>
          </div>
        </div>

        {/* CENTER */}
        <div
          className="
            flex
            flex-col
            items-center

            flex-1

            max-w-[700px]

            px-2
            sm:px-4
          "
        >
          {/* CONTROLS */}
          <div
            className="
              flex
              items-center

              gap-4
              sm:gap-6

              mb-1
            "
          >
            {/* PREV */}
            <button
              onClick={prevSong}
              className="
                text-zinc-400
                hover:text-white

                transition-all

                text-xs
                sm:text-base
              "
            >
              <FaBackward />
            </button>

            {/* PLAY */}
            <motion.button
              whileTap={{
                scale: 0.82,
              }}
              whileHover={{
                scale: 1.08,
              }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="
                bg-white
                text-black

                p-2.5
                sm:p-4

                rounded-full

                hover:scale-110
                active:scale-95

                transition-all
              "
            >
              {isPlaying ? (
                <FaPause
                  className="
                    text-xs
                    sm:text-base
                  "
                />
              ) : (
                <FaPlay
                  className="
                    text-xs
                    sm:text-base
                  "
                />
              )}
            </motion.button>

            {/* NEXT */}
            <button
              onClick={nextSong}
              className="
                text-zinc-400
                hover:text-white

                transition-all

                text-xs
                sm:text-base
              "
            >
              <FaForward />
            </button>
          </div>

          {/* PROGRESS */}
          <div
            className="
              flex
              items-center

              gap-2

              w-full
            "
          >
            {/* CURRENT */}
            <span
              className="
                text-[9px]
                sm:text-xs

                text-zinc-400

                w-[30px]
                sm:w-[40px]
              "
            >
              {formatTime(currentTime)}
            </span>

            {/* RANGE */}
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => seekSong(Number(e.target.value))}
              className="
                flex-1

                accent-green-500

                cursor-pointer

                h-[2px]
                sm:h-[3px]
              "
            />

            {/* DURATION */}
            <span
              className="
                text-[9px]
                sm:text-xs

                text-zinc-400

                w-[30px]
                sm:w-[40px]
              "
            >
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="
            hidden
            lg:flex

            items-center
            gap-3

            min-w-[180px]

            justify-end
          "
        >
          <HiSpeakerWave
            className="
              text-lg
              text-zinc-300
            "
          />

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="
              accent-green-500

              cursor-pointer

              h-[2px]
            "
          />
        </div>
      </div>
    </>
  );
};

export default Player;
