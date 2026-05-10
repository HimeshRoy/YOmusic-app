import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { TbMusicSearch } from "react-icons/tb";

import { SiNeteasecloudmusic } from "react-icons/si";

import { useMusic } from "../../context/MusicContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const {
    search,
    setSearch,
    handleSearch,

    recentSearches,
  } = useMusic();

  const navigate = useNavigate();

  const [focused, setFocused] = useState(false);

  // DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        handleSearch(search);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // QUICK SUGGESTIONS
  const suggestions = [
    "The Weeknd",
    "Drake",
    "Lana Del Rey",
    "Travis Scott",
    "Arijit Singh",
    "AP Dhillon",
  ].filter((item) =>
    item
      .toLowerCase()

      .includes(search.toLowerCase()),
  );

  return (
    <div
      className="
        h-20

        border-b
        border-zinc-800

        flex
        items-center
        justify-between

        px-4
        sm:px-6
        md:px-8
        lg:px-10

        bg-[#121212]/90

        backdrop-blur-xl

        sticky
        top-0

        z-40
      "
    >
      {/* LEFT */}
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        {/* MOBILE LOGO */}
        <div className="md:hidden">
          <h1
            className="
              text-2xl
              font-bold

              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                flex
                items-center

                text-green-500
              "
            >
              Y
              <SiNeteasecloudmusic
                className="
                  animate-spin
                  [animation-duration:8s]
                "
              />
            </span>

            <span>music</span>
          </h1>
        </div>

        {/* DESKTOP TITLE */}
        <h2
          className="
            hidden
            md:block

            text-3xl
            font-bold
          "
        >
          Discover
        </h2>
      </div>

      {/* RIGHT */}
      <div
        className="
          relative

          flex
          items-center
        "
      >
        {/* SEARCH */}
        <motion.div
          animate={{
            boxShadow: focused
              ? `
                  0 0 5px
                  rgba(
                    34,
                    197,
                    94,
                    0.25
                  )
                `
              : "none",
          }}
          className="
            text-base
            sm:text-lg

            flex
            items-center

            px-3
            sm:px-5

            py-2
            sm:py-3

            w-45
            sm:w-65
            md:w-87.5
            lg:w-105

            gap-3

            rounded-2xl

            bg-zinc-900

            border
            border-zinc-800

            focus-within:border-green-500

            transition-all

            relative
          "
        >
          <TbMusicSearch
            className="
              text-2xl
              text-green-500

              shrink-0
            "
          />

          <input
            type="text"
            value={search}
            placeholder="Search music..."
            onFocus={() => {
              setFocused(true);

              navigate("/search");
            }}
            onBlur={() =>
              setTimeout(() => {
                setFocused(false);
              }, 200)
            }
            onChange={(e) => {
              setSearch(e.target.value);

              navigate("/search");
            }}
            className="
              outline-none

              w-full

              bg-transparent

              text-sm
              sm:text-base

              placeholder:text-zinc-500
            "
          />

          {/* SUGGESTIONS */}
          <AnimatePresence>
            {focused && search && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                }}
                className="
                  absolute

                  top-[110%]
                  left-0

                  w-full

                  rounded-2xl

                  bg-[#181818]

                  border
                  border-zinc-800

                  overflow-hidden

                  shadow-2xl

                  z-50
                "
              >
                {/* SUGGESTIONS */}
                {suggestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearch(item);

                      handleSearch(item);
                    }}
                    className="
                      w-full

                      text-left

                      px-4
                      py-3

                      hover:bg-zinc-800

                      transition-all
                    "
                  >
                    {item}
                  </button>
                ))}

                {/* RECENT */}
                {recentSearches
                  .slice(0, 3)

                  .map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearch(item);

                        handleSearch(item);
                      }}
                      className="
                        w-full

                        text-left

                        px-4
                        py-3

                        text-zinc-400

                        hover:bg-zinc-800

                        transition-all
                      "
                    >
                      {item}
                    </button>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
