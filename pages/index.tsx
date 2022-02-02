import axios from "axios";
import { setDefaultResultOrder } from "dns";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import CurrentForecast from "../components/CurrentForecast";
import Form from "../components/Form";
import { color, mixin } from "../shered/styles";
import { CityCurrentForecast } from "../types/weathertypes";

const StyledHome = styled.div`
  background-color: ${mixin.lighten(color.primary, 0.3)};
  min-height: 100vh;
`;
export const Box = styled.div`
  height: 25rem;
  text-align: center;
  ${mixin.center};
  font-size: 2.8rem;
  color: ${mixin.darken(color.primary, 0.2)};
`;
export const Spinner = styled.div`
  margin: auto;
  border: 1rem solid ${mixin.lighten(color.primary, 0.3)};
  border-radius: 50%;
  border-top-color: ${mixin.darken(color.primary, 0.3)};
  width: 6rem;
  height: 6rem;
  animation: rotate-spinner 0.8s linear;
  animation-iteration-count: infinite;
  @keyframes rotate-spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Home: NextPage = () => {
  const [cities, setCities] = useState<CityCurrentForecast[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const submitHandler = async (city: string) => {
    console.log(city);
    if (city.length < 3) {
      setError("City name must contain at least 3 characters!");
      return;
    }
    try {
      console.log("try");
      setLoading(true);
      setError("");
      const { data } = await axios(`/api/${city}`);
      setLoading(false);
      if (data.length === 0) {
        setError("There is no weather data for this city");
      } else {
        setCities(data);
      }
    } catch (error) {
      setLoading(false);
      setCities([]);
      setError("Connection failed");
    }
  };

  return (
    <StyledHome>
      <Form onSubmit={submitHandler} loading={loading} />
      {loading ? (
        <Box>
          <Spinner />{" "}
        </Box>
      ) : error ? (
        <Box>{error}</Box>
      ) : (
        cities.map((city, id) => (
          <Link
            key={id}
            href={{
              pathname: `/${city.name}`,
              query: { lon: city.coord.lon, lat: city.coord.lat },
            }}
          >
            <a>
              <CurrentForecast city={city} />
            </a>
          </Link>
        ))
      )}
    </StyledHome>
  );
};

export default Home;
