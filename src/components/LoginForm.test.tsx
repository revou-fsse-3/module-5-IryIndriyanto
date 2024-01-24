import { render, screen, fireEvent, act, } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm'
import { useRouter } from 'next/router'

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
  onSubmit: jest.fn(),
}))

// Test cases
test('renders login form', () => {
  render(<LoginForm />)
  const emailInput = screen.getByPlaceholderText('Input Your Email')
  const passwordInput = screen.getByPlaceholderText('Input Your Password')
  const loginButton = screen.getByRole('button', { name: 'Login' })
  expect(emailInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
  expect(loginButton).toBeInTheDocument()
})

 test('error validation in login form', async () => {
  render(<LoginForm />);
  const emailInput = screen.getByPlaceholderText('Input Your Email');
  const passwordInput = screen.getByPlaceholderText('Input Your Password');
  const loginButton = screen.getByRole('button');

  // Simulate submitting the form without entering email and password
  act(() => {
    userEvent.click(loginButton);
  });

  // Assertion to check if error messages are displayed
  expect(screen.getByText('email is a required field')).toBeInTheDocument();
  expect(screen.getByText('password is a required field')).toBeInTheDocument();
});