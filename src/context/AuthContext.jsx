import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
  googleProvider,
} from "../firebase";

const AuthContext =
  createContext();

export const AuthProvider =
({
  children,
}) => {

  const [user,
    setUser] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  // GOOGLE LOGIN
  const login =
    async () => {

    try {

      await signInWithPopup(

        auth,

        googleProvider

      );

    } catch (error) {

      console.log(error);

    }

  };

  // LOGOUT
  const logout =
    async () => {

    try {

      await signOut(auth);

    } catch (error) {

      console.log(error);

    }

  };

  // SESSION
  useEffect(() => {

    const unsubscribe =

      onAuthStateChanged(

        auth,

        (currentUser) => {

          setUser(currentUser);

          setLoading(false);

        }

      );

    return () =>
      unsubscribe();

  }, []);

  return (

    <AuthContext.Provider
      value={{

        user,

        loading,

        login,

        logout,

      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth =
() =>
  useContext(AuthContext);