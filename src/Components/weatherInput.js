import React, { useState,useEffect} from "react";
import './WeatherInput.css';

export default function WeatherInput({getWeatherData}) {
    const [location, setLocation] = useState('');

    function handleInput(event) {
        event.preventDefault(); // Prevents the default form submission
        getWeatherData(location);
        setLocation('');
    }

    return (
        <div className="input-container">
            <form className="Weather-input" onSubmit={handleInput}>
                <input
                    type='text'
                    placeholder="Enter Location name...."
                    value={location}
                    name="location"
                    onChange={(e) => {
                        console.log(location);
                        setLocation(e.target.value);
                    }}
                />
                <button type="submit">
                    <span className="material-symbols-outlined">search</span>
                </button>
            </form>
        </div>
    );
}
