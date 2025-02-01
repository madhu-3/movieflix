import React from "react";
import MainVideoTitleContainer from "./MainVideoTitleContainer";

const MainVideoContainer = ({ trendingMovie }) => {
  console.log("trendingMovie at main", trendingMovie);

  return (
    <div className="mt-16">
      <MainVideoTitleContainer movieDetails={trendingMovie} />
    </div>
  );
};

export default MainVideoContainer;
