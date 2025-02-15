import React, { useCallback, useRef, useState } from "react";
import YoutubePlayer from "./Common/YoutubePlayer";
import YouTube from "react-youtube";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const VideoMoreInfo = ({
  trailerId,
  movieData,
  handleClose,
  isMobile = false,
  searchQuery,
}) => {
  const [playVideo, setPlayVideo] = useState(true);
  const [muteAudio, setMuteAudio] = useState(true);
  const [trailerInfoId, setTrailerInfoId] = useState(null);
  const playerRef = useRef(null);

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
      playlist: isMobile ? trailerInfoId : trailerId, // Required for loop
    },
  };
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

  return (
    <div className="h-full overflow-auto text-white">
      {isMobile ? (
        <YoutubePlayer
          onReady={onReady}
          searchQuery={searchQuery}
          setTrailerInfoId={setTrailerInfoId}
          styles="w-full h-[50%] md:h-[60%]"
        />
      ) : (
        <YouTube
          videoId={trailerId}
          opts={opts}
          onReady={onReady}
          className="w-full h-[50%] md:h-[60%]"
        />
      )}
      <div className="absolute top-1/3 left-[5%] z-10">
        <div>
          <button
            className="bg-white text-black px-4 py-2 rounded-sm mr-4 hover:opacity-70"
            onClick={handlePlayVideo}
          >
            {playVideo ? (
              <>
                <FontAwesomeIcon icon={faPause} className="md:mr-2" />
                <span className=" hidden md:inline">Pause</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlay} className="md:mr-2" />
                <span className=" hidden md:inline">Play</span>
              </>
            )}
          </button>

          <button
            className="bg-[rgba(42, 42, 42, .6)] border-2 border-[gray] text-black p-2 rounded-full hover:border-white hover:text-white"
            onClick={handleMuteAudio}
          >
            {muteAudio ? (
              <FontAwesomeIcon icon={faVolumeXmark} />
            ) : (
              <FontAwesomeIcon icon={faVolumeHigh} />
            )}
          </button>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faXmark}
        size="2xl"
        className="absolute top-0 right-1 md:-right-2 cursor-pointer z-50"
        onClick={handleClose}
      />
      <div className="p-1">
        <div className="flex gap-2 text-sm mb-2">
          <p>{movieData?.Year}</p>
          <p>{movieData?.Runtime}</p>
        </div>
        <div className="flex gap-2 items-center mb-2">
          <p className=" border border-gray-100 px-1">{`Rated:${movieData?.Rated}`}</p>
          <p className="text-xs text-gray-400">{movieData?.Genre}</p>
        </div>
        <p className="text-sm">{movieData?.Plot}</p>
        <div className="flex justify-around items-center p-2">
          <div className="text-center">
            <FontAwesomeIcon
              icon={faImdb}
              size="2xl"
              style={{ color: "#FFD43B" }}
            />
            <p>{`Rating: ${movieData?.imdbRating}`}</p>
            <p>{`Votes: ${movieData?.imdbVotes}`}</p>
          </div>
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 48 48"
              className="inline"
            >
              <circle cx="24" cy="24" r="20" fill="#ffcb00"></circle>
              <circle cx="24" cy="24" r="16"></circle>
              <path
                fill="#fff"
                d="M-10.713,40.702h4.423v-8.518c0-0.359,0.03-0.777,0.179-1.136 c0.269-0.747,0.956-1.644,2.122-1.644c1.435,0,2.092,1.255,2.092,3.108v8.189h4.423v-8.548c0-0.359,0.06-0.837,0.179-1.166 c0.299-0.867,1.046-1.584,2.092-1.584c1.464,0,2.152,1.225,2.152,3.347v7.95h4.423v-8.607c0-4.363-2.122-6.336-4.931-6.336 c-1.076,0-1.973,0.239-2.779,0.717c-0.687,0.418-1.345,0.986-1.883,1.763H1.72c-0.628-1.524-2.122-2.481-4.005-2.481 c-2.51,0-3.796,1.375-4.423,2.301h-0.09l-0.209-1.973h-3.825c0.06,1.285,0.12,2.839,0.12,4.662L-10.713,40.702L-10.713,40.702z"
                transform="rotate(-45)"
              ></path>
            </svg>
            <p>{`Metascore: ${movieData?.Metascore}`}</p>
          </div>
        </div>
        <div>
          <p className="text-2xl text-white">{`About ${movieData?.Title}`}</p>
          <div className="text-xs md:text-xl">
            <div className="flex gap-2">
              <label className="text-[#777]">Director:</label>
              <p>{movieData?.Director}</p>
            </div>
            <div className="flex gap-2">
              <label className="text-[#777]">Cast:</label>
              <p>{movieData?.Actors}</p>
            </div>
            <div className="flex gap-2">
              <label className="text-[#777]">Writers:</label>
              <p>{movieData?.Writer}</p>
            </div>
            <div className="flex gap-2">
              <label className="text-[#777]">Genres:</label>
              <p>{movieData?.Genre}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoMoreInfo;
