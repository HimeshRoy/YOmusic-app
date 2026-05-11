import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import {
  db,
} from "../firebase";

import {
  useAuth,
} from "./AuthContext";

const RecentlyPlayedContext =
  createContext();

export const RecentlyPlayedProvider =
({
  children,
}) => {

  const [recentlyPlayed,
    setRecentlyPlayed] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const { user } =
    useAuth();

  // LOAD
  useEffect(() => {

    const loadRecentlyPlayed =
      async () => {

      try {

        if (!user) {

          setRecentlyPlayed([]);

          setLoading(false);

          return;

        }

        setLoading(true);

        const docRef =
          doc(
            db,
            "users",
            user.uid
          );

        const snapshot =
          await getDoc(docRef);

        if (snapshot.exists()) {

          const data =
            snapshot.data();

          setRecentlyPlayed(

            data.recentlyPlayed
            || []

          );

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    loadRecentlyPlayed();

  }, [user]);

  // SAVE
  const saveRecentlyPlayed =
    async (updatedSongs) => {

    try {

      if (!user) return;

      await setDoc(

        doc(
          db,
          "users",
          user.uid
        ),

        {
          recentlyPlayed:
            updatedSongs,
        },

        { merge: true }

      );

    } catch (error) {

      console.log(error);

    }

  };

  // ADD SONG
  const addRecentlyPlayed =
    async (song) => {

    const filtered =

      recentlyPlayed.filter(
        (item) =>
          item.id !== song.id
      );

    const updatedSongs = [

      song,

      ...filtered,

    ].slice(0, 30);

    setRecentlyPlayed(
      updatedSongs
    );

    await saveRecentlyPlayed(
      updatedSongs
    );

  };

  return (

    <RecentlyPlayedContext.Provider
      value={{

        recentlyPlayed,

        loading,

        addRecentlyPlayed,

      }}
    >

      {children}

    </RecentlyPlayedContext.Provider>

  );

};

export const useRecentlyPlayed =
() =>
  useContext(
    RecentlyPlayedContext
  );