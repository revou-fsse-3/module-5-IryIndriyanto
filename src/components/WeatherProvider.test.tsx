import { render, screen, act, fireEvent } from '@testing-library/react';
import { WeatherProvider, useWeatherContext } from './WeatherProvider';
import '@testing-library/jest-dom'

const MockComponent = () => {
  const { weatherData, fetchWeatherData } = useWeatherContext();

  return (
    <div>
      <p>{weatherData ? `Temperature: ${weatherData.main.temp}` : 'No data'}</p>
      <button onClick={() => fetchWeatherData(0, 0, 'metric')}>Fetch Weather</button>
    </div>
  );
};

describe('WeatherProvider', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(JSON.stringify({ main: { temp: 30 } })))
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders children and updates weatherData', async () => {
    render(
      <WeatherProvider>
        <MockComponent />
      </WeatherProvider>
    );

    const initialText = screen.getByText(/Temperature: 29.87/i);
    expect(initialText).toBeInTheDocument();

    const fetchButton = screen.getByText(/Fetch Weather/i);
    fireEvent.click(fetchButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    const updatedText = screen.getByText(/Temperature:/i);
    expect(updatedText).toBeInTheDocument();
  });
});
