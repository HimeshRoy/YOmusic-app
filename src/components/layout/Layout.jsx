import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Player from "./Player";

const Layout = ({ children, setQuery }) => {
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

      {/* Main Layout */}
      <div
        className="
          flex
          flex-1
          overflow-hidden
        "
      >

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div
          className="
            flex-1
            flex
            flex-col
            bg-[#121212]
            overflow-hidden
          "
        >

          {/* Navbar */}
          <Navbar setQuery={setQuery} />

          {/* Scrollable Content */}
          <main
            className="
              flex-1
              overflow-y-auto
              px-4
              py-5
              sm:px-6
              md:px-8
              lg:px-10
              
              pb-42.5
              md:pb-30
            "
          >
            {children}
          </main>

        </div>

      </div>

      {/* Player */}
      <Player />

    </div>
  );
};

export default Layout;