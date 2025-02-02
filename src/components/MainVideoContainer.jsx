import React from "react";
import MainVideoTitleContainer from "./MainVideoTitleContainer";
import { useGetMovieTrailerQuery } from "../services/youtubeService";
import { temptrailerData } from "./temp";
import Loader from "./Common/Loader";

const MainVideoContainer = ({ trendingMovie }) => {
  const searchQuery =
    trendingMovie?.movie?.ids?.slug || trendingMovie?.movie?.title;

  const {
    data: trailerData,
    error,
    isLoading,
  } = useGetMovieTrailerQuery(searchQuery);

  //const trailerData = temptrailerData;
  const trailerId = trailerData?.items[0].id.videoId;

  return (
    <div className="mt-16 h-[calc(100vh-64px)] relative">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MainVideoTitleContainer movieDetails={trendingMovie} />
          <div className="bg-[linear-gradient(transparent,black)] absolute w-full h-full top-0 left-0"></div>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </>
      )}
    </div>
  );
};

export default MainVideoContainer;
