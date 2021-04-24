import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders devsearch h1 tag', () => {
  render(<App />);
  const linkElement = screen.getByText(/devsearch/i);
  expect(linkElement).toBeInTheDocument();
});
