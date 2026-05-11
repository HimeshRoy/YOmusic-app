import {
  motion,
} from "framer-motion";

import {
  FaHeart,
  FaMusic,
} from "react-icons/fa";

import SongCard
from "../components/music/SongCard";

import {
  useFavorites,
} from "../context/FavoritesContext";

const Favorites = () => {

  const {

    favorites,

    loading,

  } = useFavorites();

  // LOADING
  if (loading) {

    return (

      <div
        className="
          h-[70vh]

          flex
          items-center
          justify-center

          text-zinc-400

          text-lg
        "
      >

        Loading favorites...

      </div>

    );

  }

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
        space-y-6
        md:space-y-8
      "
    >

      {/* HERO */}
      <div
        className="
          relative

          overflow-hidden

          rounded-3xl

          p-5
          sm:p-6
          md:p-8

          bg-linear-to-br
          from-pink-500
          via-rose-500
          to-black
        "
      >

        {/* GLOW */}
        <div
          className="
            absolute
            -top-20
            -right-20

            w-60
            h-60

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

          <div
            className="
              flex
              items-center
              gap-3

              mb-3
            "
          >

            <div
              className="
                w-12
                h-12

                rounded-2xl

                bg-white/20

                flex
                items-center
                justify-center

                backdrop-blur-lg
              "
            >

              <FaHeart
                className="
                  text-white
                  text-xl
                "
              />

            </div>

            <div>

              <p
                className="
                  text-white/80

                  text-xs
                  sm:text-sm
                "
              >
                Your Library
              </p>

              <h1
                className="
                  text-2xl
                  sm:text-4xl
                  md:text-5xl

                  font-black
                "
              >
                Favorite Songs
              </h1>

            </div>

          </div>

          <p
            className="
              text-sm
              sm:text-base

              text-white/80
            "
          >
            {favorites.length}
            {" "}
            liked songs saved in your collection.
          </p>

        </div>

      </div>

      {/* SONGS */}
      {favorites.length > 0 ? (

        <section>

          <div
            className="
              flex
              items-center
              gap-3

              mb-4
            "
          >

            <FaMusic
              className="
                text-pink-500
              "
            />

            <h2
              className="
                text-xl
                sm:text-2xl

                font-bold
              "
            >
              Your Favorites
            </h2>

          </div>

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

            {favorites.map(
              (song, index) => (

              <SongCard

                key={song.id}

                song={song}

                index={index}

                songs={favorites}

              />

            ))}

          </div>

        </section>

      ) : (

        /* EMPTY */
        <div
          className="
            h-[350px]

            flex
            flex-col
            items-center
            justify-center

            text-center
          "
        >

          <motion.div

            animate={{
              scale: [1, 1.1, 1],
            }}

            transition={{
              repeat: Infinity,
              duration: 2,
            }}

            className="
              text-7xl

              mb-5
            "
          >
            ❤️
          </motion.div>

          <h2
            className="
              text-2xl
              sm:text-3xl

              font-bold

              mb-3
            "
          >
            No Favorite Songs Yet
          </h2>

          <p
            className="
              text-zinc-400

              max-w-[450px]

              text-sm
              sm:text-base
            "
          >
            Start liking songs to build
            your personal music library.
          </p>

        </div>

      )}

    </motion.div>

  );

};

export default Favorites;