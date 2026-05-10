import {
  motion,
} from "framer-motion";

import {
  FaFire,
  FaHistory,
} from "react-icons/fa";

import SongCard
from "../components/music/SongCard";

import SkeletonCard
from "../components/music/SkeletonCard";

import { useMusic }
from "../context/MusicContext";

const Search = () => {

  const {

    songs,
    loading,

    search,

    handleSearch,

    recentSearches,

  } = useMusic();

  // TRENDING
  const trending = [

    "Lana Del Rey",
    "The Weeknd",
    "Travis Scott",
    "Drake",
    "Arijit Singh",
    "AP Dhillon",

  ];

  // CATEGORIES
  const categories = [

    {
      title: "Pop",
      color: "from-pink-500 to-red-500",
    },

    {
      title: "Hip Hop",
      color: "from-orange-500 to-yellow-500",
    },

    {
      title: "Chill",
      color: "from-cyan-500 to-blue-500",
    },

    {
      title: "Romance",
      color: "from-rose-500 to-pink-500",
    },

    {
      title: "Workout",
      color: "from-green-500 to-emerald-600",
    },

    {
      title: "Sad",
      color: "from-indigo-500 to-purple-600",
    },

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

          bg-gradient-to-br
          from-green-500
          via-emerald-600
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

        <div className="relative z-10">

          <p
            className="
              text-white/80

              text-xs
              sm:text-sm
              md:text-base

              mb-2
            "
          >
            Explore Music
          </p>

          <h1
            className="
              text-2xl
              sm:text-4xl
              md:text-5xl

              font-black

              leading-tight
            "
          >
            Search Your
            <br />
            Favorite Songs
          </h1>

        </div>

      </div>

      {/* RESULTS */}
      <section>

        <div
          className="
            flex
            items-center
            justify-between

            mb-4
          "
        >

          <h2
            className="
              text-xl
              sm:text-2xl

              font-bold
            "
          >
            Search Results
          </h2>

        </div>

        {/* EMPTY SEARCH */}
        {!search && (

          <div
            className="
              h-[220px]

              flex
              flex-col
              items-center
              justify-center

              text-center
            "
          >

            <motion.div

              animate={{
                y: [0, -8, 0],
              }}

              transition={{
                repeat: Infinity,
                duration: 2,
              }}

              className="
                text-6xl

                mb-4
              "
            >
              🎵
            </motion.div>

            <h2
              className="
                text-2xl
                font-bold

                mb-2
              "
            >
              Start Searching
            </h2>

            <p
              className="
                text-zinc-400
              "
            >
              Find your favorite songs,
              artists and albums.
            </p>

          </div>

        )}

        {/* LOADING */}
        {loading && (

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

            {[...Array(12)].map(
              (_, index) => (

              <SkeletonCard
                key={index}
              />

            ))}

          </div>

        )}

        {/* NO RESULTS */}
        {!loading &&
          search &&
          songs?.length === 0 && (

          <div
            className="
              h-[220px]

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
                duration: 1.8,
              }}

              className="
                text-6xl

                mb-4
              "
            >
              😭
            </motion.div>

            <h2
              className="
                text-2xl
                font-bold

                mb-2
              "
            >
              No Results Found
            </h2>

            <p
              className="
                text-zinc-400
              "
            >
              Try another artist or song.
            </p>

          </div>

        )}

        {/* SONGS */}
        {!loading &&
          search &&
          songs?.length > 0 && (

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

            {songs?.map(
              (song, index) => (

              <SongCard

                key={song.id}

                song={song}

                index={index}

                songs={songs}

              />

            ))}

          </div>

        )}

      </section>

      {/* TRENDING */}
      <section>

        <div
          className="
            flex
            items-center
            gap-3

            mb-4
          "
        >

          <FaFire
            className="
              text-orange-500
              text-lg
              sm:text-xl
            "
          />

          <h2
            className="
              text-lg
              sm:text-2xl

              font-bold
            "
          >
            Trending Searches
          </h2>

        </div>

        <div
          className="
            flex
            flex-wrap
            gap-2
            sm:gap-3
          "
        >

          {trending.map(
            (item, index) => (

            <motion.button

              key={index}

              whileHover={{
                scale: 1.05,
              }}

              whileTap={{
                scale: 0.95,
              }}

              onClick={() =>
                handleSearch(item)
              }

              className="
                px-3
                sm:px-4

                py-2

                rounded-full

                bg-[#181818]

                hover:bg-[#252525]

                text-sm
                sm:text-base

                transition-all
              "
            >

              {item}

            </motion.button>

          ))}

        </div>

      </section>

      {/* CATEGORIES */}
      <section>

        <h2
          className="
            text-lg
            sm:text-2xl

            font-bold

            mb-4
          "
        >
          Browse Categories
        </h2>

        <div
          className="
            grid

            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4

            gap-3
            sm:gap-4
          "
        >

          {categories.map(
            (category, index) => (

            <motion.div

              key={index}

              whileHover={{
                y: -4,
                scale: 1.03,
              }}

              whileTap={{
                scale: 0.97,
              }}

              onClick={() =>
                handleSearch(
                  category.title
                )
              }

              className={`
                relative

                overflow-hidden

                rounded-2xl

                h-24
                sm:h-32

                p-4

                bg-gradient-to-br
                ${category.color}

                cursor-pointer
              `}
            >

              <h3
                className="
                  text-lg
                  sm:text-2xl

                  font-black

                  relative
                  z-10
                "
              >
                {category.title}
              </h3>

              {/* GLOW */}
              <div
                className="
                  absolute
                  -bottom-10
                  -right-10

                  w-28
                  h-28

                  bg-white/20

                  rounded-full

                  blur-2xl
                "
              />

            </motion.div>

          ))}

        </div>

      </section>

      {/* RECENT */}
      {recentSearches.length > 0 && (

        <section>

          <div
            className="
              flex
              items-center
              gap-3

              mb-4
            "
          >

            <FaHistory
              className="
                text-green-500
                text-lg
              "
            />

            <h2
              className="
                text-lg
                sm:text-2xl

                font-bold
              "
            >
              Recent Searches
            </h2>

          </div>

          <div
            className="
              flex
              flex-wrap
              gap-2
              sm:gap-3
            "
          >

            {recentSearches.map(
              (item, index) => (

              <motion.button

                key={index}

                whileHover={{
                  scale: 1.05,
                }}

                whileTap={{
                  scale: 0.95,
                }}

                onClick={() =>
                  handleSearch(item)
                }

                className="
                  px-3
                  sm:px-4

                  py-2

                  rounded-full

                  bg-[#181818]

                  hover:bg-[#252525]

                  text-zinc-300

                  text-sm
                  sm:text-base

                  transition-all
                "
              >

                {item}

              </motion.button>

            ))}

          </div>

        </section>

      )}

    </motion.div>

  );

};

export default Search;