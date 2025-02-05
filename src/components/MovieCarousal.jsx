import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
//import "./Carousel.css"; // Custom styles
import { Navigation } from "swiper/modules";
import MovieCard from "./Common/MovieCard";

const MovieCarousal = ({ movieData, type }) => {
  const [slides, setSlides] = useState(Math.floor(window.innerWidth / 192));
  const [hoveredItem, setHoveredItem] = useState(null);
  let id = null;

  useEffect(() => {
    const handleResize = () => {
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        const slidesPerView = Math.floor(window.innerWidth / 192);
        setSlides(slidesPerView);
      }, 500);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full movie-container">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={slides}
        navigation
        loop={true}
        className="!px-6 !overflow-visible"
      >
        {movieData.map((movie, index) => {
          let imdbId;
          let title;
          if (type === "Popular Movies") {
            imdbId = movie?.ids?.imdb;
            title = movie.title;
          } else {
            imdbId = movie?.movie?.ids?.imdb;
            title = movie?.movie?.title;
          }

          return (
            <SwiperSlide
              key={movie.id}
              className={`relative overflow-visible ${
                hoveredItem === title ? "z-50" : "z-10"
              }`}
            >
              <MovieCard
                key={index}
                movieItem={movie}
                imdbId={imdbId}
                title={title}
                type={type}
                isHovered={title === hoveredItem}
                setHoveredItem={setHoveredItem}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MovieCarousal;
