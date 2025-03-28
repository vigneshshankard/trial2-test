import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

test('renders a placeholder div', () => {
  render(
    <MemoryRouter>
      <div>Placeholder</div>
    </MemoryRouter>
  );
  const placeholderElement = screen.getByText(/placeholder/i);
  expect(placeholderElement).toBeInTheDocument();
});
