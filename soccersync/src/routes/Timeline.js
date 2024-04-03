import React from 'react';

import '../css/Timeline.css';
import {useState, useRef, useEffect } from 'react';
import axios from "axios";

import {  Chart as ChartJS,  CategoryScale,  LinearScale,  PointElement,  LineElement,  Title,  Tooltip,  Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(  CategoryScale,  LinearScale,  PointElement,  LineElement,  Title,  Tooltip,  Legend);

const Timeline = () => {

    const [movie, setMovie] = useState([]);
    const inputTime = useRef();

    const [movieName, setMovieName] = useState([]);
    const [movieYear, setMovieYear] = useState([]);
    const [movieScore, setMovieScore] = useState([]);

    const [peopleName, setPeopleName] = useState([]);
    const [peopleYear, setPeopleYear] = useState([]);

    const [timeName, setTimeName] = useState([]);
    const [timeYear, setTimeYear] = useState([]);

    const [extraText, setExtraText] = useState(""); 

    
    useEffect(() => {
        
        let moviesArray = ["A+New+Hope", "The+Empire+Strikes+Back", "Return+of+the+Jedi", "The+Phantom+Menace", "Attack+of+the+Clones", "Revenge+of+the+Sith"];
        let movieNameS = [];
        let movieYears = [];

        
        for (let i = 0; i < moviesArray.length; i++) {

            console.log(moviesArray[i]);

            axios.get('https://www.omdbapi.com/?t=' + moviesArray[i] + '&apikey=5d0c0e4f')
            .then((res) => {
                    console.log(i);
                    let data = res.data;

                    let name = data.Title;             
                    let year = data.Year;
                    let score = data.imdbRating;
    
                    movieNameS.push(name)
                    movieYears.push(year)
                    setMovieName(movieNameS)
                    setMovieYear(movieYears)

                     
                // console.log(name, year)
                // console.log(movieNameS, movieYears)
                console.log(movieName, movieYear)
            })

            let peopleNames = [];
            let peopleDate = [];
            axios.get('https://swapi.dev/api/people/')
            .then((res) =>{
                let data = res.data.results;
                // console.log(data);
                for(let i = 0; i < data.length; i++){
                    // console.log(data[i].birth_year);
                    peopleNames.push(data[i].name)
                    let yearLength = data[i].birth_year.length;
                    let dateSet = data[i].birth_year;
                    let lengthCut = yearLength - 3;
                    dateSet = dateSet.slice(0, lengthCut)
                    dateSet = dateSet.replace(".", "")
                    console.log(data[i].birth_year);
                    console.log(dateSet);
                    peopleDate.push(dateSet)

                    setPeopleName(peopleNames)
                    setPeopleYear(peopleDate)

                    
                }
            })
        }
    }, [])

       
  const movieInfo = {
    labels: timeName,
        datasets: [
        {
        label: 'Years released',
        data: timeYear,
        borderColor: '#176087',
        backgroundColor: '#15577A',
        tension: 0.4,
        },
        
    ],
  };

  function updateTimeline(){
    let selection = inputTime.current.value;

    let moviesText = "This is the release date of all the StarWars movies, and how it has was released over the years";
    let peopleText = "This is the birth dates of all the characters in the movies. All of there birth dates happened within the 'BBY' eura";

    // console.log(selection);

    if (selection == "Movies") {
        console.log("Movies");
        setTimeName(movieName)
        setTimeYear(movieYear)
        setExtraText(moviesText)
    }

    if (selection == "People") {
        console.log("People");
        setTimeName(peopleName)
        setTimeYear(peopleYear)
        setExtraText(peopleText)
    }
    




  }
      
//   let movieOptions = movie.map((item) => ( <option key={item.key} value={item.url}> {item.name} </option>))

    return(
        <div className='star'>
            <div className="timeline-main">

            <div className='timeholder'>
                <div className="texInfo">
                <select class="dropDown" name="Timeline" ref={inputTime} onChange={updateTimeline}>
                <option selected disabled hidden>Select an option</option>
                <option value="Movies">Movies</option>
                <option value="People">People</option>
                </select>
                    <h3 className="text">About: </h3>
                    <p className="text">{extraText}</p>
                                
                </div>
                <div className="timline-chart">
                    <Line data={movieInfo}/>
                </div>
            </div>
            
            </div>
        </div>      
    );
}

export default Timeline;