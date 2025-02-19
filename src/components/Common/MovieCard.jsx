import React, { useCallback, useRef, useState } from "react";
import YoutubePlayer from "./YoutubePlayer";
import Dialog from "../Common/Dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import VideoMoreInfo from "../VideoMoreInfo";
import fallbackposter from "../../assets/posterfallback.jpg";

const MovieCard = ({
  movieData,
  title,
  isHovered,
  setHoveredItem,
  searchQuery,
}) => {
  const [cardPos, setCardPos] = useState("center");
  const [playVideo, setPlayVideo] = useState(true);
  const [muteAudio, setMuteAudio] = useState(true);
  const [moreInfoOpen, setMoreInfoOpen] = useState(false);
  const [trailerInfoId, setTrailerInfoId] = useState(null);

  const cardRef = useRef(null);
  const playerRef = useRef(null);
  let movieEnterId;
  const isMobile = window.matchMedia("(pointer:coarse)").matches;

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

  const debounceFn = (fn, delay) => {
    return function (...args) {
      if (movieEnterId) {
        clearTimeout(movieEnterId);
      }
      movieEnterId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const handleMouseEnter = () => {
    const pos = cardRef.current.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    if (pos.left < 50) {
      setCardPos("left");
    } else if (pos.right > screenWidth - 50) {
      setCardPos("right");
    } else {
      setCardPos("center");
    }
    if (!(pos.right > screenWidth)) {
      setHoveredItem(title);
    }
  };

  const debouncedFn = debounceFn(handleMouseEnter, 1500);

  const handleMouseLeave = () => {
    if (movieEnterId) {
      clearTimeout(movieEnterId);
    }
    setHoveredItem(null);
  };
  const handleMoreInfo = () => {
    setMoreInfoOpen(true);
  };
  const handleMoreInfoClose = () => {
    setMoreInfoOpen(false);
  };

  return (
    <>
      <Dialog isOpen={moreInfoOpen}>
        <VideoMoreInfo
          trailerId={trailerInfoId}
          movieData={movieData}
          handleClose={handleMoreInfoClose}
          isMobile={isMobile}
          searchQuery={searchQuery}
        />
      </Dialog>
      <div
        ref={cardRef}
        onMouseEnter={!isMobile ? debouncedFn : undefined}
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        className={`relative w-[200px] h-[300px] cursor-pointer transition-transform duration-300 ease-in-out ${
          isHovered ? " scale-125 z-50" : "z-10"
        }`}
      >
        {isHovered ? (
          <div
            className={`absolute w-[250px] h-[300px] -top-6 bg-gray-900 text-white rounded-lg shadow-xl transition-all duration-300 ${
              cardPos === "left"
                ? "left-0"
                : cardPos === "right"
                ? "-right-0"
                : "-left-6"
            }`}
          >
            <YoutubePlayer
              onReady={onReady}
              searchQuery={searchQuery}
              setTrailerInfoId={setTrailerInfoId}
              styles="w-full"
            />
            <div className="p-3">
              <div className="flex gap-2 mt-3 justify-between">
                <div>
                  <button className="rounded-sm mr-3" onClick={handlePlayVideo}>
                    {playVideo ? (
                      <>
                        <FontAwesomeIcon icon={faPause} />
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPlay} />
                      </>
                    )}
                  </button>
                  <button className="rounded-sm" onClick={handleMuteAudio}>
                    {muteAudio ? (
                      <FontAwesomeIcon icon={faVolumeXmark} />
                    ) : (
                      <FontAwesomeIcon icon={faVolumeHigh} />
                    )}
                  </button>
                </div>

                <button className="rounded-sm" onClick={handleMoreInfo}>
                  <FontAwesomeIcon icon={faCircleInfo} />
                </button>
              </div>
              <h3 className="text-lg font-semibold">
                {movieData?.Title + " " + movieData?.Year}
              </h3>
              <div className="flex gap-2 text-sm mb-1">
                <p className=" border border-gray-100 px-1">{`Rated:${movieData?.Rated}`}</p>
                <p>{movieData?.Runtime}</p>
              </div>
              <p className="text-xs text-gray-400">{movieData?.Genre}</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              className="h-full w-full object-cover rounded-lg"
              alt="movie_poster"
              src={
                movieData?.Poster === "N/A" ? fallbackposter : movieData?.Poster
              }
              onError={(e) => (e.target.src = fallbackposter)}
              onClick={isMobile ? handleMoreInfo : undefined}
            />
            {movieData?.Poster === "N/A" && (
              <div className="absolute w-full top-0 text-center font-bold text-2xl">
                {title}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MovieCard;
