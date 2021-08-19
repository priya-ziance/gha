import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Authenticating', () => {
  render(<App />);
  const linkElement = screen.getByText(/Authenticating/i);
  expect(linkElement).toBeInTheDocument();
});
