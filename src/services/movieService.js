import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const traktAPI = createApi({
  reducerPath: "traktAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.trakt.tv/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("trakt-api-version", 2);
      headers.set("trakt-api-key", process.env.REACT_APP_TRAKT_CLIENT_ID);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTrendingMovieList: builder.query({
      query: (limit = 10) => `movies/trending`,
    }),
    getPopularMovieList: builder.query({
      query: () => `movies/popular`,
    }),
    getMostPlayedMovieList: builder.query({
      query: () => `movies/played/weekly`,
    }),
    getMovieBySearch: builder.query({
      query: (movieName) => `movies/${movieName}`,
    }),
  }),
});

export const {
  useLazyGetTrendingMovieListQuery,
  useLazyGetPopularMovieListQuery,
  useLazyGetMostPlayedMovieListQuery,
  useLazyGetMovieBySearchQuery,
} = traktAPI;
