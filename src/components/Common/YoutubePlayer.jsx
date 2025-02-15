import React, { useEffect } from "react";
import YouTube from "react-youtube";
import { useGetMovieTrailerQuery } from "../../services/youtubeService";
import Loader from "./Loader";

const YoutubePlayer = ({ onReady, searchQuery, setTrailerInfoId, styles }) => {
  const {
    data: trailerData,
    error,
    isLoading,
  } = useGetMovieTrailerQuery(searchQuery);

  const trailerId = trailerData?.items[0].id.videoId;

  useEffect(() => {
    setTrailerInfoId(trailerId);
  }, [trailerId]);
  //   const isLoading = false;
  //   const trailerId = "hDZ7y8RP5HE";

  const opts = {
    height: "100%", // Set height
    width: "100%", // Set width
    playerVars: {
      autoplay: 1, // Auto-play the video
      mute: 1, // Mute the video
      controls: 0, // Show controls
      rel: 0, // Prevent showing related videos
      modestbranding: 1, // Hide YouTube logo
      loop: 1, // Loop video
      fs: 0,
      showInfo: 0,
      disableKb: 1,
      playlist: trailerId, // Required for loop
    },
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <YouTube
          videoId={trailerId}
          opts={opts}
          onReady={onReady}
          className={styles}
        />
      )}
    </>
  );
};

export default YoutubePlayer;
