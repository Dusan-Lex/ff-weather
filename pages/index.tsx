import axios from "axios";
import type { NextPage } from "next";
import { useState } from "react";
import CurrentForecast from "../components/CurrentForecast";
import Form from "../components/Form";
import { CityCurrentForecast } from "../types/weathertypes";

const Home: NextPage = () => {
  const [cities, setCities] = useState<CityCurrentForecast[]>([]);
  console.log(cities);
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
    <div>
      <Form onSubmit={submitHandler} />
      {cities.map((city) => (
        <CurrentForecast key={city.sys.id} city={city} />
      ))}
    </div>
  );
};

export default Home;
