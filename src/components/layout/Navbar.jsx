import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  TbMusicSearch,
} from "react-icons/tb";

import {
  SiNeteasecloudmusic,
} from "react-icons/si";

import {
  FaUserCircle,
} from "react-icons/fa";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  useMusic,
} from "../../context/MusicContext";

import {
  useNavigate,
} from "react-router-dom";

const Navbar = () => {

  const {

    search,

    setSearch,

    handleSearch,

    recentSearches,

  } = useMusic();

  const {

    user,

    login,

    logout,

  } = useAuth();

  const navigate =
    useNavigate();

  const [focused,
    setFocused] =
    useState(false);

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
      .includes(
        search.toLowerCase()
      )

  );

  return (

    <div
      className="
        h-18
        sm:h-20

        border-b
        border-zinc-800

        flex
        items-center
        justify-between

        px-3
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

          shrink-0
        "
      >

        {/* MOBILE LOGO */}
        <div className="md:hidden">

          <h1
            className="
              text-xl

              font-bold

              flex
              items-center

              gap-1
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

                  text-lg
                "
              />

            </span>

            <span>
              music
            </span>

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
          flex
          items-center

          gap-2
          sm:gap-4
        "
      >

        {/* SEARCH */}
        <div
          className="
            relative
          "
        >

          <motion.div

            animate={{
              boxShadow:
                focused

                  ? `
                    0 0 12px
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
              flex
              items-center

              px-3
              sm:px-5

              py-2
              sm:py-3

              w-36
              sm:w-60
              md:w-80
              lg:w-[420px]

              gap-2
              sm:gap-3

              rounded-2xl

              bg-zinc-900

              border
              border-zinc-800

              focus-within:border-green-500

              transition-all
            "
          >

            <TbMusicSearch
              className="
                text-lg
                sm:text-2xl

                text-green-500

                shrink-0
              "
            />

            <input

              type="text"

              value={search}

              placeholder="Search..."

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

                const value =
                  e.target.value;

                setSearch(value);

                navigate("/search");

                if (value.trim()) {

                  handleSearch(value);

                }

              }}

              className="
                outline-none

                w-full

                bg-transparent

                text-xs
                sm:text-base

                placeholder:text-zinc-500
              "
            />

          </motion.div>

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
                {suggestions.map(
                  (
                    item,
                    index
                  ) => (

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
                  .map((
                    item,
                    index
                  ) => (

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

        </div>

        {/* USER */}
        {user ? (

          <div
            className="
              flex
              items-center

              gap-2
              sm:gap-3
            "
          >

            {/* IMAGE */}
            <img

              src={user.photoURL}

              alt="user"

              className="
                w-9
                h-9

                sm:w-10
                sm:h-10

                rounded-full

                border
                border-green-500

                object-cover

                shrink-0
              "
            />

            {/* NAME */}
            <div
              className="
                hidden
                lg:block
              "
            >

              <h3
                className="
                  text-sm
                  font-semibold
                "
              >
                {user.displayName}
              </h3>

              <p
                className="
                  text-xs
                  text-zinc-400
                "
              >
                Premium User
              </p>

            </div>

            {/* LOGOUT */}
            <button

              onClick={logout}

              className="
                hidden
                md:block

                bg-zinc-900
                hover:bg-zinc-800

                px-4
                py-2

                rounded-xl

                text-sm

                transition-all
              "
            >
              Logout
            </button>

          </div>

        ) : (

          <button

            onClick={login}

            className="
              w-10
              h-10

              sm:w-auto
              sm:h-auto

              sm:px-5
              sm:py-3

              rounded-2xl

              bg-green-500
              hover:bg-green-400

              text-black

              font-semibold

              transition-all

              flex
              items-center
              justify-center
              gap-2

              shrink-0
            "
          >

            <FaUserCircle />

            <span
              className="
                hidden
                md:block
              "
            >
              Login
            </span>

          </button>

        )}

      </div>

    </div>

  );

};

export default Navbar;