import React from "react";
import ReactDOM from "react-dom/client";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";
import { MusicProvider } from "./context/MusicContext";
import { PlaylistProvider } from "./context/PlaylistContext";
import { AuthProvider } from "./context/AuthContext";
import { RecentlyPlayedProvider } from "./context/RecentlyPlayedContext";

import "virtual:pwa-register";
import App from "./App";

import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { PlayerProvider } from "./context/PlayerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RecentlyPlayedProvider>
          <PlaylistProvider>
            <MusicProvider>
              <ThemeProvider>
                <FavoritesProvider>
                  <PlayerProvider>
                    <App />
                  </PlayerProvider>
                </FavoritesProvider>
              </ThemeProvider>
            </MusicProvider>
          </PlaylistProvider>
        </RecentlyPlayedProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
