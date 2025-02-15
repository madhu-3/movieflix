import React, { useState } from "react";
import Header from "./Header";
import { useLazyGetMovieBySearchQuery } from "../services/movieService";
import openai from "../utils/openai";
import Loader from "./Common/Loader";
import SecondaryContainer from "./SecondaryContainer";

const GPTSearch = () => {
  const [userInput, setUserInput] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [triggerMovieBySearch] = useLazyGetMovieBySearchQuery();

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleMovieSearch = async () => {
    if (!userInput) return;
    try {
      setLoading(true);
      const prompt = `Give 5 movie recommendations for: "${userInput}".Return only one line of comma-separated values like: Title (Year), Title (Year),`;
      const gptResult = await openai.generateContent(prompt);
      const response = gptResult.response;
      const text = response.text();

      const arr = text
        .trim()
        .split(/,\s?/)
        .map((movie) => {
          const match = movie.match(/(.*)\s\((\d{4})\)/);
          return match
            ? { title: match[1].trim(), year: parseInt(match[2]) }
            : null;
        })
        .filter(Boolean);

      if (!arr || arr.length === 0) {
        console.error("No recommendations found.");
        return;
      }
      //Fetch Trakt details for each recommended movie
      const detailedMovies = await Promise.all(
        arr.map(async (movie) => {
          const movieQuery =
            movie.title.trim().replaceAll(" ", "-") + "-" + movie.year;
          const { data: details } = await triggerMovieBySearch(movieQuery);
          return details;
        })
      );
      const finalRes = detailedMovies.filter(Boolean);
      setMovieData(finalRes);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setUserInput("");
      setLoading(false);
    }
  };
  return (
    <div>
      <Header />
      <div className=" mt-16 p-5">
        <h1 className="text-center text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          Search Movies with the magic of AI
        </h1>
        <div className="flex gap-3 p-2 flex-col md:flex-row">
          <input
            type="search"
            placeholder="Enter Promot to search movies! Like Best Horror Movies"
            className="border p-2 border-black rounded-lg flex-1 outline-none focus-within:border-purple-700"
            value={userInput}
            onChange={handleUserInputChange}
            maxLength={30}
          />
          <button
            className="bg-red-500 px-4 py-2 rounded-lg"
            onClick={handleMovieSearch}
          >
            Search
          </button>
        </div>
      </div>

      {loading && <Loader />}
      {!loading && movieData && (
        <SecondaryContainer
          movieList={[{ title: "AI Result Movies", data: movieData }]}
          aiList={true}
        />
      )}
    </div>
  );
};

export default GPTSearch;
