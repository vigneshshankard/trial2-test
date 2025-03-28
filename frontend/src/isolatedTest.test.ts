import { render } from '@testing-library/react';

test('isolated test for jsdom', () => {
  const { container } = render(<div>Isolated Test</div>);
  expect(container).toBeInTheDocument();
});