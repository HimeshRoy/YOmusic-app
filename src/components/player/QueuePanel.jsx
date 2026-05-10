import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaMusic,
  FaTimes,
  FaPlay,
  FaTrash,
} from "react-icons/fa";

import {
  usePlayer,
} from "../../context/PlayerContext";

const QueuePanel =
({
  open,
  setOpen,
}) => {

  const {

    songs,

    currentSong,

    playFromQueue,

    removeFromQueue,

  } = usePlayer();

  return (

    <AnimatePresence>

      {open && (

        <motion.div

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
            duration: 0.3,
          }}

          className="
            fixed
            inset-0

            z-[9998]

            bg-black/70
            backdrop-blur-xl

            flex
            items-end
            justify-center
          "
        >

          {/* PANEL */}
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

            className="
              w-full
              max-w-[700px]

              h-[75vh]

              bg-[#121212]

              rounded-t-[35px]

              border-t
              border-zinc-800

              overflow-hidden
            "
          >

            {/* HEADER */}
            <div
              className="
                flex
                items-center
                justify-between

                p-5

                border-b
                border-zinc-800
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <FaMusic
                  className="
                    text-green-500
                  "
                />

                <h2
                  className="
                    text-xl
                    font-bold
                  "
                >
                  Queue
                </h2>

              </div>

              <button
                onClick={() =>
                  setOpen(false)
                }
              >

                <FaTimes />

              </button>

            </div>

            {/* SONGS */}
            <div
              className="
                overflow-y-auto

                h-full

                p-4

                space-y-3
              "
            >

              {songs.map(
                (song, index) => {

                const isCurrent =
                  currentSong?.id ===
                  song.id;

                return (

                  <motion.div

                    key={song.id}

                    whileHover={{
                      scale: 1.01,
                    }}

                    className={`
                      flex
                      items-center
                      justify-between

                      p-3

                      rounded-2xl

                      transition-all

                      ${
                        isCurrent

                          ? "bg-green-500/20 border border-green-500"

                          : "bg-[#1a1a1a]"
                      }
                    `}
                  >

                    {/* LEFT */}
                    <div
                      className="
                        flex
                        items-center

                        gap-3

                        min-w-0

                        flex-1
                      "
                    >

                      <img

                        src={
                          song.image[2].url
                        }

                        alt=""

                        className="
                          w-14
                          h-14

                          rounded-xl

                          object-cover
                        "
                      />

                      <div
                        className="
                          min-w-0
                        "
                      >

                        <h3
                          className="
                            truncate
                            font-semibold
                          "
                        >
                          {song.name}
                        </h3>

                        <p
                          className="
                            text-sm
                            text-zinc-400

                            truncate
                          "
                        >
                          {
                            song
                              .artists
                              .primary[0]?.name
                          }
                        </p>

                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <button

                        onClick={() =>
                          playFromQueue(index)
                        }

                        className="
                          text-green-500
                        "
                      >

                        <FaPlay />

                      </button>

                      <button

                        onClick={() =>
                          removeFromQueue(index)
                        }

                        className="
                          text-red-500
                        "
                      >

                        <FaTrash />

                      </button>

                    </div>

                  </motion.div>

                );

              })}

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );

};

export default QueuePanel;