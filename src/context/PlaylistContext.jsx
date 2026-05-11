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

const PlaylistContext =
  createContext();

export const PlaylistProvider =
({
  children,
}) => {

  const [playlists,
    setPlaylists] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const { user } =
    useAuth();

  // LOAD PLAYLISTS
  useEffect(() => {

    const loadPlaylists =
      async () => {

      try {

        if (!user) {

          setPlaylists([]);

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

          setPlaylists(
            data.playlists || []
          );

        } else {

          setPlaylists([]);

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    loadPlaylists();

  }, [user]);

  // SAVE PLAYLISTS
  const savePlaylists =
    async (updatedPlaylists) => {

    try {

      if (!user) return;

      await setDoc(

        doc(
          db,
          "users",
          user.uid
        ),

        {
          playlists:
            updatedPlaylists,
        },

        { merge: true }

      );

    } catch (error) {

      console.log(error);

    }

  };

  // CREATE PLAYLIST
  const createPlaylist =
    async (name) => {

    if (!name.trim())
      return;

    const newPlaylist = {

      id: Date.now(),

      name,

      songs: [],

      createdAt:
        new Date(),

    };

    const updatedPlaylists = [

      newPlaylist,

      ...playlists,

    ];

    setPlaylists(
      updatedPlaylists
    );

    await savePlaylists(
      updatedPlaylists
    );

  };

  // DELETE PLAYLIST
  const deletePlaylist =
    async (playlistId) => {

    const updatedPlaylists =

      playlists.filter(
        (playlist) =>

          playlist.id !==
          playlistId
      );

    setPlaylists(
      updatedPlaylists
    );

    await savePlaylists(
      updatedPlaylists
    );

  };

  // ADD SONG TO PLAYLIST
  const addSongToPlaylist =
    async (
      playlistId,
      song
    ) => {

    const updatedPlaylists =

      playlists.map(
        (playlist) => {

        if (
          playlist.id !==
          playlistId
        ) {

          return playlist;

        }

        // PREVENT DUPLICATE
        const exists =
          playlist.songs.some(
            (item) =>
              item.id === song.id
          );

        if (exists)
          return playlist;

        return {

          ...playlist,

          songs: [

            song,

            ...playlist.songs,

          ],

        };

      });

    setPlaylists(
      updatedPlaylists
    );

    await savePlaylists(
      updatedPlaylists
    );

  };

  // REMOVE SONG
  const removeSongFromPlaylist =
    async (
      playlistId,
      songId
    ) => {

    const updatedPlaylists =

      playlists.map(
        (playlist) => {

        if (
          playlist.id !==
          playlistId
        ) {

          return playlist;

        }

        return {

          ...playlist,

          songs:
            playlist.songs.filter(
              (song) =>

                song.id !==
                songId
            ),

        };

      });

    setPlaylists(
      updatedPlaylists
    );

    await savePlaylists(
      updatedPlaylists
    );

  };

  return (

    <PlaylistContext.Provider
      value={{

        playlists,

        loading,

        createPlaylist,

        deletePlaylist,

        addSongToPlaylist,

        removeSongFromPlaylist,

      }}
    >

      {children}

    </PlaylistContext.Provider>

  );

};

export const usePlaylists =
() =>
  useContext(PlaylistContext);