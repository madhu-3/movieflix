import React from "react";

const MainVideoTitleContainer = ({ movieDetails }) => {
  const { title } = movieDetails;
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <button>Play</button>
        <button>More Info</button>
      </div>
    </div>
  );
};

export default MainVideoTitleContainer;
