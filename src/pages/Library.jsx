import {
  motion,
} from "framer-motion";

import {
  FaClock,
  FaHeart,
  FaMusic,
  FaHeadphones,
} from "react-icons/fa";

import SongCard
from "../components/music/SongCard";

import {
  usePlayer,
} from "../context/PlayerContext";

import {
  useFavorites,
} from "../context/FavoritesContext";

const Library = () => {

  const {

    recentlyPlayed,

  } = usePlayer();

  const {

    favorites,

  } = useFavorites();

  // TOTAL LISTENS
  const totalListens =
    recentlyPlayed.length;

  // UNIQUE ARTISTS
  const artists =
    [
      ...new Set(

        recentlyPlayed.map(
          (song) =>

            song.artists
              .primary[0]?.name

        )

      ),
    ];

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

        {/* GLOW */}
        <div
          className="
            absolute

            -top-20
            -right-20

            w-72
            h-72

            bg-white/10

            rounded-full

            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
          "
        >

          <p
            className="
              text-white/70

              text-sm
            "
          >
            Your Music Space
          </p>

          <h1
            className="
              text-4xl
              md:text-6xl

              font-black

              mt-2
            "
          >
            Library 👤
          </h1>

          <p
            className="
              mt-4

              text-white/80

              max-w-[500px]
            "
          >
            Your personal music universe.
          </p>

        </div>

      </div>

      {/* STATS */}
      <div
        className="
          grid

          grid-cols-2
          md:grid-cols-4

          gap-4
        "
      >

        {/* RECENT */}
        <div
          className="
            bg-[#181818]

            rounded-2xl

            p-5

            border
            border-zinc-800
          "
        >

          <FaClock
            className="
              text-green-500
              text-2xl
            "
          />

          <h2
            className="
              text-3xl
              font-bold

              mt-4
            "
          >
            {
              recentlyPlayed.length
            }
          </h2>

          <p
            className="
              text-zinc-400
              mt-1
            "
          >
            Recently Played
          </p>

        </div>

        {/* FAVORITES */}
        <div
          className="
            bg-[#181818]

            rounded-2xl

            p-5

            border
            border-zinc-800
          "
        >

          <FaHeart
            className="
              text-pink-500
              text-2xl
            "
          />

          <h2
            className="
              text-3xl
              font-bold

              mt-4
            "
          >
            {
              favorites.length
            }
          </h2>

          <p
            className="
              text-zinc-400
              mt-1
            "
          >
            Favorite Songs
          </p>

        </div>

        {/* ARTISTS */}
        <div
          className="
            bg-[#181818]

            rounded-2xl

            p-5

            border
            border-zinc-800
          "
        >

          <FaMusic
            className="
              text-yellow-500
              text-2xl
            "
          />

          <h2
            className="
              text-3xl
              font-bold

              mt-4
            "
          >
            {
              artists.length
            }
          </h2>

          <p
            className="
              text-zinc-400
              mt-1
            "
          >
            Artists Played
          </p>

        </div>

        {/* LISTENS */}
        <div
          className="
            bg-[#181818]

            rounded-2xl

            p-5

            border
            border-zinc-800
          "
        >

          <FaHeadphones
            className="
              text-cyan-500
              text-2xl
            "
          />

          <h2
            className="
              text-3xl
              font-bold

              mt-4
            "
          >
            {totalListens}
          </h2>

          <p
            className="
              text-zinc-400
              mt-1
            "
          >
            Total Plays
          </p>

        </div>

      </div>

      {/* RECENTLY PLAYED */}
      <section>

        <div
          className="
            flex
            items-center
            gap-3

            mb-5
          "
        >

          <FaClock
            className="
              text-green-500
            "
          />

          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Recently Played
          </h2>

        </div>

        {recentlyPlayed.length > 0 ? (

          <div
            className="
              grid

              grid-cols-3
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6

              gap-3
              sm:gap-5
            "
          >

            {recentlyPlayed.map(
              (song, index) => (

              <SongCard

                key={song.id}

                song={song}

                index={index}

                songs={recentlyPlayed}

              />

            ))}

          </div>

        ) : (

          <div
            className="
              h-[200px]

              flex
              items-center
              justify-center

              text-zinc-400
            "
          >
            No recently played songs yet.
          </div>

        )}

      </section>

    </motion.div>

  );

};

export default Library;