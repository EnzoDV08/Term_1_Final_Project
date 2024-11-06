import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "../css/Timeline.css";

const Timeline = () => {
  const [movieData, setMovieData] = useState([]);
  const inputTime = useRef();

  useEffect(() => {
    axios.get("https://swapi.dev/api/films/").then((res) => {
      const movies = res.data.results.map((movie) => ({
        title: movie.title,
        year: movie.release_date.split("-")[0],
      }));
      setMovieData(movies);
    });
  }, []);

  const data = {
    labels: movieData.map((movie) => movie.title),
    datasets: [
      {
        label: "Release Year",
        data: movieData.map((movie) => movie.year),
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  return (
    <div className="timeline-main">
      <select ref={inputTime}>
        <option>Movies</option>
      </select>
      <Line data={data} />
    </div>
  );
};

export default Timeline;
