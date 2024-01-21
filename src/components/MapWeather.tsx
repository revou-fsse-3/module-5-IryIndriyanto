import { H1 } from '@/components/typography/H1'
import { H2 } from '@/components/typography/H2'

const MapWeather = () => {
  return (
    <div className="py-8 md:w-[800px]">
      <H1>MAP Weather</H1>
      <div className=" flex flex-col justify-center items-center gap-16 w-full h-[600px]">
        <img
          className=" w-96"
          src="../src/assets/construction.svg"
          alt="under construction"
        />
        <H2>Section Under Construction</H2>
      </div>
    </div>
  )
}

export default MapWeather
