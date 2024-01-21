import { Button } from '@/components/ui/button'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { ScrollArea } from './ui/scroll-area'
import { useWeatherContext } from './WeatherProvider'
import { API_KEY } from '@/utils/constant'
import { FormEvent, useState } from 'react'
import { TCityData } from '@/interface/cityDataType'

const SearchBar = () => {
  const { fetchWeatherData } = useWeatherContext()

  const handleWeather = (lat: number, lon: number, units = 'metric') => {
    fetchWeatherData(lat, lon, units)
  }

  const [cityData, setCityData] = useState<TCityData[]>([])

  const fetchCityData = async (cityName: string) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=6&appid=${API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const data = await response.json()
    setCityData(data)
  }

  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetchCityData(searchTerm)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="w-[200px] justify-between">
          <span>Search...</span> <MagnifyingGlassIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search City</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <Input
              id="search"
              placeholder="search city"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit" size="sm" className="px-3 py-5">
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="h-4 w-4" />
          </Button>
        </form>
        <ScrollArea className=" h-32 w-auto rounded-md ">
          <div className="p-0">
            {cityData?.map((city) => (
              <DialogClose key={city.lat} className="w-full">
                <Button
                  
                  variant={'outline'}
                  className=" w-full py-3 px-4 my-1"
                  onClick={() => handleWeather(city.lat, city.lon)}
                >
                  {city.name}, {city.state}, {city.country}.
                </Button>
              </DialogClose>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default SearchBar
