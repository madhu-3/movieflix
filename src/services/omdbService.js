import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const omdbAPI = createApi({
  reducerPath: "omdbAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://www.omdbapi.com/",
  }),
  endpoints: (builder) => ({
    getMovieDetails: builder.query({
      query: (imdbId) =>
        `?i=${imdbId}&apiKey=${process.env.REACT_APP_OMDB_API_KEY}`,
    }),
  }),
});

export const { useGetMovieDetailsQuery } = omdbAPI;
