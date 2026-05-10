import {
  FaPlay,
  FaPause,
  FaHeart,
} from "react-icons/fa";

import {
  motion,
} from "framer-motion";

import { usePlayer }
from "../../context/PlayerContext";

import { useFavorites }
from "../../context/FavoritesContext";

const SongCard = ({
  song,
  index,
  songs,
}) => {

  const {

    playSong,

    currentSong,

    isPlaying,

    setIsPlaying,

  } = usePlayer();

  const {

    toggleFavorite,

    isFavorite,

  } = useFavorites();

  const isCurrentSong =
    currentSong?.id === song.id;

  // PLAY CLICK
  const handlePlay =
    () => {

    // SAME SONG
    if (isCurrentSong) {

      setIsPlaying(
        !isPlaying
      );

    } else {

      playSong(
        song,
        index,
        songs
      );

    }

  };

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      whileHover={{
        y: -6,
        scale: 1.02,
      }}

      whileTap={{
        scale: 0.97,
      }}

      transition={{
        duration: 0.25,
      }}

      onClick={handlePlay}

      className={`

        p-2
        sm:p-4

        rounded-xl

        transition-all
        duration-300

        cursor-pointer
        group

        hover:bg-[#252525]

        ${
          isCurrentSong

            ? `
              bg-[#1f1f1f]
              ring-1
              ring-green-500
              shadow-[0_0_25px_rgba(34,197,94,0.25)]
            `

            : "bg-[#181818]"
        }

      `}
    >

      {/* IMAGE */}
      <div className="relative">

        <motion.img

          whileHover={{
            scale: 1.03,
          }}

          transition={{
            duration: 0.25,
          }}

          src={song.image[2].url}

          alt={song.name}

          className="
            w-full
            aspect-square

            object-cover

            rounded-lg
          "
        />

        {/* FAVORITE */}
        <motion.button

          whileTap={{
            scale: 0.8,
          }}

          whileHover={{
            scale: 1.15,
          }}

          onClick={(e) => {

            e.stopPropagation();

            toggleFavorite(song);

          }}

          className="
            absolute
            top-2
            right-2

            z-20

            transition-all
            duration-300
          "
        >

          <FaHeart
            className={`

              text-sm
              sm:text-lg

              transition-all
              duration-300

              ${
                isFavorite(song.id)

                  ? `
                    text-green-500
                    drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]
                  `

                  : "text-white/70"
              }

            `}
          />

        </motion.button>

        {/* PLAY BUTTON */}
        <motion.button

          whileTap={{
            scale: 0.85,
          }}

          whileHover={{
            scale: 1.08,
          }}

          className="
            absolute
            bottom-2
            right-2

            bg-green-500

            p-2
            sm:p-4

            rounded-full

            opacity-100
            sm:opacity-0

            sm:group-hover:opacity-100

            translate-y-0
            sm:translate-y-3

            sm:group-hover:translate-y-0

            transition-all
            duration-300

            shadow-lg
          "
        >

          {isCurrentSong &&
          isPlaying ? (

            <FaPause
              className="
                text-black
                text-xs
                sm:text-base
              "
            />

          ) : (

            <FaPlay
              className="
                text-black
                text-xs
                sm:text-base
              "
            />

          )}

        </motion.button>

        {/* PLAYING EFFECT */}
        {isCurrentSong &&
          isPlaying && (

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            className="
              absolute
              inset-0

              bg-black/40

              flex
              items-center
              justify-center

              rounded-lg
            "
          >

            <div
              className="
                flex
                items-end
                gap-1

                h-8
              "
            >

              <motion.span

                animate={{
                  height: [
                    12,
                    24,
                    14,
                  ],
                }}

                transition={{
                  repeat: Infinity,
                  duration: 0.7,
                }}

                className="
                  w-1
                  bg-green-500
                  rounded-full
                "
              />

              <motion.span

                animate={{
                  height: [
                    24,
                    12,
                    28,
                  ],
                }}

                transition={{
                  repeat: Infinity,
                  duration: 0.9,
                }}

                className="
                  w-1
                  bg-green-500
                  rounded-full
                "
              />

              <motion.span

                animate={{
                  height: [
                    16,
                    28,
                    12,
                  ],
                }}

                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                }}

                className="
                  w-1
                  bg-green-500
                  rounded-full
                "
              />

            </div>

          </motion.div>

        )}

      </div>

      {/* INFO */}
      <div className="mt-2 sm:mt-4">

        <h2
          className="
            font-semibold

            text-[11px]
            sm:text-base

            truncate
          "
        >
          {song.name}
        </h2>

        <p
          className="
            text-zinc-400

            text-[9px]
            sm:text-sm

            truncate
          "
        >
          {
            song.artists
              .primary[0]?.name
          }
        </p>

      </div>

    </motion.div>

  );

};

export default SongCard;