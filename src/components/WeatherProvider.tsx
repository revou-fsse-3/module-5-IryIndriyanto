import { TWeatherData } from '@/interface/weatherDataType'
import { API_KEY } from '@/utils/constant'
import { ReactNode, createContext, useContext, useState } from 'react'

interface WeatherContextProps {
  weatherData: TWeatherData | null
  fetchWeatherData: (lat: number, lon: number, units: string) => Promise<void>
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined)

export const useWeatherContext = (): WeatherContextProps => {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error('useWeatherContext must be used within a WeatherProvider')
  }
  return context
}

interface WeatherProviderProps {
  children: ReactNode
}

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [weatherData, setWeatherData] = useState<TWeatherData | null>({
    coord: {
      lon: 106.8272,
      lat: -6.1754,
    },
    weather: [
      {
        id: 501,
        main: 'Rain',
        description: 'moderate rain',
        icon: '10d',
      },
    ],
    base: 'stations',
    main: {
      temp: 29.87,
      feels_like: 36.87,
      temp_min: 26.13,
      temp_max: 32.98,
      pressure: 1006,
      humidity: 84,
    },
    visibility: 6000,
    wind: {
      speed: 7.2,
      deg: 230,
    },
    rain: {
      '1h': 0.12,
    },
    clouds: {
      all: 40,
    },
    dt: 1705053092,
    sys: {
      type: 2,
      id: 2090182,
      country: 'ID',
      sunrise: 1705013214,
      sunset: 1705058035,
    },
    timezone: 25200,
    id: 1631845,
    name: 'Pecenongan',
    cod: 200,
  })

  const fetchWeatherData = async (lat: number, lon: number, units: string) => {
    const API_URL = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}=${units}`
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  const contextValue = { weatherData, fetchWeatherData }

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  )
}
