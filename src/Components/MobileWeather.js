import React, { useState, useEffect } from "react";
import './MobileWeather.css';

export default function MobileWeather({location,temperature,description}) {
    const [time, setTime] = useState(new Date());
    const [amPm, setAmPm] = useState(''); 

    useEffect(() => {
        const timerId = setInterval(() => {
            const now = new Date();
            setTime(now);
            setAmPm(now.getHours() >= 12 ? 'PM' : 'AM');
        }, 1000);

        return () => clearInterval(timerId); // Cleanup interval on component unmount
    }, []);


    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="Mobile-Container">
            <div className="mobile-border">
                <div className="header">
                    <span className="dot"></span>
                    <span className="horizontal-bar"></span>
                </div>
                <div className="center">
                    <div className="header-icons">
                        <span className="material-symbols-outlined">wifi</span>
                        <span className="material-symbols-outlined">battery_horiz_050</span>
                    </div>
                    <div className="date-time">
                        <p className="time">{formattedTime.substring(0,6)}</p>
                        <p className="date">{formattedDate}</p>
                    </div>
                    <p className="location-name">{location?location:''}</p>
                    <div className="temperature">
                        <p className="degree">{temperature}</p>
                        <img src={`/images/${description}.png`} className="weather-img" alt="weather icon" />
                        <p className="weathername">{description}</p>
                    </div>
                    <div className="otherdates">
                        <p className="weathername">Partly Cloudly</p>
                        <img src="/images/scattered clouds.png" alt="weather icon" />
                        <p>+34.5&deg;C</p>
                    </div>
                    <div className="otherdates">
                        <p className="weathername">Partly Cloudly</p>
                        <img src="/images/scattered clouds.png" alt="weather icon" />
                        <p>+34.5&deg;C</p>
                    </div>
                </div>
                <div className="footer"></div>
            </div>
        </div>
    );
}
