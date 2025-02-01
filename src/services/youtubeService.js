import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const youtubeAPI = createApi({
  reducerPath: "youtubeAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/youtube/v3/",
  }),
  endpoints: (builder) => ({
    getMovieTrailer: builder.query({
      query: (query) =>
        `search?part=snippet&q=${encodeURIComponent(query + " trailer")}&key=${
          process.env.REACT_APP_YOUTUBE_API_KEY
        }&maxResults=1&type=video`,
    }),
  }),
});

export const { useGetMovieTrailerQuery } = youtubeAPI;
