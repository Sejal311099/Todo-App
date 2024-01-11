import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders TodoApp component', () => {
  const { getByText } = render(<App />);
  const todoAppElement = getByText(/Todo App/i);
  expect(todoAppElement).toBeInTheDocument();
});
