import React from "react";
import MovieCarousal from "./MovieCarousal";

const SecondaryContainer = ({ movieList, aiList = false }) => {
  return (
    <div
      className={`${
        aiList ? "mt-4" : "md:-mt-48"
      } z-10 relative overflow-hidden`}
    >
      {movieList.map((category) => {
        return (
          <div key={category.title} className="mb-8">
            <div className="text-bold text-2xl md:text-3xl text-white mb-6 pl-2">
              {category.title}
            </div>
            <MovieCarousal movieData={category.data} type={category.title} />
          </div>
        );
      })}
    </div>
  );
};

export default SecondaryContainer;
