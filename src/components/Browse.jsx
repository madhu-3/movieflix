import React from "react";
import Header from "./Header";
import { useGetTrendingMovieListQuery } from "../services/movieService";
import Loader from "./Common/Loader";
import MainVideoContainer from "./MainVideoContainer";

const Browse = () => {
  const {
    data: trendingMovies,
    error,
    isLoading,
  } = useGetTrendingMovieListQuery(10);

  console.log("trendingMovies", trendingMovies);

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <MainVideoContainer trendingMovie={trendingMovies[0]} />
      )}
    </div>
  );
};

export default Browse;
