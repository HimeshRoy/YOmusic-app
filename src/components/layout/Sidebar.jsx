import { SiNeteasecloudmusic } from "react-icons/si";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  // ACTIVE STYLE
  const navStyle = ({ isActive }) => `

    flex
    items-center

    transition-all
    duration-300

    ${isActive ? "text-green-500" : "text-zinc-400 hover:text-white"}

  `;

  return (
    <>
      {/* ========================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ========================= */}

      <div
        className="
          hidden
          md:flex

          w-60

          bg-black

          p-6

          flex-col

          gap-10

          border-r
          border-zinc-900

          shrink-0
        "
      >
        {/* LOGO */}
        <div>
          <h1
            className="
              text-3xl
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

                hover:text-white

                transition-all
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

            <span
              className="
                text-white
                hover:text-green-500
                transition-all
              "
            >
              music
            </span>
          </h1>
        </div>

        {/* MENU */}
        <div
          className="
            flex
            flex-col
            gap-3
          "
        >
          {/* HOME */}
          <NavLink
            to="/"
            className={({ isActive }) => `
              flex
              items-center
              gap-4

              px-4
              py-3

              rounded-2xl

              transition-all
              duration-300

              ${
                isActive
                  ? "bg-zinc-900 text-green-500"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-green-500"
              }
            `}
          >
            <GoHomeFill size={24} />

            <span className="font-medium">Home</span>
          </NavLink>

          {/* SEARCH */}
          <NavLink
            to="/search"
            className={({ isActive }) => `
              flex
              items-center
              gap-4

              px-4
              py-3

              rounded-2xl

              transition-all
              duration-300

              ${
                isActive
                  ? "bg-zinc-900 text-green-500"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-green-500"
              }
            `}
          >
            <IoSearch size={24} />

            <span className="font-medium">Search</span>
          </NavLink>

          {/* FAVORITES */}
          <NavLink
            to="/favorites"
            className={({ isActive }) => `
              flex
              items-center
              gap-4

              px-4
              py-3

              rounded-2xl

              transition-all
              duration-300

              ${
                isActive
                  ? "bg-zinc-900 text-green-500"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-green-500"
              }
            `}
          >
            <FaHeart size={22} />

            <span className="font-medium">Favorites</span>
          </NavLink>
        </div>
      </div>

      {/* ========================= */}
      {/* MOBILE NAVIGATION */}
      {/* ========================= */}

      <div
        className="
          md:hidden

          fixed
          bottom-0
          left-0

          w-full

          h-17.5

          bg-black/95
          backdrop-blur-xl

          border-t
          border-zinc-800

          flex
          items-center
          justify-around

          z-999
        "
      >
        {/* HOME */}
        <NavLink to="/" className={navStyle}>
          {({ isActive }) => (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center

                relative

                transition-all
                duration-300
              "
            >
              {/* ACTIVE INDICATOR */}
              {isActive && (
                <div
                  className="
                    absolute
                    -top-2

                    w-10
                    h-1

                    rounded-full

                    bg-green-500
                  "
                />
              )}

              <GoHomeFill
                size={22}
                className={`
                  transition-all
                  duration-300

                  ${isActive ? "scale-110" : "scale-100"}
                `}
              />

              <span
                className="
                  text-[10px]
                  mt-1
                  font-medium
                "
              >
                Home
              </span>
            </div>
          )}
        </NavLink>

        {/* SEARCH */}
        <NavLink to="/search" className={navStyle}>
          {({ isActive }) => (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center

                relative

                transition-all
                duration-300
              "
            >
              {isActive && (
                <div
                  className="
                    absolute
                    -top-2

                    w-10
                    h-1

                    rounded-full

                    bg-green-500
                  "
                />
              )}

              <IoSearch
                size={22}
                className={`
                  transition-all
                  duration-300

                  ${isActive ? "scale-110" : "scale-100"}
                `}
              />

              <span
                className="
                  text-[10px]
                  mt-1
                  font-medium
                "
              >
                Search
              </span>
            </div>
          )}
        </NavLink>

        {/* FAVORITES */}
        <NavLink to="/favorites" className={navStyle}>
          {({ isActive }) => (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center

                relative

                transition-all
                duration-300
              "
            >
              {isActive && (
                <div
                  className="
                    absolute
                    -top-2

                    w-10
                    h-1

                    rounded-full

                    bg-green-500
                  "
                />
              )}

              <FaHeart
                size={20}
                className={`
                  transition-all
                  duration-300

                  ${isActive ? "scale-110" : "scale-100"}
                `}
              />

              <span
                className="
                  text-[10px]
                  mt-1
                  font-medium
                "
              >
                Favorites
              </span>
            </div>
          )}
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
