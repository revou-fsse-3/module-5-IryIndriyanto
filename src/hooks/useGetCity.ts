import { TCityData } from '@/interface/cityDataType'
import { API_KEY } from '@/utils/constant'
import { useEffect, useState } from 'react'

const useGetCity = (cityName: string) => {
  const [cityData, setCityData] = useState<TCityData[]>([])

  useEffect(() => {
    const fetchCity = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()
      setCityData(data)
    }
    fetchCity()
  }, [cityName])
  return { cityData, setCityData }
}

export default useGetCity
