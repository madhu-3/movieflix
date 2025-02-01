import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { traktAPI } from "../services/movieService";
import { youtubeAPI } from "../services/youtubeService";

const store = configureStore({
  reducer: {
    user: userReducer,
    [traktAPI.reducerPath]: traktAPI.reducer,
    [youtubeAPI.reducerPath]: youtubeAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(traktAPI.middleware, youtubeAPI.middleware),
});

export default store;
