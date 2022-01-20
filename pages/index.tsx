import axios from "axios";
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

const Home: NextPage = () => {
  const [cities, setCities] = useState<CityCurrentForecast[]>([]);
  const submitHandler = async (city: string) => {
    try {
      const { data } = await axios(`/api/${city}`);
      setCities(data);
    } catch (error) {
      setCities([]);
      return;
    }
  };

  return (
    <StyledHome>
      <Form onSubmit={submitHandler} />
      {cities.map((city, id) => (
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
      ))}
    </StyledHome>
  );
};

export default Home;
