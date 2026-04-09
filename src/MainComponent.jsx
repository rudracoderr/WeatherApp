import React from "react";
import Header from "./Header";
import weatherData from "./App";
import setInput from "./App";


const MainComponent = () => {
    return (
        <>
        <div>
            <Header />
        </div>
        <div>
            <h1 className="text-3xl font-bold text-center mt-10">Welcome to the Weather App</h1>
            <p className="text-center mt-4">Get the latest weather updates for your city.</p>
        </div>
        <div className="inputdata">
            <input
                type="text"
                placeholder="Enter city name"
                className="border p-2 rounded w-full max-w-md mx-auto mt-4"
                onChange={(e) => setInput(e.target.value)}
            />
            <button className="bg-blue-500 text-white p-2 rounded mt-2">Get Weather</button>
        </div>
        <div>
            {weatherData ? (
               <p>loading...</p>
            ) :    error ? (
               <p>{error}</p>) : weather ? (
                <div className="weather-info">
                    <h2 className="text-2xl font-bold">{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
               ) : (
                <p>please enter  a city name</p>
            
            )}
        </div>
        </>
    )
}
export default MainComponent