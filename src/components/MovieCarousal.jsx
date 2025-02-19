import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
//import "./Carousel.css"; // Custom styles
import { Navigation } from "swiper/modules";
import MovieCard from "./Common/MovieCard";
import Loader from "./Common/Loader";
import { useLazyGetMovieDetailsQuery } from "../services/omdbService";

const MovieCarousal = ({ movieData, type }) => {
  const [slides, setSlides] = useState(Math.floor(window.innerWidth / 200));
  const [hoveredItem, setHoveredItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [triggerGetMovieDetails] = useLazyGetMovieDetailsQuery();
  let id;

  useEffect(() => {
    const handleResize = () => {
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        const slidesPerView = Math.floor(window.innerWidth / 200);
        setSlides(slidesPerView);
      }, 500);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!movieData) return;
    setLoading(true);
    Promise.all(
      movieData.map((movie) => {
        let imdbId;
        if (type === "Popular Movies" || type === "AI Result Movies") {
          imdbId = movie?.ids?.imdb;
        } else {
          imdbId = movie?.movie?.ids?.imdb;
        }
        return triggerGetMovieDetails(imdbId, { skip: !imdbId }).unwrap();
      })
    )
      .then((results) => {
        const final = results
          .filter((movie) => {
            return !(movie?.Response === "False");
          })
          .map((mve) => {
            let slug;
            for (let i = 0; i < movieData.length; i++) {
              if (type === "Popular Movies" || type === "AI Result Movies") {
                if (movieData[i]?.ids?.imdb === mve.imdbID) {
                  slug = movieData[i]?.ids?.slug;
                  break;
                }
              } else {
                if (movieData[i]?.movie?.ids?.imdb === mve.imdbID) {
                  slug = movieData[i]?.movie?.ids?.slug;
                  break;
                }
              }
            }

            return { ...mve, slug: slug };
          });
        setData(final);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    data && (
      <div className="relative w-full movie-container">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={slides}
          navigation
          loop={true}
          className="!px-6 !overflow-visible"
        >
          {data.map((movie, index) => {
            return (
              <SwiperSlide
                key={movie.imdbID}
                className={`relative   ${
                  hoveredItem === movie.Title
                    ? "overflow-visible z-50"
                    : "overflow-hidden  z-10"
                }`}
              >
                <MovieCard
                  movieData={movie}
                  title={movie.Title}
                  searchQuery={movie.slug || movie.Title}
                  isHovered={movie.Title === hoveredItem}
                  setHoveredItem={setHoveredItem}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    )
  );
};

export default MovieCarousal;
