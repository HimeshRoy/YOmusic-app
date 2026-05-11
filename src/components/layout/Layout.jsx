import Sidebar from "./Sidebar";

import Navbar from "./Navbar";

import Player from "./Player";

import QueuePanel from "../player/QueuePanel";

import {
  usePlayer,
} from "../../context/PlayerContext";

const Layout = ({
  children,
  setQuery,
}) => {

  const {

    queueOpen,
    setQueueOpen,

  } = usePlayer();

  return (

    <div
      className="
        h-screen
        bg-black
        text-white

        flex
        flex-col

        overflow-hidden
      "
    >

      {/* MAIN LAYOUT */}
      <div
        className="
          flex
          flex-1

          overflow-hidden
        "
      >

        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT */}
        <div
          className="
            flex-1

            flex
            flex-col

            bg-[#121212]

            overflow-hidden
          "
        >

          {/* NAVBAR */}
          <Navbar
            setQuery={setQuery}
          />

          {/* SCROLLABLE */}
          <main
            className="
              flex-1

              overflow-y-auto

              px-4
              py-5

              sm:px-6
              md:px-8
              lg:px-10

              pb-[170px]
              md:pb-[120px]
            "
          >

            {children}

          </main>

        </div>

      </div>

      {/* PLAYER */}
      <Player />

      {/* QUEUE PANEL */}
      <QueuePanel

        open={queueOpen}

        setOpen={setQueueOpen}

      />

    </div>

  );

};

export default Layout;