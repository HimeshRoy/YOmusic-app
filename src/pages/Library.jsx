import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import {
  FaClock,
  FaHeart,
  FaMusic,
  FaHeadphones,
  FaListUl,
  FaPlus,
  FaChartBar,
  FaSignOutAlt,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";

import { useState } from "react";

import { deleteUser } from "firebase/auth";

import SongCard from "../components/music/SongCard";

import CreatePlaylistModal from "../components/playlist/CreatePlaylistModal";

import { usePlayer } from "../context/PlayerContext";

import { useFavorites } from "../context/FavoritesContext";

import { usePlaylists } from "../context/PlaylistContext";

import { useAuth } from "../context/AuthContext";

const Library = () => {
  const { recentlyPlayed } = usePlayer();

  const { favorites } = useFavorites();

  const { playlists } = usePlaylists();

  const {
    user,

    logout,
  } = useAuth();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // TOTAL LISTENS
  const totalListens = recentlyPlayed.length;

  // UNIQUE ARTISTS
  const artists = [
    ...new Set(recentlyPlayed.map((song) => song.artists.primary[0]?.name)),
  ];

  // TOP ARTISTS
  const topArtists = Object.values(
    recentlyPlayed.reduce(
      (acc, song) => {
        const artist = song.artists?.primary?.[0];

        if (!artist) return acc;

        if (!acc[artist.name]) {
          acc[artist.name] = {
            ...artist,

            count: 0,

            image: song.image?.[2]?.url,
          };
        }

        acc[artist.name].count += 1;

        return acc;
      },

      {},
    ),
  )

    .sort((a, b) => b.count - a.count)

    .slice(0, 6);

  // DELETE ACCOUNT
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account?",
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(user);

      alert("Account deleted successfully.");
    } catch (error) {
      console.log(error);

      alert("Please login again before deleting account.");
    }
  };

  return (
    <>
      {/* MODAL */}
      <CreatePlaylistModal open={open} setOpen={setOpen} />

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
          pb-28
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
              Library
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
              {recentlyPlayed.length}
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
            onClick={() => navigate("/favorites")}
            className="
              bg-[#181818]

              rounded-2xl

              p-5

              border
              border-zinc-800

              cursor-pointer
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
              {favorites.length}
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
              {artists.length}
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

        {/* STATS CARD */}
        <div
          onClick={() => navigate("/stats")}
          className="
            bg-[#181818]

            rounded-2xl

            p-5

            border
            border-zinc-800

            hover:border-green-500/40

            transition-all

            cursor-pointer
          "
        >
          <FaChartBar
            className="
              text-purple-500
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
            Stats
          </h2>

          <p
            className="
              text-zinc-400
              mt-1
            "
          >
            Listening Insights
          </p>
        </div>

        {/* PLAYLISTS */}
        <section>
          {/* HEADER */}
          <div
            className="
      flex
      items-center
      justify-between

      mb-5
    "
          >
            <div
              className="
        flex
        items-center
        gap-3
      "
            >
              <FaListUl
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
                Your Playlists
              </h2>
            </div>

            {/* CREATE */}
            <button
              onClick={() => setOpen(true)}
              className="
        bg-green-500
        hover:bg-green-400

        text-black

        px-4
        py-2

        rounded-xl

        flex
        items-center
        gap-2

        font-semibold

        transition-all
      "
            >
              <FaPlus />
              Create
            </button>
          </div>

          {/* PLAYLIST LIST / GRID */}
          {playlists.length > 0 ? (
            <div
              className="
        flex
        flex-col

        md:grid
        md:grid-cols-4
        lg:grid-cols-5

        gap-4
      "
            >
              {playlists.map((playlist) => (
                <motion.div
                  onClick={() => navigate(`/playlist/${playlist.id}`)}
                  whileHover={{
                    y: -5,
                  }}
                  key={playlist.id}
                  className="
            bg-[#181818]

            rounded-2xl

            border
            border-zinc-800

            hover:border-green-500/40

            transition-all

            cursor-pointer

            flex
            items-center

            gap-4

            p-3

            md:block
            md:p-4
          "
                >
                  {/* COVER */}
                  <div
                    className="
              w-15
              h-15

              flex-shrink-0

              md:w-full
              md:aspect-square
              md:h-auto

              rounded-2xl

              bg-gradient-to-br
              from-green-500
              to-black

              flex
              items-center
              justify-center

              md:mb-4
            "
                  >
                    <FaListUl
                      className="
                text-2xl
                md:text-4xl
              "
                    />
                  </div>

                  {/* INFO */}
                  <div
                    className="
              flex-1
              min-w-0
            "
                  >
                    <h3
                      className="
                font-bold

                truncate

                text-lg
                md:text-base
              "
                    >
                      {playlist.name}
                    </h3>

                    <p
                      className="
                text-zinc-400

                text-sm

                mt-1
              "
                    >
                      {playlist.songs.length} songs
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              className="
        h-[180px]

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
              No playlists created yet.
            </div>
          )}
        </section>

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
              {recentlyPlayed.map((song, index) => (
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

        {/* TOP ARTISTS */}
        <section>
          {/* HEADER */}
          <div
            className="
              flex
              items-center
              gap-3

              mb-5
            "
          >
            <FaMusic
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
              Top Artists
            </h2>
          </div>

          {topArtists.length > 0 ? (
            <div
              className="
                grid

                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-6

                gap-4
              "
            >
              {topArtists.map((artist) => (
                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  key={artist.name}
                  className="
                    bg-[#181818]

                    border
                    border-zinc-800

                    rounded-3xl

                    p-4

                    text-center

                    hover:border-green-500/40

                    transition-all
                  "
                >
                  {/* IMAGE */}
                  <img
                    src={artist.image}
                    alt=""
                    className="
                      w-24
                      h-24

                      rounded-full

                      object-cover

                      mx-auto

                      mb-4
                    "
                  />

                  {/* NAME */}
                  <h3
                    className="
                      font-bold

                      truncate
                    "
                  >
                    {artist.name}
                  </h3>

                  {/* COUNT */}
                  <p
                    className="
                      text-zinc-400
                      text-sm

                      mt-1
                    "
                  >
                    {artist.count} plays
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              className="
                h-[180px]

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
              No artist activity yet.
            </div>
          )}
        </section>

        {/* ACCOUNT */}
        <section>
          {/* HEADER */}
          <div
            className="
              flex
              items-center
              gap-3

              mb-5
            "
          >
            <FaUserCircle
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
              Account
            </h2>
          </div>

          {/* CARD */}
          <div
            className="
              bg-[#181818]

              border
              border-zinc-800

              rounded-3xl

              p-5
              sm:p-6

              flex
              flex-col
              sm:flex-row

              items-start
              sm:items-center

              justify-between

              gap-6
            "
          >
            {/* USER INFO */}
            <div
              className="
                flex
                items-center

                gap-4
              "
            >
              {/* AVATAR */}
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  className="
                    w-16
                    h-16

                    rounded-full

                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    w-16
                    h-16

                    rounded-full

                    bg-green-500

                    flex
                    items-center
                    justify-center

                    text-2xl
                    font-bold

                    text-black
                  "
                >
                  {user?.displayName?.[0]}
                </div>
              )}

              {/* INFO */}
              <div>
                <h3
                  className="
                    text-xl
                    font-bold
                  "
                >
                  {user?.displayName}
                </h3>

                <p
                  className="
                    text-zinc-400

                    text-sm

                    mt-1
                  "
                >
                  {user?.email}
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div
              className="
                flex
                items-center

                gap-3

                w-full
                sm:w-auto
              "
            >
              {/* LOGOUT */}
              <button
                onClick={logout}
                className="
                  flex-1
                  sm:flex-none

                  px-5
                  py-3

                  rounded-2xl

                  bg-zinc-800
                  hover:bg-zinc-700

                  transition-all

                  flex
                  items-center
                  justify-center

                  gap-2

                  font-semibold
                "
              >
                <FaSignOutAlt />
                Logout
              </button>

              {/* DELETE */}
              <button
                onClick={handleDeleteAccount}
                className="
                  flex-1
                  sm:flex-none

                  px-5
                  py-3

                  rounded-2xl

                  bg-red-500/20
                  hover:bg-red-500/30

                  text-red-400

                  transition-all

                  flex
                  items-center
                  justify-center

                  gap-2

                  font-semibold
                "
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Library;
