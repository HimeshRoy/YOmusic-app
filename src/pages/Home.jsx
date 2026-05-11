import { useEffect, useState } from "react";

import { FaPlay } from "react-icons/fa";

import { usePlayer } from "../context/PlayerContext";

import SongCard from "../components/music/SongCard";

import SkeletonCard from "../components/music/SkeletonCard";

import { useFavorites } from "../context/FavoritesContext";

import { useRecentlyPlayed } from "../context/RecentlyPlayedContext";

import { searchMusic } from "../services/musicApi";

const Home = ({ songs, loading }) => {
  const { favorites } = useFavorites();

  const { recentlyPlayed } = useRecentlyPlayed();

  // AI RECOMMENDATIONS
  const [recommendedSongs, setRecommendedSongs] = useState([]);

  const [topArtist, setTopArtist] = useState("");

  const {
    currentSong,

    currentTime,

    duration,

    setIsPlaying,
  } = usePlayer();

  // GET TOP ARTIST
  useEffect(() => {
    const allSongs = [...favorites, ...recentlyPlayed];

    if (allSongs.length === 0) return;

    const artistMap = {};

    allSongs.forEach((song) => {
      const artist = song.primaryArtists || song.artists?.primary?.[0]?.name;

      if (!artist) return;

      artistMap[artist] = (artistMap[artist] || 0) + 1;
    });

    const bestArtist = Object.keys(artistMap).reduce((a, b) =>
      artistMap[a] > artistMap[b] ? a : b,
    );

    setTopArtist(bestArtist);
  }, [favorites, recentlyPlayed]);

  // FETCH RECOMMENDATIONS
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!topArtist) return;

      try {
        const data = await searchMusic(topArtist);

        setRecommendedSongs(data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecommendations();
  }, [topArtist]);

  return (
    <div
      className="
        space-y-6
        md:space-y-10
      "
    >
      {/* HERO */}
      <div
        className="
          relative

          h-[170px]
          sm:h-[250px]
          md:h-[360px]

          rounded-3xl

          overflow-hidden
        "
      >
        {/* BACKGROUND */}
        <img
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1600&auto=format&fit=crop"
          alt="hero"
          className="
            absolute
            inset-0

            w-full
            h-full

            object-cover
          "
        />

        {/* OVERLAY */}
        <div
          className="
            absolute
            inset-0

            bg-gradient-to-r
            from-black
            via-black/70
            to-black/20
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative
            z-10

            h-full

            flex
            flex-col
            justify-end

            p-4
            sm:p-8
            md:p-10
          "
        >
          <p
            className="
              text-green-400

              text-xs
              sm:text-base

              mb-1
            "
          >
            Trending Playlist
          </p>

          <h1
            className="
              text-2xl
              sm:text-5xl
              md:text-6xl

              font-black

              leading-tight

              mb-1
            "
          >
            Feel The Music
          </h1>

          <p
            className="
              hidden
              sm:block

              text-zinc-300

              text-sm
              md:text-lg

              max-w-[600px]
            "
          >
            Discover millions of songs and artists.
          </p>
        </div>
      </div>

      {/* CONTINUE LISTENING */}
      {currentSong && (
        <section>
          <div
            className="
        flex
        items-center
        justify-between

        mb-4
      "
          >
            <div>
              <h2
                className="
            text-lg
            sm:text-3xl

            font-bold
          "
              >
                Continue Listening
              </h2>

              <p
                className="
            text-zinc-400

            text-xs
            sm:text-base

            mt-1
          "
              >
                Resume where you left off
              </p>
            </div>
          </div>

          <div
            className="
        relative

        overflow-hidden

        rounded-2xl

        border
        border-zinc-800

        bg-zinc-900

        p-3
        sm:p-6

        flex
        items-center

        gap-3
        sm:gap-5
      "
          >
            {/* BG GLOW */}
            <div
              className="
          absolute

          -right-10
          top-0

          w-32
          h-32

          bg-green-500/10

          rounded-full

          blur-3xl
        "
            />

            {/* IMAGE */}
            <img
              src={currentSong.image[2].url}
              alt=""
              className="
          relative
          z-10

          w-20
          h-20

          sm:w-32
          sm:h-32

          rounded-xl

          object-cover

          shrink-0
        "
            />

            {/* INFO */}
            <div
              className="
          relative
          z-10

          flex-1

          min-w-0
        "
            >
              <p
                className="
            text-green-500

            text-[10px]
            sm:text-sm

            mb-1
          "
              >
                Currently Playing
              </p>

              <h2
                className="
            text-lg
            sm:text-4xl

            font-black

            line-clamp-1

            mb-1
          "
              >
                {currentSong.name}
              </h2>

              <p
                className="
            text-zinc-400

            text-xs
            sm:text-lg

            line-clamp-1
          "
              >
                {currentSong.artists?.primary?.[0]?.name}
              </p>

              {/* PROGRESS */}
              <div
                className="
            mt-3
          "
              >
                <div
                  className="
              w-full

              h-1.5

              rounded-full

              bg-zinc-800

              overflow-hidden
            "
                >
                  <div
                    style={{
                      width: `
                  ${duration ? (currentTime / duration) * 100 : 0}%
                `,
                    }}
                    className="
                h-full

                bg-green-500

                rounded-full
              "
                  />
                </div>
              </div>
            </div>

            {/* PLAY BUTTON */}
            <button
              onClick={() => setIsPlaying(true)}
              className="
          relative
          z-10

          shrink-0

          w-12
          h-12

          sm:w-16
          sm:h-16

          rounded-full

          bg-green-500

          text-black

          flex
          items-center
          justify-center

          text-sm
          sm:text-xl

          hover:scale-110

          transition-all
        "
            >
              <FaPlay />
            </button>
          </div>
        </section>
      )}

      {/* AI RECOMMENDATIONS */}
      {recommendedSongs.length > 0 && (
        <section>
          <div
            className="
              flex
              items-center
              justify-between

              mb-5
            "
          >
            <div>
              <h2
                className="
                  text-xl
                  sm:text-3xl

                  font-bold
                "
              >
                Recommended For You
              </h2>

              <p
                className="
                  text-zinc-400

                  text-xs
                  sm:text-base

                  mt-1
                "
              >
                Because you listen to {topArtist}
              </p>
            </div>
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
            {recommendedSongs.slice(0, 12).map((song, index) => (
              <SongCard
                key={song.id}
                song={song}
                index={index}
                songs={recommendedSongs}
              />
            ))}
          </div>
        </section>
      )}

      {/* HEADING */}
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h2
            className="
              text-xl
              sm:text-3xl

              font-bold
            "
          >
            Trending Songs
          </h2>

          <p
            className="
              text-zinc-400

              text-xs
              sm:text-base

              mt-1
            "
          >
            Updated daily
          </p>
        </div>
      </div>

      {/* SONG GRID */}
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
        {loading
          ? [...Array(12)].map((_, index) => <SkeletonCard key={index} />)
          : songs?.map((song, index) => (
              <SongCard key={song.id} song={song} index={index} songs={songs} />
            ))}
      </div>

      {/* EMPTY */}
      {!loading && songs?.length === 0 && (
        <div
          className="
            h-[250px]

            flex
            items-center
            justify-center

            text-center
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-bold

                mb-2
              "
            >
              No Songs Found 🎵
            </h2>

            <p
              className="
                text-zinc-400
                text-sm
              "
            >
              Try another search.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
