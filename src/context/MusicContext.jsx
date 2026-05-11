import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  searchMusic,
} from "../services/musicApi";

const MusicContext =
  createContext();

export const MusicProvider =
({
  children,
}) => {

  // ACTIVE QUERY
  const [query,
    setQuery] =
    useState("lana del rey");

  // INPUT SEARCH STATE
  const [search,
    setSearch] =
    useState("");

  const [songs,
    setSongs] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  // RECENT SEARCHES
  const [recentSearches,
    setRecentSearches] =
    useState(

      JSON.parse(

        localStorage.getItem(
          "yomusic-recent"
        )

      ) || []

    );

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

  // SAVE RECENT SEARCH
  const saveRecentSearch =
    (searchTerm) => {

    if (!searchTerm) return;

    const updated = [

      searchTerm,

      ...recentSearches.filter(
        (item) =>
          item !== searchTerm
      ),

    ].slice(0, 10);

    setRecentSearches(updated);

    localStorage.setItem(

      "yomusic-recent",

      JSON.stringify(updated)

    );

  };

  // HANDLE SEARCH
  const handleSearch =
    (searchTerm) => {

    if (!searchTerm.trim())
      return;

    setSearch(searchTerm);

    setQuery(searchTerm);

    saveRecentSearch(
      searchTerm
    );

  };

  return (

    <MusicContext.Provider
      value={{

        query,
        setQuery,

        search,
        setSearch,

        songs,
        loading,

        handleSearch,

        recentSearches,

      }}
    >

      {children}

    </MusicContext.Provider>

  );

};

export const useMusic =
() =>
  useContext(MusicContext);