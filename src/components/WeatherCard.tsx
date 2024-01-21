// import useGetWeather from '@/hooks/useGetWeather'
import { useWeatherContext } from "./WeatherProvider";
import { H2 } from "./typography/H2";
import { Card } from "./ui/card";

import Image from "next/image";

const WeatherCard = () => {
  const { weatherData } = useWeatherContext();
  function convertUnixTime(unixTime: number) {
    const date = new Date(unixTime * 1000);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Create a formatted string without seconds
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    } `;
    const formattedHour = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

    return { formattedDate, formattedHour };
  }

  // const { formattedDate, formattedHour } = convertUnixTime(weatherData.dt);

  return (
    <Card className="p-6">
      <H2>{weatherData?.name}</H2>
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="flex flex-col justify-between p-7 w-full lg:w-1/2  aspect-square">
          <div className="flex justify-between font-thin text-xl">
            {/* <div>{formattedDate}</div>
            <div>{formattedHour}</div> */}
          </div>
          <div className="flex justify-center text-5xl font-thin">
            {weatherData?.main.temp}° C
          </div>
          <div></div>
        </div>
        <div className="p-6 w-full lg:w-1/2 border rounded-xl border-slate-400 aspect-square">
          <div className="text-3xl font-thin">
            {weatherData?.weather[0].main}
          </div>
          <div className="flex justify-center w-full py-4">
            {weatherData?.weather[0].main === "Rain" && (
              <Image
                width={400}
                height={400}
                src="/assets/Rain.svg"
                alt="Rain"
                className="w-3/5 aspect-square"
              />
            )}
            {weatherData?.weather[0].main === "Clear" && (
              <Image
                width={400}
                height={400}
                src="/assets/sun.svg"
                alt="Clear"
                className="w-3/5 aspect-square"
              />
            )}
            {weatherData?.weather[0].main === "Drizzle" && (
              <Image
                width={400}
                height={400}
                src="/assets/Drizzle.svg"
                alt="Drizzle"
                className="w-3/5 aspect-square"
              />
            )}
            {weatherData?.weather[0].main === "Thunderstorm" && (
              <Image
                width={400}
                height={400}
                src="/assets/Thunderstorm.svg"
                alt="Thunderstorm"
                className="w-3/5 aspect-square"
              />
            )}
            {weatherData?.weather[0].main === "Clouds" && (
              <Image
                width={400}
                height={400}
                src="/assets/Clouds.svg"
                alt="Clouds"
                className="w-3/5 aspect-square"
              />
            )}
            {weatherData?.weather[0].main === "Snow" && (
              <Image
                width={400}
                height={400}
                src="/assets/sun.svg"
                alt="Snow"
                className="w-3/5 aspect-square"
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
export default WeatherCard;
