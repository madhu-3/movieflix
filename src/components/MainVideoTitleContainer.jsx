import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPlay } from "@fortawesome/free-solid-svg-icons";

const MainVideoTitleContainer = ({ movieDetails }) => {
  const { title } = movieDetails?.movie;
  return (
    <div className="absolute top-1/2 left-[5%] z-10">
      <p className="text-7xl font-bold text-white mb-1">{title}</p>
      <div>
        <button className="bg-white text-black px-4 py-2 rounded-sm mr-4">
          <FontAwesomeIcon icon={faPlay} className="mr-2" />
          Play
        </button>
        <button className="bg-gray-600 text-black px-4 py-2 rounded-sm">
          <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default MainVideoTitleContainer;
