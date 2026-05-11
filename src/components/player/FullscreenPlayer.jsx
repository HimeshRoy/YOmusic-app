import { motion, AnimatePresence } from "framer-motion";

import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaHeart,
  FaRandom,
  FaListUl,
} from "react-icons/fa";

import { IoChevronDown } from "react-icons/io5";

import { RiRepeat2Fill } from "react-icons/ri";

import { useEffect, useState } from "react";

import { Vibrant } from "node-vibrant/browser";

import { usePlayer } from "../../context/PlayerContext";

import { useTheme } from "../../context/ThemeContext";

import { useFavorites } from "../../context/FavoritesContext";

const FullscreenPlayer = ({
  open,
  setOpen,
}) => {

  const {

    currentSong,

    isPlaying,
    setIsPlaying,

    currentTime,
    duration,

    seekSong,

    nextSong,
    prevSong,

    isShuffle,
    setIsShuffle,

    loopMode,
    setLoopMode,

    setQueueOpen,

  } = usePlayer();

  const {

    toggleFavorite,
    isFavorite,

  } = useFavorites();

  const {
    setThemeColor,
  } = useTheme();

  const [gradient,
    setGradient] =
    useState("");

  // DYNAMIC COLORS
  useEffect(() => {

    if (!currentSong) return;

    Vibrant

      .from(
        currentSong.image[2].url
      )

      .getPalette()

      .then((palette) => {

        const color =
          palette.Vibrant?.hex ||
          "#22c55e";

        setThemeColor(color);

        setGradient(`

          linear-gradient(
            to bottom,

            ${color},

            #000000
          )

        `);

      })

      .catch((err) =>
        console.log(err)
      );

  }, [currentSong]);

  // FORMAT TIME
  const formatTime =
    (time) => {

    if (
      !time ||
      isNaN(time)
    ) return "0:00";

    const minutes =
      Math.floor(time / 60);

    const seconds =
      Math.floor(time % 60);

    return `
      ${minutes}:
      ${seconds < 10 ? "0" : ""}
      ${seconds}
    `;

  };

  return (

    <AnimatePresence>

      {open &&
        currentSong && (

        <motion.div

          drag="y"

          dragConstraints={{
            top: 0,
            bottom: 300,
          }}

          onDragEnd={(
            e,
            info
          ) => {

            if (
              info.offset.y > 120
            ) {

              setOpen(false);

            }

          }}

          initial={{
            y: "100%",
            opacity: 0,
          }}

          animate={{
            y: 0,
            opacity: 1,
          }}

          exit={{
            y: "100%",
            opacity: 0,
          }}

          transition={{
            duration: 0.35,
          }}

          style={{
            background: gradient,

            transition:
              "background 1s ease",
          }}

          className="
            fixed
            inset-0

             z-[9999]

            md:hidden

            overflow-hidden
          "
        >

          {/* BACKGROUND BLUR */}
          <div
            className="
              absolute
              inset-0

              backdrop-blur-3xl

              opacity-70
            "
          />

          {/* GLOW */}
          <motion.div

            animate={{
              scale: [1, 1.15, 1],
            }}

            transition={{
              duration: 8,
              repeat: Infinity,
            }}

            className="
              absolute

              -top-10
              -right-10

              w-[250px]
              h-[250px]

              bg-white/10

              rounded-full

              blur-3xl
            "
          />

          {/* MAIN */}
          <div
            className="
              relative
              z-10

              h-full

              flex
              flex-col

              px-5
              pb-8
            "
          >

            {/* TOP BAR */}
            <div
              className="
                flex
                items-center
                justify-between

                pt-5
                pb-3
              "
            >

              {/* CLOSE */}
              <button
                onClick={() =>
                  setOpen(false)
                }
              >

                <IoChevronDown
                  className="
                    text-3xl
                  "
                />

              </button>

              {/* TITLE */}
              <div
                className="
                  text-center
                "
              >

                <p
                  className="
                    text-[10px]
                    text-white/60

                    tracking-[3px]
                  "
                >
                  PLAYING FROM
                </p>

                <p
                  className="
                    text-sm
                    font-semibold
                  "
                >
                  YOmusic
                </p>

              </div>

              {/* FAVORITE */}
              <button

                onClick={() =>
                  toggleFavorite(
                    currentSong
                  )
                }
              >

                <FaHeart
                  className={`
                    text-xl

                    transition-all

                    ${
                      isFavorite(
                        currentSong.id
                      )

                      ? "text-pink-500 scale-110"

                      : "text-white"
                    }
                  `}
                />

              </button>

            </div>

            {/* CENTER */}
            <div
              className="
                flex-1

                flex
                flex-col
                justify-center
              "
            >

              {/* ALBUM */}
              <motion.img

                animate={{

                  scale:
                    isPlaying
                      ? 1
                      : 0.98,

                  y:
                    isPlaying
                      ? [0, -5, 0]
                      : 0,

                }}

                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}

                src={
                  currentSong.image[2].url
                }

                alt=""

                className="
                  w-full
                  max-w-[280px]

                  mx-auto

                  aspect-square

                  rounded-[30px]

                  object-cover

                  shadow-2xl
                "
              />

              {/* SONG INFO */}
              <div
                className="
                  mt-8
                "
              >

                <h2
                  className="
                    text-3xl

                    font-black

                    line-clamp-1
                  "
                >
                  {currentSong.name}
                </h2>

                <p
                  className="
                    text-white/70

                    mt-2

                    text-base

                    line-clamp-1
                  "
                >
                  {
                    currentSong
                      .artists
                      ?.primary?.[0]
                      ?.name
                  }
                </p>

              </div>

              {/* SEEK */}
              <div
                className="
                  mt-8
                "
              >

                {/* PROGRESS */}
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={(e) =>
                    seekSong(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="
                    w-full

                    accent-white

                    h-[4px]

                    cursor-pointer
                  "
                />

                {/* TIME + QUEUE */}
                <div
                  className="
                    flex
                    items-center
                    justify-between

                    mt-3
                  "
                >

                  {/* TIME */}
                  <div
                    className="
                      flex
                      items-center

                      gap-2

                      text-xs
                      text-white/70
                    "
                  >

                    <span>
                      {
                        formatTime(
                          currentTime
                        )
                      }
                    </span>

                    <span>
                      /
                    </span>

                    <span>
                      {
                        formatTime(
                          duration
                        )
                      }
                    </span>

                  </div>

                  {/* QUEUE */}
                  <button

                    onClick={() =>
                      setQueueOpen(true)
                    }

                    className="
                      flex
                      items-center

                      gap-2

                      text-sm

                      text-white/70

                      hover:text-white

                      transition-all
                    "
                  >

                    <FaListUl />

                    Queue

                  </button>

                </div>

              </div>

              {/* CONTROLS */}
              <div
                className="
                  flex
                  items-center
                  justify-center

                  gap-6

                  mt-12
                "
              >

                {/* SHUFFLE */}
                <button

                  onClick={() =>

                    setIsShuffle(
                      !isShuffle
                    )

                  }

                  className={`
                    text-xl

                    transition-all

                    ${
                      isShuffle

                        ? "text-green-400"

                        : "text-white/70"
                    }
                  `}
                >

                  <FaRandom />

                </button>

                {/* PREVIOUS */}
                <button
                  onClick={prevSong}
                >

                  <FaBackward
                    className="
                      text-2xl
                    "
                  />

                </button>

                {/* PLAY */}
                <motion.button

                  whileTap={{
                    scale: 0.92,
                  }}

                  whileHover={{
                    scale: 1.05,
                  }}

                  onClick={() =>

                    setIsPlaying(
                      !isPlaying
                    )

                  }

                  className="
                    bg-white
                    text-black

                    w-20
                    h-20

                    rounded-full

                    flex
                    items-center
                    justify-center

                    shadow-2xl
                  "
                >

                  {isPlaying ? (

                    <FaPause
                      className="
                        text-2xl
                      "
                    />

                  ) : (

                    <FaPlay
                      className="
                        text-2xl

                        ml-1
                      "
                    />

                  )}

                </motion.button>

                {/* NEXT */}
                <button
                  onClick={nextSong}
                >

                  <FaForward
                    className="
                      text-2xl
                    "
                  />

                </button>

                {/* LOOP */}
                <button

                  onClick={() => {

                    if (
                      loopMode === "off"
                    ) {

                      setLoopMode("all");

                    }

                    else if (
                      loopMode === "all"
                    ) {

                      setLoopMode("one");

                    }

                    else {

                      setLoopMode("off");

                    }

                  }}

                  className={`
                    text-xl

                    transition-all

                    ${
                      loopMode !== "off"

                        ? "text-green-400"

                        : "text-white/70"
                    }
                  `}
                >

                  <RiRepeat2Fill />

                </button>

              </div>

            </div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>

  );

};

export default FullscreenPlayer;