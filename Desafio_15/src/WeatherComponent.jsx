import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const WeatherComponent = ({ ciudad, apiKey }) => {
    const [temperature, setTemperature] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${apiKey}`
                );

                if (!response.ok) {
                    throw new Error("");
                }

                const data = await response.json();
                setTemperature(data.main.temp);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [ciudad, apiKey]);

    const renderWeatherMessage = () => {
        if (temperature === null) {
            return null;
        }

        if (temperature > 30) {
            return "Hace mucho calor";
        } else if (temperature < 10) {
            return "Hace mucho frío";
        } else {
            return null;
        }
    };

    return (
        <div>
            {loading && <p>Cargando...</p>}
            {!loading && temperature !== null && (
                <div>
                    <p>Temperatura actual en {ciudad}: {temperature}°C</p>
                    {renderWeatherMessage() && <p>{renderWeatherMessage()}</p>}
                </div>
            )}
        </div>
    );
};

export default WeatherComponent;

WeatherComponent.propTypes = {
    ciudad: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
};