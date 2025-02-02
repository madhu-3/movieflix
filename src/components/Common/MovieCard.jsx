import React from "react";
import { useGetMovieDetailsQuery } from "../../services/omdbService";

const MovieCard = ({ movieItem, type }) => {
  let imdbId;
  if (type === "Popular Movies") {
    imdbId = movieItem?.ids?.imdb;
  } else {
    imdbId = movieItem?.movie?.ids?.imdb;
  }
  const {
    data: movieData,
    error,
    isLoading,
  } = useGetMovieDetailsQuery(imdbId, { skip: !imdbId });
  if (isLoading) {
    return <div>loading....</div>;
  }

  return (
    <div className="min-w-48 h-72">
      <img className="h-full" alt="movie_poster" src={movieData?.Poster} />
    </div>
  );
};

export default MovieCard;
