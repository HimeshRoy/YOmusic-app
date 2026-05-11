import { useEffect, useState } from "react";

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import Layout
from "./components/layout/Layout";

import Home
from "./pages/Home";

import Search
from "./pages/Search";

import Favorites
from "./pages/Favorites";

import Library
from "./pages/Library";

import PlaylistDetails
from "./pages/PlaylistDetails";

import Stats
from "./pages/Stats";

import {
  searchMusic,
} from "./services/musicApi";

const App = () => {

  const location =
    useLocation();

  const [query,
    setQuery] =
    useState("lanadelrey");

  const [songs,
    setSongs] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  // FETCH SONGS
  useEffect(() => {

    const fetchSongs =
      async () => {

      try {

        setLoading(true);

        const data =
          await searchMusic(query);

        setSongs(data || []);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchSongs();

  }, [query]);

  return (

    <Layout setQuery={setQuery}>

      <AnimatePresence mode="wait">

        <Routes
          location={location}
          key={location.pathname}
        >

          {/* HOME */}
          <Route
            path="/"
            element={

              <motion.div

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                exit={{
                  opacity: 0,
                  y: -20,
                }}

                transition={{
                  duration: 0.3,
                }}
              >

                <Home
                  songs={songs}
                  loading={loading}
                />

              </motion.div>

            }
          />

          {/* SEARCH */}
          <Route
            path="/search"
            element={

              <motion.div

                initial={{
                  opacity: 0,
                  x: 40,
                }}

                animate={{
                  opacity: 1,
                  x: 0,
                }}

                exit={{
                  opacity: 0,
                  x: -40,
                }}

                transition={{
                  duration: 0.3,
                }}
              >

                <Search />

              </motion.div>

            }
          />

          {/* FAVORITES */}
          <Route
            path="/favorites"
            element={

              <motion.div

                initial={{
                  opacity: 0,
                  scale: 0.97,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                exit={{
                  opacity: 0,
                  scale: 0.97,
                }}

                transition={{
                  duration: 0.3,
                }}
              >

                <Favorites />

              </motion.div>

            }
          />

          {/* LIBRARY */}
          <Route
            path="/library"
            element={

              <motion.div

                initial={{
                  opacity: 0,
                  scale: 0.97,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                exit={{
                  opacity: 0,
                  scale: 0.97,
                }}

                transition={{
                  duration: 0.3,
                }}
              >

                <Library />

              </motion.div>

            }
          />

          {/* PLAYLIST DETAILS */}
          <Route
            path="/playlist/:id"
            element={

              <motion.div

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                exit={{
                  opacity: 0,
                  y: -20,
                }}

                transition={{
                  duration: 0.3,
                }}
              >

                <PlaylistDetails />

              </motion.div>

            }
          />

          {/* STATS */}
          <Route
            path="/stats"
            element={

              <motion.div

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                exit={{
                  opacity: 0,
                  y: -20,
                }}

                transition={{
                  duration: 0.3,
                }}
              >

                <Stats />

              </motion.div>

            }
          />

        </Routes>

      </AnimatePresence>

    </Layout>

  );

};

export default App;