import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import Chart from 'chart.js/auto';
import '../css/Home.css';

const Home = () => {
    const [movieInfo, setMovieInfo] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        // Fetch movie data and update every 6 seconds
        axios.get('https://swapi.dev/api/films/')
            .then((res) => {
                let data = res.data.results;
                let movies = [];
    
                for (let i = 0; i < data.length; i++) {
                    movies.push({
                        name: data[i].title,
                        ep: data[i].episode_id,
                        intro: data[i].opening_crawl,
                        releaseDate: data[i].release_date,
                        character: data[i].characters.length,
                        species: data[i].species.length,
                        planet: data[i].planets.length,
                        starships: data[i].starships.length,
                        vehicles: data[i].starships.length,
                    })
                }
    
                setMovieInfo(movies[1]);
                let counter = 0;
                const timer = setInterval(() => {
                    if (counter <= 5) {
                        setMovieInfo(movies[counter]);
                        counter++;
                    } else {
                        counter = 0;
                    }
                }, 6000);
                return () => clearInterval(timer);
            })
    }, []);

    useEffect(() => {
        if (chartRef.current !== null) {
            chartRef.current.destroy();
        }

        // Chart.js code to draw the chart
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Characters', 'Species', 'Planets', 'Star Ships', 'Vehicles'],
                datasets: [{
                    label: 'Statistics',
                    data: [movieInfo.character, movieInfo.species, movieInfo.planet, movieInfo.starships, movieInfo.vehicles],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Movie Statistics',
                        font: {
                            size: 20
                        }
                    },
                    legend: {
                        display: false
                    }
                }
            }
        });

        chartRef.current = myChart;
    }, [movieInfo]);

    return (
        <div className='star'>
        <div className="container-2">
        <div className="row">
                <div className="col-md-12">
                <div className="shipinfo">
                    <div className="card-body">
                    <div className="titleCon">
                        <h1 className="title-text-2">Star Wars</h1>
                        <p className="info-text-2">Star Wars is an epic space opera franchise created by George Lucas, which began with the<br/> eponymous 1977 film and quickly became a worldwide pop-culture phenomenon.</p>
                        <p className="description-text-2">The franchise has expanded to various forms of media including film, television series, novels, comics, and video games.<br/> It depicts the adventures of characters "a long time ago in a galaxy far, far away",<br/> in which humans and various species of aliens coexist with robots, or "droids", who serve as sentient slaves and assistants to their owners.</p>
                        <div className='img'>
                        </div>
          </div>
          
        </div>
                       
        
      </div>
      
    </div>
    
  </div>
  <img src={require("../assets/dark spaceship.png")} alt="" />
            <div className="row firts">
                <div className="col-md-4">
                    <div className="ship card">
                        <div className="card-body">
                            <div className="titleCon">
                                <h1 className="title-text">{movieInfo.name}</h1>
                                <p className="info-text">Episode  - {movieInfo.ep}</p>
                                <p className="description-text">{movieInfo.intro}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="ship card">
                        <div className="card-body">
                            <div className="titleCon2">
                                <div className="canvas-container">
                                    <canvas id="myChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
    </div>
    );
}

export default Home;





