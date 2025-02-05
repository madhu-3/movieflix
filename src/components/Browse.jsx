import React, { useEffect, useState } from "react";
import Header from "./Header";
import Loader from "./Common/Loader";
import MainVideoContainer from "./MainVideoContainer";
import SecondaryContainer from "./SecondaryContainer";
import {
  useLazyGetMostPlayedMovieListQuery,
  useLazyGetPopularMovieListQuery,
  useLazyGetTrendingMovieListQuery,
} from "../services/movieService";

const Browse = () => {
  const [movieList, setMovieList] = useState([]);

  const [
    triggerTrendingMoview,
    { data: trendingMovies, isLoading: loadingTrending },
  ] = useLazyGetTrendingMovieListQuery();

  const [
    triggerPopularMovies,
    { data: popularMovies, isLoading: loadingPopular },
  ] = useLazyGetPopularMovieListQuery();

  const [
    triggerMostPlayed,
    { data: mostPlayedMovies, isLoading: loadingMostPlayed },
  ] = useLazyGetMostPlayedMovieListQuery();

  useEffect(() => {
    triggerTrendingMoview();
    triggerPopularMovies();
    triggerMostPlayed();
  }, []);

  useEffect(() => {
    if (trendingMovies && popularMovies && mostPlayedMovies) {
      setMovieList([
        { title: "Trending Movies", data: trendingMovies },
        { title: "Popular Movies", data: popularMovies },
        { title: "Most Played Movies", data: mostPlayedMovies },
      ]);
    }
  }, [trendingMovies, popularMovies, mostPlayedMovies]);

  return (
    <div>
      <Header />
      {loadingTrending || loadingPopular || loadingMostPlayed ? (
        <Loader />
      ) : (
        <>
          {movieList.length > 0 && (
            <>
              <MainVideoContainer trendingMovie={trendingMovies[0]} />
              <SecondaryContainer movieList={movieList} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Browse;
