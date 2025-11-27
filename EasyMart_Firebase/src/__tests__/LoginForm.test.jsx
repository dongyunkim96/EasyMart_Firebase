import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../test/testUtils';
import LoginForm from '../components/Auth/LoginForm';

test('allows typing email & password and shows Login button', () => {
  renderWithProviders(<LoginForm />);

  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText(/password/i);
  const button = screen.getByRole('button', { name: /login/i });

  fireEvent.change(email, { target: { value: 'test@example.com' } });
  fireEvent.change(password, { target: { value: '123456' } });

  expect(email).toHaveValue('test@example.com');
  expect(password).toHaveValue('123456');
  expect(button).toBeEnabled();
});
