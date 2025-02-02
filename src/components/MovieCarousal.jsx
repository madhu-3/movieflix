import React from "react";
import MovieCard from "./Common/MovieCard";

const MovieCarousal = ({ movieData, type }) => {
  return (
    <div className="flex gap-2 overflow-scroll">
      {movieData.map((movie) => {
        return <MovieCard movieItem={movie} type={type} />;
      })}
    </div>
  );
};

export default MovieCarousal;
