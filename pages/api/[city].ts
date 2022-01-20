import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import cities from "../../data/city.json";
import { City } from "../../types/weathertypes";
import { getAsString } from "../../utils/getAsString";

const cityArray: City[] = cities as City[];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const filteredCities = cityArray.filter((city) =>
    city.name
      .toLowerCase()
      .startsWith(getAsString(req.query.city).toLowerCase())
  );
  try {
    let data: City[] = [];
    const response1 = await axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
    );
    data.push(response1.data);
    if (filteredCities.length !== 0) {
      const response2 = await axios(
        `https://api.openweathermap.org/data/2.5/weather?id=${filteredCities[0].id}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );
      const index = data.findIndex((object) => object.id === response2.data.id);
      if (index === -1) {
        data.push(response2.data);
      }
    }
    res.status(200).json(data);
    return;
  } catch (error) {
    if (filteredCities.length === 1) {
      const response2 = await axios(
        `https://api.openweathermap.org/data/2.5/weather?id=${filteredCities[0].id}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );
      res.status(200).json([response2.data]);
      return;
    } else if (filteredCities.length > 1) {
      const [response1, response2] = await Promise.all([
        axios(
          `https://api.openweathermap.org/data/2.5/weather?id=${filteredCities[0].id}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
        ),
        axios(
          `https://api.openweathermap.org/data/2.5/weather?id=${filteredCities[1].id}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
        ),
      ]);
      res.status(200).json([response1.data, response2.data]);
      return;
    }

    res.status(200).json([]);
  }
};
export default handler;
