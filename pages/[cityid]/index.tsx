import axios from "axios";
import Link from "next/link";
import styled from "styled-components";
import { color, mixin } from "../../shered/styles";
import { RootObject } from "../../types/dayweathertype";

const Title = styled.h2`
  text-align: center;
  color: ${mixin.darken(color.primary, 0.7)};
`;

const Container = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  min-height: 100vh;
  background: ${mixin.lighten(color.primary, 0.35)};
  ${mixin.center};
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    background: ${mixin.lighten(color.primary, 0.7)};
  }
`;
const DayBox = styled.div`
  width: 100%;
  ${mixin.center};
  .item {
    margin: 1px;
    height: 30rem;
    width: 19.5%;
    background-color: ${mixin.lighten(color.primary, 0.6)};
    ${mixin.center}
    flex-direction: column;
    &-day {
      color: ${mixin.darken(color.primary, 0.7)};
      font-size: 2.5rem;
    }
    &-temp {
      color: #352d2d;
      span {
        font-size: 2.2rem;
        padding: 0.5rem 1rem;
        font-weight: 600;
        color: ${mixin.lighten(color.primary, 0.8)};
        margin-right: 2rem;
        background-color: ${color.primary};
        border-radius: 5px;
      }
    }
    @media only screen and (max-width: 600px) {
      width: 96%;
      background-color: ${mixin.lighten(color.primary, 0.5)};
    }
  }
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
export const Icon = styled.img`
  width: 17rem;
  @media only screen and (max-width: 600px) {
    width: 19rem;
  }
`;

const StyledLink = styled.a`
  margin: 3rem;
  background: linear-gradient(
    to right,
    ${color.primary},
    ${mixin.darken(color.primary, 0.15)}
  );
  border-radius: 1rem;
  color: ${mixin.lighten(color.primary, 0.7)};
  padding: 1rem 13rem;
  max-width: 13rem;
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${mixin.darken(color.primary, 0.35)};
  }
`;

interface Forecast5dayProps {
  forecast5days: RootObject;
  city: string;
}

const Forecast5days = ({ forecast5days, city }: Forecast5dayProps) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <Container>
      <Title>5-Day Weather Forecast , {JSON.parse(city)}</Title>
      <DayBox>
        {forecast5days.daily.map((item, i) => {
          const date = new Date(item.dt * 1000);
          const day = days[date.getDay()];
          if (i < 5)
            return (
              <div className="item" key={i}>
                <div className="item-day">{day}</div>
                <div className="item-icon">
                  <Icon
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
                    alt="icon-weather"
                  ></Icon>
                </div>
                <div className="item-temp">
                  <span>{Math.round(item.temp.max)}°C</span>
                  {Math.round(item.temp.min)}°C
                </div>
              </div>
            );
        })}
      </DayBox>
      <Link href="/" passHref>
        <StyledLink>Back</StyledLink>
      </Link>
    </Container>
  );
};

export default Forecast5days;

export async function getServerSideProps(context: any) {
  const { data } = await axios(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${context.query.lat}&lon=${context.query.lon}&exclude=current,minutely,hourly,alerts&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
  );
  return {
    props: { forecast5days: data, city: JSON.stringify(context.params.cityid) },
  };
}
