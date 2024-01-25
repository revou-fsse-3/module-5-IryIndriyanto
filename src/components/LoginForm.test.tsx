import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginForm from './LoginForm'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
  onSubmit: jest.fn(),
}))

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
  render(<LoginForm />)
  const loginButton = screen.getByRole('button')

  fireEvent.click(loginButton)

  await waitFor(() => {
    expect(screen.getByText('email is a required field')).toBeInTheDocument()
    expect(screen.getByText('password is a required field')).toBeInTheDocument()
  })
})
