import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test/testUtils';
import EasyMartLogo from '../components/EasyMartLogo';

test('renders EasyMart logo SVG', () => {
  renderWithProviders(<EasyMartLogo size={36} />);
  const svg = screen.getByRole('img', { hidden: true });
  expect(svg).toBeInTheDocument();
});
