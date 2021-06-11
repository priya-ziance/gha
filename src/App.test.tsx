import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Group Home Admin', () => {
  render(<App />);
  const linkElement = screen.getByText(/Group Home Admin/i);
  expect(linkElement).toBeInTheDocument();
});
