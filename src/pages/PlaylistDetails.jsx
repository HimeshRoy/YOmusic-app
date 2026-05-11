import {
  motion,
} from "framer-motion";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  FaPlay,
  FaTrash,
  FaMusic,
  FaArrowLeft,
} from "react-icons/fa";

import {
  usePlaylists,
} from "../context/PlaylistContext";

import {
  usePlayer,
} from "../context/PlayerContext";

const PlaylistDetails =
() => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {

    playlists,

    deletePlaylist,

    removeSongFromPlaylist,

  } = usePlaylists();

  const {

    playSong,

  } = usePlayer();

  // FIND PLAYLIST
  const playlist =
    playlists.find(
      (item) =>

        item.id ===
        Number(id)
    );

  // NO PLAYLIST
  if (!playlist) {

    return (

      <div
        className="
          h-[60vh]

          flex
          items-center
          justify-center
        "
      >
        Playlist not found.
      </div>

    );

  }

  // PLAY ALL
  const handlePlayAll =
    () => {

    if (
      playlist.songs.length === 0
    ) return;

    playSong(

      playlist.songs[0],

      0,

      playlist.songs

    );

  };

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      className="
        pb-28

        space-y-8
      "
    >

      {/* HERO */}
      <div
        className="
          relative

          overflow-hidden

          rounded-3xl

          p-6
          md:p-8

          bg-gradient-to-br
          from-green-500
          via-emerald-500
          to-black
        "
      >

        {/* BACK */}
        <button

          onClick={() =>
            navigate(-1)
          }

          className="
            mb-6

            flex
            items-center
            gap-2

            text-white/80
            hover:text-white

            transition-all
          "
        >

          <FaArrowLeft />

          Back

        </button>

        {/* INFO */}
        <div
          className="
            flex
            flex-col
            md:flex-row

            gap-6
            md:gap-8

            items-start
            md:items-center
          "
        >

          {/* COVER */}
          <div
            className="
              w-40
              h-40

              rounded-3xl

              bg-black/30

              flex
              items-center
              justify-center

              shrink-0
            "
          >

            <FaMusic
              className="
                text-6xl
              "
            />

          </div>

          {/* TEXT */}
          <div>

            <p
              className="
                text-white/70
              "
            >
              Playlist
            </p>

            <h1
              className="
                text-4xl
                md:text-6xl

                font-black

                mt-2
              "
            >
              {playlist.name}
            </h1>

            <p
              className="
                mt-4

                text-white/80
              "
            >
              {
                playlist.songs.length
              }
              {" "}
              songs
            </p>

            {/* ACTIONS */}
            <div
              className="
                flex
                items-center
                gap-4

                mt-6
              "
            >

              {/* PLAY */}
              <button

                onClick={
                  handlePlayAll
                }

                className="
                  bg-black
                  hover:bg-zinc-900

                  px-6
                  py-3

                  rounded-2xl

                  flex
                  items-center
                  gap-3

                  font-semibold

                  transition-all
                "
              >

                <FaPlay />

                Play All

              </button>

              {/* DELETE */}
              <button

                onClick={() => {

                  deletePlaylist(
                    playlist.id
                  );

                  navigate(
                    "/library"
                  );

                }}

                className="
                  bg-red-500
                  hover:bg-red-400

                  px-5
                  py-3

                  rounded-2xl

                  transition-all
                "
              >

                <FaTrash />

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* SONGS */}
      <div
        className="
          space-y-3
        "
      >

        {playlist.songs.length > 0 ? (

          playlist.songs.map(
            (
              song,
              index
            ) => (

            <motion.div

              whileHover={{
                scale: 1.01,
              }}

              key={song.id}

              className="
                bg-[#181818]

                border
                border-zinc-800

                rounded-2xl

                p-3
                sm:p-4

                flex
                items-center
                justify-between

                gap-3
              "
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

                {/* IMAGE */}
                <img

                  src={
                    song.image[2].url
                  }

                  alt=""

                  className="
                    w-14
                    h-14

                    sm:w-16
                    sm:h-16

                    rounded-xl

                    object-cover

                    shrink-0
                  "
                />

                {/* INFO */}
                <div
                  className="
                    min-w-0
                  "
                >

                  <h2
                    className="
                      font-semibold

                      truncate
                    "
                  >
                    {song.name}
                  </h2>

                  <p
                    className="
                      text-zinc-400
                      text-sm

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

                  shrink-0
                "
              >

                {/* PLAY */}
                <button

                  onClick={() =>

                    playSong(
                      song,
                      index,
                      playlist.songs
                    )

                  }

                  className="
                    w-10
                    h-10

                    rounded-full

                    bg-green-500

                    flex
                    items-center
                    justify-center

                    text-black

                    hover:scale-105

                    transition-all
                  "
                >

                  <FaPlay />

                </button>

                {/* REMOVE */}
                <button

                  onClick={() =>

                    removeSongFromPlaylist(

                      playlist.id,

                      song.id

                    )

                  }

                  className="
                    w-10
                    h-10

                    rounded-full

                    bg-red-500/20

                    flex
                    items-center
                    justify-center

                    text-red-500

                    hover:bg-red-500
                    hover:text-white

                    transition-all
                  "
                >

                  <FaTrash />

                </button>

              </div>

            </motion.div>

          ))

        ) : (

          <div
            className="
              h-[250px]

              flex
              items-center
              justify-center

              rounded-3xl

              border
              border-dashed
              border-zinc-700

              text-zinc-400
            "
          >
            Playlist is empty.
          </div>

        )}

      </div>

    </motion.div>

  );

};

export default PlaylistDetails;