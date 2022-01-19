import React from "react";
import styled from "styled-components";
import { color, mixin } from "../shered/styles";
import { CityCurrentForecast } from "../types/weathertypes";

const StyledCurrentForecast = styled.div`
  width: 100%;
  height: auto;
  min-height: 27rem;
  background-color: ${mixin.lighten(color.primary, 0.7)};
  display: flex;
`;

const WeatherIconBox = styled.div`
  width: 20%;
  background-color: ${mixin.lighten(color.primary, 0.4)};
  ${mixin.center}
  @media only screen and (max-width: 600px) {
    width: 30%;
  }
`;

const WeatherIcon = styled.img`
  width: 70%;
  @media only screen and (max-width: 900px) {
    width: 85%;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const WeatherDescription = styled.div`
  padding: 2rem 4rem;
  width: 80%;
  height: 100%;
  background-color: ${mixin.lighten(color.primary, 0.7)};
  font-size: 1.9rem;
  h2 {
    margin: 1rem 0;
    display: inline-block;
    color: ${color.primary};
  }
  p {
    margin-top: 0;
    font-weight: 500;
  }
  .temp-wind-clouds {
    padding: 2rem 0;
    line-height: 3.3rem;
    span {
      background: linear-gradient(
        to right,
        ${color.primary},
        ${mixin.darken(color.primary, 0.15)}
      );
      color: white;
      padding: 0.5rem;
      border-radius: 0.5rem;
      margin-right: 1rem;
    }
  }
  .coords {
    margin-top: 1rem;
    span {
      color: ${mixin.darken(color.primary, 0.1)};
    }
  }
`;

export interface CurrentForecastProps {
  city: CityCurrentForecast;
}

const CurrentForecast = ({ city }: CurrentForecastProps) => {
  return (
    <StyledCurrentForecast>
      <WeatherIconBox>
        <WeatherIcon
          src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`}
          alt="Weather icon"
        ></WeatherIcon>
      </WeatherIconBox>
      <WeatherDescription>
        <div>
          <h2>
            {city.name} , {city.sys.country}{" "}
          </h2>
          <p>{city.weather[0].description.toUpperCase()}</p>
        </div>

        <div className="temp-wind-clouds">
          <span>{Math.round(city.main.temp)}°C </span>
          temperature from {city.main.temp_min} to {city.main.temp_max}°C , wind{" "}
          {city.wind.speed} m/s , clouds {city.clouds.all} % ,{" "}
          {city.main.pressure} hpa
        </div>
        <div className="coords">
          Geo coords{" "}
          <span>
            [{city.coord.lon},{city.coord.lat}]
          </span>
        </div>
      </WeatherDescription>
    </StyledCurrentForecast>
  );
};

export default CurrentForecast;
