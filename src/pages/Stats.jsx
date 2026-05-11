import {
  motion,
} from "framer-motion";

import {
  FaChartBar,
  FaMusic,
  FaHeart,
  FaCompactDisc,
  FaHeadphones,
} from "react-icons/fa";

import {
  useRecentlyPlayed,
} from "../context/RecentlyPlayedContext";

import {
  useFavorites,
} from "../context/FavoritesContext";

import {
  usePlaylists,
} from "../context/PlaylistContext";

const Stats = () => {

  const {

    recentlyPlayed,

  } = useRecentlyPlayed();

  const {

    favorites,

  } = useFavorites();

  const {

    playlists,

  } = usePlaylists();

  // TOTAL SONGS
  const totalSongsPlayed =
    recentlyPlayed.length;

  // TOTAL PLAYLISTS
  const totalPlaylists =
    playlists.length;

  // TOTAL FAVORITES
  const totalFavorites =
    favorites.length;

  // UNIQUE ARTISTS
  const uniqueArtists =
    new Set(

      recentlyPlayed.map(
        (song) =>

          song.primaryArtists
      )

    ).size;

  // TOP ARTIST
  const artistCount = {};

  recentlyPlayed.forEach(
    (song) => {

    const artist =
      song.primaryArtists;

    if (!artist) return;

    artistCount[artist] =

      (artistCount[artist] || 0)
      + 1;

  });

  const topArtist =

    Object.keys(
      artistCount
    ).reduce(

      (a, b) =>

        artistCount[a] >
        artistCount[b]

          ? a

          : b,

      "No Data"

    );

  // STATS CARDS
  const stats = [

    {

      title:
        "Songs Played",

      value:
        totalSongsPlayed,

      icon:
        <FaHeadphones />,

    },

    {

      title:
        "Favorite Songs",

      value:
        totalFavorites,

      icon:
        <FaHeart />,

    },

    {

      title:
        "Playlists",

      value:
        totalPlaylists,

      icon:
        <FaCompactDisc />,

    },

    {

      title:
        "Artists Played",

      value:
        uniqueArtists,

      icon:
        <FaMusic />,

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
          sm:p-8

          bg-linear-to-br
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

              mb-4
            "
          >

            <div
              className="
                w-14
                h-14

                rounded-2xl

                bg-white/20

                flex
                items-center
                justify-center

                backdrop-blur-lg
              "
            >

              <FaChartBar
                className="
                  text-2xl
                "
              />

            </div>

            <div>

              <p
                className="
                  text-white/80

                  text-sm
                "
              >
                Your Listening Overview
              </p>

              <h1
                className="
                  text-3xl
                  sm:text-5xl

                  font-black
                "
              >
                Listening Stats
              </h1>

            </div>

          </div>

          <p
            className="
              text-white/80

              text-sm
              sm:text-base
            "
          >
            Your music journey,
            habits and favorite artists.
          </p>

        </div>

      </div>

      {/* STATS GRID */}
      <div
        className="
          grid

          grid-cols-2
          lg:grid-cols-4

          gap-4
        "
      >

        {stats.map(
          (
            stat,
            index
          ) => (

          <motion.div

            key={index}

            whileHover={{
              y: -5,
            }}

            className="
              bg-zinc-900

              border
              border-zinc-800

              rounded-3xl

              p-5

              flex
              flex-col
              gap-4
            "
          >

            <div
              className="
                w-12
                h-12

                rounded-2xl

                bg-green-500/20

                text-green-400

                flex
                items-center
                justify-center

                text-xl
              "
            >

              {stat.icon}

            </div>

            <div>

              <h2
                className="
                  text-2xl
                  sm:text-3xl

                  font-black
                "
              >
                {stat.value}
              </h2>

              <p
                className="
                  text-zinc-400

                  text-sm
                "
              >
                {stat.title}
              </p>

            </div>

          </motion.div>

        ))}

      </div>

      {/* TOP ARTIST */}
      <motion.div

        whileHover={{
          scale: 1.01,
        }}

        className="
          rounded-3xl

          border
          border-zinc-800

          bg-zinc-900

          p-6
          sm:p-8
        "
      >

        <p
          className="
            text-zinc-400

            mb-2
          "
        >
          Most Played Artist
        </p>

        <h2
          className="
            text-3xl
            sm:text-5xl

            font-black

            text-green-400
          "
        >
          {topArtist}
        </h2>

      </motion.div>

      {/* RECENT SONGS */}
      <div>

        <h2
          className="
            text-2xl

            font-bold

            mb-5
          "
        >
          Recently Played
        </h2>

        <div
          className="
            grid

            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6

            gap-4
          "
        >

          {recentlyPlayed
            .slice(0, 12)
            .map((song) => (

            <div

              key={song.id}

              className="
                bg-zinc-900

                border
                border-zinc-800

                rounded-2xl

                overflow-hidden
              "
            >

              <img

                src={
                  song.image[2].url
                }

                alt=""

                className="
                  w-full

                  aspect-square

                  object-cover
                "
              />

              <div
                className="
                  p-3
                "
              >

                <h3
                  className="
                    font-semibold

                    line-clamp-1
                  "
                >
                  {song.name}
                </h3>

                <p
                  className="
                    text-zinc-400

                    text-sm

                    line-clamp-1
                  "
                >
                  {
                    song.primaryArtists
                  }
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </motion.div>

  );

};

export default Stats;