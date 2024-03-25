import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const [teamSeasons] = useState([]);
    const [error, setError] = useState(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://api.soccersapi.com/v2.2/leagues/',
                params: {
                    user: '231244',
                    token: '5141dd56f609919d59e75f340258d327',
                    t: 'list'
                }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Dynamically load the script for the live score widget
        const script = document.createElement('script');
        script.src = 'https://api.soccersapi.com/v2.2/countries/?user={{231244}}&token={{5141dd56f609919d59e75f340258d327}}&t=list';
        script.async = true;
        script.onload = () => {
            setScriptLoaded(true);
        };
        document.body.appendChild(script);

        // Cleanup
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <h1>Team Seasons</h1>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {teamSeasons.map(season => (
                        <li key={season}>{season}</li>
                    ))}
                </ul>
            )}

            {/* Render live score widget if script is loaded */}
            {scriptLoaded && (
                <div id="ls-widget" data-w="awo_w4536_65f9834db8f90" className="livescore-widget"></div>
            )}
        </div>
    );
};

export default BarChart;