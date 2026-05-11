import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";

import { FaPlus, FaTimes } from "react-icons/fa";

import { usePlaylists } from "../../context/PlaylistContext";

const CreatePlaylistModal = ({ open, setOpen }) => {
  const [name, setName] = useState("");

  const { createPlaylist } = usePlaylists();

  const handleCreate = () => {
    if (!name.trim()) return;

    createPlaylist(name);

    setName("");

    setOpen(false);
  };

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
              max-w-[400px]

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

                mb-6
              "
            >
              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                Create Playlist
              </h2>

              <button onClick={() => setOpen(false)}>
                <FaTimes />
              </button>
            </div>

            {/* INPUT */}
            <input
              type="text"
              placeholder="Late Night Vibes..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full

                bg-[#121212]

                border
                border-zinc-700

                rounded-2xl

                px-4
                py-4

                outline-none

                focus:border-green-500

                transition-all
              "
            />

            {/* BUTTON */}
            <button
              onClick={handleCreate}
              className="
                mt-5

                w-full

                bg-green-500
                hover:bg-green-400

                text-black
                font-bold

                py-4

                rounded-2xl

                flex
                items-center
                justify-center
                gap-2

                transition-all
              "
            >
              <FaPlus />
              Create Playlist
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreatePlaylistModal;
