import Weather from "@/components/Weather";
import WeatherLayout from "@/components/WeatherLayout";
import { WeatherProvider } from "@/components/WeatherProvider";
import React from "react";

const Page = () => {
  return (
    <WeatherProvider>
      <WeatherLayout>
        <Weather />;
      </WeatherLayout>
    </WeatherProvider>
  );
};

export default Page;
