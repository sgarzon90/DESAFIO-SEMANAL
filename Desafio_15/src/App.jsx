import { useState } from "react";
import WeatherComponent from "./WeatherComponent";
import "./app.scss";

const App = () => {
    const apiKey = "50ab68c7455bc9130fbd2c68688c798d";
    const [city, setCity] = useState("");

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    return (
        <div className="container">
            <h1>Información del Clima</h1>
            <label htmlFor="cityInput">Ingrese la ciudad:</label>
            <input
                type="text"
                id="cityInput"
                value={city}
                onChange={handleCityChange}
            />
            <WeatherComponent ciudad={city} apiKey={apiKey} />
        </div>
    );
};

export default App;
