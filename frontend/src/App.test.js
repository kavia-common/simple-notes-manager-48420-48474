import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header title', () => {
  render(<App />);
  const title = screen.getByRole('heading', { name: /simple notes manager/i });
  expect(title).toBeInTheDocument();
});
