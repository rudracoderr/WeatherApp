import React, { useState } from "react";
import axios from "axios";
import "./app.css";

function App() {
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🌐 API CALL
  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=28a076a8c2fb46f5a1b60807262402&q=${input}&aqi=yes`
      );

      setWeatherData(response.data);
      setLoading(false);
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
          "Error fetching weather data"
      );
      setWeatherData(null);
      setLoading(false);
    }
  };

  // 🌙 DARK BACKGROUND CHECK
  const isDarkBackground = () => {
    if (!weatherData) return false;

    const condition =
      weatherData.current.condition.text.toLowerCase();
    const isDay = weatherData.current.is_day;

    if (isDay === 0) return true;

    if (
      condition.includes("rain") ||
      condition.includes("thunder") ||
      condition.includes("cloud")
    ) {
      return true;
    }

    return false;
  };

  // 🎨 BACKGROUND LOGIC
  const getBackground = () => {
    if (!weatherData) return "bg-blue-400";

    const condition =
      weatherData.current.condition.text.toLowerCase();
    const isDay = weatherData.current.is_day;

    if (isDay === 0) {
      return "bg-gradient-to-br from-black to-blue-900";
    }

    if (condition.includes("sunny") || condition.includes("clear")) {
      return "bg-gradient-to-br from-yellow-300 to-orange-400";
    }

    if (condition.includes("cloud")) {
      return "bg-gradient-to-br from-gray-400 to-gray-700";
    }

    if (condition.includes("rain") || condition.includes("drizzle")) {
      return "bg-gradient-to-br from-blue-500 to-gray-800";
    }

    if (condition.includes("thunder")) {
      return "bg-gradient-to-br from-purple-700 to-black";
    }

    if (condition.includes("mist") || condition.includes("fog")) {
      return "bg-gradient-to-br from-gray-300 to-gray-500";
    }

    return "bg-blue-400";
  };

  // 🎨 INPUT + BUTTON STYLE
  const inputStyle = isDarkBackground()
    ? "bg-white text-black placeholder-gray-500"
    : "bg-black text-white placeholder-gray-300";

  const buttonStyle = isDarkBackground()
    ? "bg-white text-black"
    : "bg-black text-white";

  // 🌫️ AQI
  const getAQI = () => {
    if (!weatherData) return null;

    const pm = weatherData.current.air_quality.pm2_5;

    if (pm <= 12) return { label: "Good 🟢", color: "text-green-300" };
    if (pm <= 35) return { label: "Moderate 🟡", color: "text-yellow-300" };
    return { label: "Poor 🔴", color: "text-red-300" };
  };

  return (
    <div
      className={`min-h-screen ${getBackground()} flex flex-col items-center justify-center transition-all duration-700`}
    >
      {/* TITLE */}
      <h1 className="text-white text-3xl font-bold mb-4">
        Weather App 🌦️
      </h1>

      {/* SEARCH */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchWeather();
        }}
        className="flex gap-2 mb-4"
      >
        <input
          className={`px-4 py-2 rounded-xl outline-none transition-all ${inputStyle}`}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search city..."
        />

        <button
          className={`px-4 py-2 rounded-xl transition-all ${buttonStyle}`}
        >
          Search
        </button>
      </form>

      {/* CARD */}
      <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl text-white shadow-2xl w-[320px] text-center">

        {loading ? (
          <p>Loading... ⏳</p>
        ) : error ? (
          <p className="text-red-200">{error}</p>
        ) : weatherData ? (
          <>
            <h2 className="text-xl font-semibold">
              {weatherData.location.name}
            </h2>

            <img
              src={"https:" + weatherData.current.condition.icon}
              className="mx-auto w-20"
            />

            <h1 className="text-5xl font-bold">
              {weatherData.current.temp_c}°C
            </h1>

            <p className="mb-3">
              {weatherData.current.condition.text}
            </p>

            <div className="flex justify-between text-sm mt-4">
              <p>💧 {weatherData.current.humidity}%</p>
              <p>💨 {weatherData.current.wind_kph} km/h</p>
            </div>

            <div className="flex justify-between text-sm mt-2">
              <p>Feels {weatherData.current.feelslike_c}°C</p>
              <p>UV {weatherData.current.uv}</p>
            </div>

            {/* AQI */}
            {weatherData.current.air_quality && (
              <div className="mt-5 border-t border-white/30 pt-3">
                <p>Air Quality</p>
                <p className={`font-bold ${getAQI()?.color}`}>
                  {getAQI()?.label}
                </p>
                 <p className="text-base mt-1 font-semibold">
    PM2.5: {weatherData.current.air_quality.pm2_5.toFixed(1)}
  </p>
              </div>
            )}
          </>
        ) : (
          <p>Search a city 🔍</p>
        )}
      </div>
    </div>
  );
}

export default App;