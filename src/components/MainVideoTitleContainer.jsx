import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useGetMovieDetailsQuery } from "../services/omdbService";
import Dialog from "./Common/Dialog";
import VideoMoreInfo from "./VideoMoreInfo";

const MainVideoTitleContainer = ({
  movieDetails,
  playVideo,
  muteAudio,
  handlePlayVideo,
  handleMuteAudio,
  trailerId,
}) => {
  const [moreInfoOpen, setMoreInfoOpen] = useState(false);

  const { title } = movieDetails?.movie;
  const imdbId = movieDetails?.movie?.ids?.imdb;

  const {
    data: movieData,
    error,
    isLoading,
  } = useGetMovieDetailsQuery(imdbId, { skip: !imdbId });

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
          trailerId={trailerId}
          movieData={movieData}
          handleClose={handleMoreInfoClose}
        />
      </Dialog>
      <div className="absolute top-1/2 left-[5%] z-10">
        <p className="text-7xl font-bold text-white mb-1">{title}</p>
        <div>
          <button
            className="bg-white text-black px-4 py-2 rounded-sm mr-4"
            onClick={handlePlayVideo}
          >
            {playVideo ? (
              <>
                <FontAwesomeIcon icon={faPause} className="mr-2" />
                Pause
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlay} className="mr-2" /> Play
              </>
            )}
          </button>
          <button
            className="bg-gray-600 text-black px-4 py-2 rounded-sm mr-4"
            onClick={handleMoreInfo}
          >
            <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
            More Info
          </button>

          <button
            className="bg-white text-black px-2 py-2 rounded-sm"
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
    </>
  );
};

export default MainVideoTitleContainer;
