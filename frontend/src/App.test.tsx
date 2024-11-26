import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
<<<<<<< HEAD
import '@testing-library/jest-dom';

=======
>>>>>>> 729ade954818bf06d2a1d9eab21b4dad24ce2b4a

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
