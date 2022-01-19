import axios from "axios";
import type { NextPage } from "next";
import { useState } from "react";
import Form from "../components/Form";

const Home: NextPage = () => {
  const [cities, setCities] = useState<any[]>([]);

  const submitHandler = async (city: string) => {
    try {
      const { data } = await axios(`/api/${city}`);
      setCities(data);
    } catch (error) {
      setCities([]);
    }
  };

  return (
    <div>
      <Form onSubmit={submitHandler} />
      {JSON.stringify(cities)}
    </div>
  );
};

export default Home;
