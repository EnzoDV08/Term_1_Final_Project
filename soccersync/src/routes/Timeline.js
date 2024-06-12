import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "../css/Timeline.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Timeline = () => {
  const [movieName, setMovieName] = useState([]);
  const [movieYear, setMovieYear] = useState([]);
  const [peopleName, setPeopleName] = useState([]);
  const [peopleYear, setPeopleYear] = useState([]);
  const [timeName, setTimeName] = useState([]);
  const [timeYear, setTimeYear] = useState([]);
  const [extraText, setExtraText] = useState("");
  const inputTime = useRef();

  useEffect(() => {
    let moviesArray = [
      "A+New+Hope",
      "The+Empire+Strikes+Back",
      "Return+of+the+Jedi",
      "The+Phantom+Menace",
      "Attack+of+the+Clones",
      "Revenge+of+the+Sith",
    ];
    let movieNameS = [];
    let movieYears = [];

    moviesArray.forEach((movie) => {
      axios
        .get(`https://www.omdbapi.com/?t=${movie}&apikey=5d0c0e4f`)
        .then((res) => {
          let data = res.data;
          movieNameS.push(data.Title);
          movieYears.push(data.Year);
          setMovieName([...movieNameS]);
          setMovieYear([...movieYears]);
        });
    });

    let peopleNames = [];
    let peopleDate = [];
    axios.get("https://swapi.dev/api/people/").then((res) => {
      let data = res.data.results;
      data.forEach((person) => {
        peopleNames.push(person.name);
        let yearLength = person.birth_year.length;
        let dateSet = person.birth_year;
        let lengthCut = yearLength - 3;
        dateSet = dateSet.slice(0, lengthCut).replace(".", "");
        peopleDate.push(dateSet);
        setPeopleName([...peopleNames]);
        setPeopleYear([...peopleDate]);
      });
    });
  }, []);

  const movieInfo = {
    labels: timeName,
    datasets: [
      {
        label: "Years released",
        data: timeYear,
        borderColor: "#176087",
        backgroundColor: "#15577A",
        tension: 0.4,
      },
    ],
  };

  function updateTimeline() {
    let selection = inputTime.current.value;

    let moviesText =
      "This is the release date of all the StarWars movies, and how it has was released over the years";
    let peopleText =
      "This is the birth dates of all the characters in the movies. All of there birth dates happened within the 'BBY' era";

    if (selection === "Movies") {
      setTimeName(movieName);
      setTimeYear(movieYear);
      setExtraText(moviesText);
    }

    if (selection === "People") {
      setTimeName(peopleName);
      setTimeYear(peopleYear);
      setExtraText(peopleText);
    }
  }

  return (
    <div className="star">
      <div className="timeline-main">
        <div className="timeholder">
          <div className="texInfo">
            <select
              className="dropDown"
              name="Timeline"
              ref={inputTime}
              onChange={updateTimeline}
            >
              <option selected disabled hidden>
                Select an option
              </option>
              <option value="Movies">Movies</option>
              <option value="People">People</option>
            </select>
            <h3 className="text">About: </h3>
            <p className="text">{extraText}</p>
          </div>
          <div className="timline-chart">
            <Line data={movieInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
