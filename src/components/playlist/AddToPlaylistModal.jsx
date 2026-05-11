import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaTimes,
  FaPlus,
  FaCheck,
} from "react-icons/fa";

import {
  usePlaylists,
} from "../../context/PlaylistContext";

const AddToPlaylistModal =
({
  open,
  setOpen,
  song,
}) => {

  const {

    playlists,

    addSongToPlaylist,

  } = usePlaylists();

  return (

    <AnimatePresence>

      {open && (

        <motion.div

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          exit={{
            opacity: 0,
          }}

          className="
            fixed
            inset-0

            bg-black/70
            backdrop-blur-md

            z-[9999]

            flex
            items-center
            justify-center

            px-4
          "
        >

          <motion.div

            initial={{
              scale: 0.9,
              opacity: 0,
            }}

            animate={{
              scale: 1,
              opacity: 1,
            }}

            exit={{
              scale: 0.9,
              opacity: 0,
            }}

            className="
              w-full
              max-w-[420px]

              bg-[#181818]

              rounded-3xl

              border
              border-zinc-800

              p-6
            "
          >

            {/* HEADER */}
            <div
              className="
                flex
                items-center
                justify-between

                mb-5
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                Add to Playlist
              </h2>

              <button
                onClick={() =>
                  setOpen(false)
                }
              >

                <FaTimes />

              </button>

            </div>

            {/* PLAYLISTS */}
            <div
              className="
                space-y-3

                max-h-[400px]

                overflow-y-auto
              "
            >

              {playlists.length > 0 ? (

                playlists.map(
                  (playlist) => (

                  <button

                    key={playlist.id}

                    onClick={() => {

                      addSongToPlaylist(
                        playlist.id,
                        song
                      );

                      setOpen(false);

                    }}

                    className="
                      w-full

                      bg-[#121212]
                      hover:bg-[#202020]

                      border
                      border-zinc-800

                      rounded-2xl

                      p-4

                      flex
                      items-center
                      justify-between

                      transition-all
                    "
                  >

                    <div
                      className="
                        text-left
                      "
                    >

                      <h3
                        className="
                          font-semibold
                        "
                      >
                        {playlist.name}
                      </h3>

                      <p
                        className="
                          text-zinc-400
                          text-sm
                        "
                      >
                        {
                          playlist.songs.length
                        }
                        {" "}
                        songs
                      </p>

                    </div>

                    <FaPlus
                      className="
                        text-green-500
                      "
                    />

                  </button>

                ))

              ) : (

                <div
                  className="
                    h-[120px]

                    flex
                    items-center
                    justify-center

                    text-zinc-400
                  "
                >
                  No playlists available.
                </div>

              )}

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );

};

export default AddToPlaylistModal;