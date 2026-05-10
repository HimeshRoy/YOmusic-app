import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaHeart,
} from "react-icons/fa";

import {
  IoChevronDown,
} from "react-icons/io5";

import {
  HiSpeakerWave,
} from "react-icons/hi2";

import {
  useEffect,
  useState,
} from "react";

import {
  Vibrant,
} from "node-vibrant/browser";

import {
  usePlayer,
} from "../../context/PlayerContext";

import {
  useTheme,
} from "../../context/ThemeContext";

import {
  useFavorites,
} from "../../context/FavoritesContext";

const FullscreenPlayer =
({
  open,
  setOpen,
}) => {

  const {

    currentSong,

    isPlaying,
    setIsPlaying,

    currentTime,
    duration,

    volume,
    setVolume,

    seekSong,

    nextSong,
    prevSong,

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

  // EXTRACT COLORS
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

            flex
            flex-col

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
              scale: [1, 1.2, 1],
            }}

            transition={{
              duration: 8,
              repeat: Infinity,
            }}

            className="
              absolute

              -top-40
              -right-20

              w-[350px]
              h-[350px]

              bg-white/10

              rounded-full

              blur-3xl
            "
          />

          {/* TOP */}
          <div
            className="
              relative
              z-10

              flex
              items-center
              justify-between

              p-5
            "
          >

            <button
              onClick={() =>
                setOpen(false)
              }
            >

              <IoChevronDown
                className="
                  text-3xl
                  text-white
                "
              />

            </button>

            <div
              className="
                text-center
              "
            >

              <p
                className="
                  text-xs
                  text-white/60
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

                  ${
                    isFavorite(
                      currentSong.id
                    )

                    ? "text-pink-500"

                    : "text-white"
                  }
                `}
              />

            </button>

          </div>

          {/* CONTENT */}
          <div
            className="
              relative
              z-10

              flex-1

              flex
              flex-col
              items-center
              justify-center

              px-6
              pb-10
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
                    ? [0, -10, 0]
                    : 0,

              }}

              transition={{
                duration: 4,
                repeat: Infinity,
              }}

              src={
                currentSong
                  .image[2].url
              }

              alt=""

              className="
                w-full
                max-w-[340px]

                aspect-square

                rounded-[35px]

                object-cover

                shadow-2xl
              "
            />

            {/* SONG INFO */}
            <div
              className="
                w-full

                mt-10
              "
            >

              <h2
                className="
                  text-3xl
                  font-black

                  truncate
                "
              >
                {currentSong.name}
              </h2>

              <p
                className="
                  text-white/70

                  mt-2

                  text-lg
                "
              >
                {
                  currentSong
                    .artists
                    .primary[0]?.name
                }
              </p>

            </div>

            {/* SEEK */}
            <div
              className="
                w-full

                mt-10
              "
            >

              <input

                type="range"

                min="0"

                max={
                  duration || 0
                }

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
                "
              />

              <div
                className="
                  flex
                  justify-between

                  mt-3

                  text-sm
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
                  {
                    formatTime(
                      duration
                    )
                  }
                </span>

              </div>

            </div>

            {/* CONTROLS */}
            <div
              className="
                flex
                items-center
                justify-center

                gap-10

                mt-12
              "
            >

              {/* PREV */}
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
                  scale: 0.9,
                }}

                whileHover={{
                  scale: 1.08,
                }}

                onClick={() =>

                  setIsPlaying(
                    !isPlaying
                  )

                }

                className="
                  bg-white
                  text-black

                  p-6

                  rounded-full

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

            </div>

            {/* VOLUME */}
            <div
              className="
                flex
                items-center

                gap-3

                w-full

                mt-10
              "
            >

              <HiSpeakerWave
                className="
                  text-xl
                "
              />

              <input

                type="range"

                min="0"
                max="1"

                step="0.01"

                value={volume}

                onChange={(e) =>

                  setVolume(
                    Number(
                      e.target.value
                    )
                  )

                }

                className="
                  flex-1

                  accent-white
                "
              />

            </div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>

  );

};

export default FullscreenPlayer;