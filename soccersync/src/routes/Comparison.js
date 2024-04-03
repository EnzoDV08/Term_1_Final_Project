import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, RadialLinearScale, ArcElement, PointElement, LineElement, Filler, Tooltip, Title, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/Copmarison.css'; 



// Your custom CSS file

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Comparison = () => {
    const [people, setPeople] = useState([]);
    const inputPerson1 = useRef();
    const inputPerson2 = useRef();

    const [person1, setPerson1] = useState({});
    const [person1homeworld, setPerson1homeworld] = useState("");
    const [person1films, setPerson1films] = useState(0);

    const [person2, setPerson2] = useState({});
    const [person2homeworld, setPerson2homeworld] = useState("");
    const [person2films, setPerson2films] = useState(0);

    useEffect(() => {
        axios.get('https://swapi.dev/api/people/')
            .then((res) => {
                const data = res.data.results;
                setPeople(data);
            });

        axios.get('https://swapi.dev/api/people/1/')
            .then((res) => {
                setPerson1(res.data);
            });

        axios.get('https://swapi.dev/api/people/2/')
            .then((res) => {
                setPerson2(res.data);
            });
    }, []);

    function updatePerson1() {
        const url = inputPerson1.current.value;
        axios.get(url).then((res) => {
            setPerson1(res.data);
            setPerson1films(res.data.films.length);
            axios.get(res.data.homeworld)
                .then((res) => {
                    setPerson1homeworld(res.data.name);
                });
        });
    }

    function updatePerson2() {
        const url = inputPerson2.current.value;
        axios.get(url).then((res) => {
            setPerson2(res.data);
            setPerson2films(res.data.films.length);
            axios.get(res.data.homeworld)
                .then((res) => {
                    setPerson2homeworld(res.data.name);
                });
        });
    }

    const personData = {
        labels: [person1.name, person2.name],
        datasets: [
            {
                label: 'Mass',
                data: [person1.mass, person2.mass],
                backgroundColor: '#FF0000',
            },
            {
                label: 'Height',
                data: [person1.height, person2.height],
                backgroundColor: '#15577A',
            },
        ],
    };

    const filmData = {
        labels: [`${person1.name} Films`, `${person2.name} Films`],
        datasets: [
            {
                data: [person1films, person2films],
                backgroundColor: ['#FF0000', '#15577A'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 0,
            },
        ],
    };

    const peopleOptions = people.map((person) => (
        <option key={person.url} value={person.url}>{person.name}</option>
    ));

    return (
        <div className="darth">
        <div className="container">
        <div className="comparison-main">
          <div className="PInfoCon">
            <h1 className="titleHolder">People Comparison</h1>
                
            <div className="row">
              <div className="col-lg-3">
                <div className="PlanetInfo">
                  <select className="dropDown person1" ref={inputPerson1} onChange={updatePerson1}>
                    {peopleOptions}
                  </select>
                  <h2>Name : {person1.name}</h2>
                  <p className="text">Hair colour : {person1.hair_color}</p>
                  <p className="text">Eye colour : {person1.eye_color}</p>
                  <p className="text">Birth year :  {person1.birth_year}</p>
                  <p className="text">Gender : {person1.gender}</p>
                  <p className="text">Homeworld : {person1homeworld}</p>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="chart-holder">
                  <div className="rotationChart">
                    <Bar data={personData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="chart-container">
            <div className="row">
              <div className="col-lg-3">
                <div className="PlanetInfo">
                  <select className="dropDown person2" ref={inputPerson2} onChange={updatePerson2}>
                    {peopleOptions}
                  </select>
                  <h2>Name : {person2.name}</h2>
                  <p className="text">Hair colour : {person2.hair_color}</p>
                  <p className="text">Eye colour : {person2.eye_color}</p>
                  <p className="text">Birth year :  {person2.birth_year}</p>
                  <p className="text">Gender : {person2.gender}</p>
                  <p className="text">Homeworld : {person2homeworld}</p>
                </div>
              </div>
              <div className="col-lg-9">
            <div className="chart-holder">
                <div className="peopleChart2">
                <Pie data={filmData} />
                </div>
                <div className="peopleChart2">
                <Doughnut data={filmData} /> 
                </div>
            </div>
            </div>

            </div>
            </div>
            </div>
          </div>
          </div>
      

    );
};

export default Comparison;
