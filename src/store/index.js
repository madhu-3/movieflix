import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { traktAPI } from "../services/movieService";
import { youtubeAPI } from "../services/youtubeService";
import { omdbAPI } from "../services/omdbService";

const store = configureStore({
  reducer: {
    userConfig: userReducer,
    [traktAPI.reducerPath]: traktAPI.reducer,
    [youtubeAPI.reducerPath]: youtubeAPI.reducer,
    [omdbAPI.reducerPath]: omdbAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      traktAPI.middleware,
      youtubeAPI.middleware,
      omdbAPI.middleware
    ),
});

export default store;
