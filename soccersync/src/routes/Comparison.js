import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import "../css/Copmarison.css"; // Compact styling

const Comparison = () => {
  const [people, setPeople] = useState([]);
  const inputPerson1 = useRef();
  const inputPerson2 = useRef();

  const [person1, setPerson1] = useState({});
  const [person1homeworld, setPerson1homeworld] = useState("");
  const [person1films, setPerson1films] = useState(0);
  const [person1species, setPerson1species] = useState("");

  const [person2, setPerson2] = useState({});
  const [person2homeworld, setPerson2homeworld] = useState("");
  const [person2films, setPerson2films] = useState(0);
  const [person2species, setPerson2species] = useState("");

  useEffect(() => {
    axios.get("https://swapi.dev/api/people/").then((res) => {
      setPeople(res.data.results);
    });
  }, []);

  function updatePerson1() {
    const url = inputPerson1.current.value;
    axios.get(url).then((res) => {
      setPerson1(res.data);
      setPerson1films(res.data.films.length);
      axios.get(res.data.homeworld).then((res) => {
        setPerson1homeworld(res.data.name);
      });
      if (res.data.species.length > 0) {
        axios.get(res.data.species[0]).then((res) => {
          setPerson1species(res.data.name);
        });
      } else {
        setPerson1species("Human");
      }
    });
  }

  function updatePerson2() {
    const url = inputPerson2.current.value;
    axios.get(url).then((res) => {
      setPerson2(res.data);
      setPerson2films(res.data.films.length);
      axios.get(res.data.homeworld).then((res) => {
        setPerson2homeworld(res.data.name);
      });
      if (res.data.species.length > 0) {
        axios.get(res.data.species[0]).then((res) => {
          setPerson2species(res.data.name);
        });
      } else {
        setPerson2species("Human");
      }
    });
  }

  // Bar Chart Data (Mass and Height)
  const barData = {
    labels: [person1.name || "Person 1", person2.name || "Person 2"],
    datasets: [
      {
        label: "Mass (kg)",
        data: [person1.mass, person2.mass],
        backgroundColor: ["#FFD700", "#20B2AA"],
      },
      {
        label: "Height (cm)",
        data: [person1.height, person2.height],
        backgroundColor: ["#FF6347", "#4682B4"],
      },
    ],
  };

  // Pie Chart Data (Films Comparison)
  const filmData = {
    labels: [`${person1.name} Films`, `${person2.name} Films`],
    datasets: [
      {
        data: [person1films, person2films],
        backgroundColor: ["#FF6347", "#4682B4"],
      },
    ],
  };

  // Doughnut Chart Data (Species Comparison)
  const speciesData = {
    labels: [person1species || "Species 1", person2species || "Species 2"],
    datasets: [
      {
        data: [1, 1],
        backgroundColor: ["#8A2BE2", "#3CB371"],
      },
    ],
  };

  return (
    <div className="comparison-container">
      {/* Navbar at the top */}
      <div className="navbar">
        <h1>Star Wars Character Comparison</h1>
      </div>

      <div className="selection-area">
        {/* Dropdown for person 1 */}
        <div className="dropdown-container">
          <h4>Select Person 1:</h4>
          <select className="dropdown" ref={inputPerson1} onChange={updatePerson1}>
            <option>Select a person</option>
            {people.map((person) => (
              <option key={person.url} value={person.url}>
                {person.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown for person 2 */}
        <div className="dropdown-container">
          <h4>Select Person 2:</h4>
          <select className="dropdown" ref={inputPerson2} onChange={updatePerson2}>
            <option>Select a person</option>
            {people.map((person) => (
              <option key={person.url} value={person.url}>
                {person.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Character Information Row */}
      <div className="character-info">
        <div className="info-box">
          <h4>{person1.name}</h4>
          <p>Homeworld: {person1homeworld}</p>
          <p>Species: {person1species}</p>
          <p>Films: {person1films}</p>
          <p>Birth Year: {person1.birth_year}</p>
          <p>Gender: {person1.gender}</p>
        </div>

        <div className="info-box">
          <h4>{person2.name}</h4>
          <p>Homeworld: {person2homeworld}</p>
          <p>Species: {person2species}</p>
          <p>Films: {person2films}</p>
          <p>Birth Year: {person2.birth_year}</p>
          <p>Gender: {person2.gender}</p>
        </div>
      </div>

      {/* Charts in Row */}
      <div className="chart-grid">
        {/* Bar Chart for Mass and Height */}
        <div className="chart-area">
          <h4>Mass and Height Comparison</h4>
          <Bar data={barData} height={200} />
        </div>

        {/* Pie Chart for Films Comparison */}
        <div className="chart-area">
          <h4>Films Comparison</h4>
          <Pie data={filmData} height={200} />
        </div>

        {/* Doughnut Chart for Species Comparison */}
        <div className="chart-area">
          <h4>Species Comparison</h4>
          <Doughnut data={speciesData} height={200} />
        </div>
      </div>
    </div>
  );
};

export default Comparison;