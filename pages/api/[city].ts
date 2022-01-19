import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
    );
    res.status(200).json([data]);
    return;
  } catch (error) {
    res.status(404).json({ message: "not found" });
    return;
  }
};

export default handler;
