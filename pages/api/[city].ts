import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(process.env.NEXT_PUBLIC_WEATHER_API_KEY);
    const { data } = await axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );
    res.status(200).json(data);
    return;
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "not found" });
    return;
  }
};

export default handler;
