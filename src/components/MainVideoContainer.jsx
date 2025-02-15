import React, { useCallback, useRef, useState } from "react";
import MainVideoTitleContainer from "./MainVideoTitleContainer";
import { useGetMovieTrailerQuery } from "../services/youtubeService";
import { temptrailerData } from "./temp";
import Loader from "./Common/Loader";
import YouTube from "react-youtube";

const MainVideoContainer = ({ trendingMovie }) => {
  const searchQuery =
    trendingMovie?.movie?.ids?.slug || trendingMovie?.movie?.title;
  const [playVideo, setPlayVideo] = useState(true);
  const [muteAudio, setMuteAudio] = useState(true);
  const playerRef = useRef(null);

  const {
    data: trailerData,
    error,
    isLoading,
  } = useGetMovieTrailerQuery(searchQuery);

  const trailerId = trailerData?.items[0].id.videoId;
  const onReady = (event) => {
    playerRef.current = event.target;
  };
  const handlePlayVideo = useCallback(() => {
    if (playerRef.current) {
      if (playVideo) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setPlayVideo(!playVideo);
    }
  }, [playerRef, playVideo]);

  const handleMuteAudio = useCallback(() => {
    if (playerRef.current) {
      if (muteAudio) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setMuteAudio(!muteAudio);
    }
  }, [playerRef, muteAudio]);

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
    <div className="mt-16 h-80 md:h-[calc(100vh-64px)] relative">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MainVideoTitleContainer
            movieDetails={trendingMovie}
            playVideo={playVideo}
            muteAudio={muteAudio}
            trailerId={trailerId}
            handlePlayVideo={handlePlayVideo}
            handleMuteAudio={handleMuteAudio}
          />
          <div className="bg-[linear-gradient(transparent,black)] absolute w-full h-full top-0 left-0"></div>
          <YouTube
            videoId={trailerId}
            opts={opts}
            onReady={onReady}
            className="w-full h-full"
          />
        </>
      )}
    </div>
  );
};

export default MainVideoContainer;
