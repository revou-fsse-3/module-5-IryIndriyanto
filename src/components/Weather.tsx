import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import { H1 } from "@/components/typography/H1";

const Weather = () => {
  return (
    <div className="py-8 md:max-w-[700px] mx-4">
      <H1 className=" text-4xl mb-8">Current Weather</H1>
      <div className="flex flex-col gap-6">
        <SearchBar />
        <WeatherCard />
      </div>
    </div>
  );
};

export default Weather;
