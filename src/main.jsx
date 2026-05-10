import React from "react";
import ReactDOM from "react-dom/client";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";
import { MusicProvider } from "./context/MusicContext";

import App from "./App";

import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { PlayerProvider } from "./context/PlayerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <MusicProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <PlayerProvider>
            <App />
          </PlayerProvider>
        </FavoritesProvider>
      </ThemeProvider>
      </MusicProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
