import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FavoritesContext =
  createContext();

export const FavoritesProvider =
({
  children,
}) => {

  const [favorites,
    setFavorites] =
    useState([]);

  // HYDRATION FIX
  const [isReady,
    setIsReady] =
    useState(false);

  // LOAD LOCAL STORAGE
  useEffect(() => {

    const stored =
      localStorage.getItem(
        "yomusic-favorites"
      );

    if (stored) {

      setFavorites(
        JSON.parse(stored)
      );

    }

    setIsReady(true);

  }, []);

  // SAVE LOCAL STORAGE
  useEffect(() => {

    // PREVENT EMPTY OVERWRITE
    if (!isReady) return;

    localStorage.setItem(

      "yomusic-favorites",

      JSON.stringify(favorites)

    );

  }, [

    favorites,
    isReady,
  ]);

  // TOGGLE FAVORITE
  const toggleFavorite =
    (song) => {

    const exists =
      favorites.find(
        (item) =>
          item.id === song.id
      );

    if (exists) {

      setFavorites(

        favorites.filter(
          (item) =>
            item.id !== song.id
        )

      );

    } else {

      setFavorites([
        ...favorites,
        song,
      ]);

    }

  };

  // CHECK FAVORITE
  const isFavorite =
    (songId) => {

    return favorites.some(
      (item) =>
        item.id === songId
    );

  };

  return (

    <FavoritesContext.Provider
      value={{

        favorites,

        toggleFavorite,

        isFavorite,

        isReady,

      }}
    >

      {children}

    </FavoritesContext.Provider>

  );

};

export const useFavorites =
() =>
  useContext(FavoritesContext);