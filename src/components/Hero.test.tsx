import { render, screen } from '@testing-library/react';
import Hero from './Hero';
import '@testing-library/jest-dom'

describe('Hero component', () => {
  test('renders welcome message and buttons', () => {
    render(<Hero />);

    const welcomeMessage = screen.getByText(/Welcome to/i);
    expect(welcomeMessage).toBeInTheDocument();

    const categoriesButton = screen.getByText(/Go to Categories table/i);
    expect(categoriesButton).toBeInTheDocument();

    const weatherButton = screen.getByText(/Go to Weather/i);
    expect(weatherButton).toBeInTheDocument();
  });
});
