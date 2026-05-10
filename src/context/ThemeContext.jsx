import {
  createContext,
  useContext,
  useState,
} from "react";

const ThemeContext =
  createContext();

export const ThemeProvider =
({
  children,
}) => {

  const [themeColor,
    setThemeColor] =
    useState("#22c55e");

  return (

    <ThemeContext.Provider
      value={{

        themeColor,
        setThemeColor,

      }}
    >

      {children}

    </ThemeContext.Provider>

  );

};

export const useTheme =
() =>
  useContext(ThemeContext);