import React from 'react';
import { screen, fireEvent, within } from '@testing-library/react';
import { renderWithProviders } from '../test/testUtils';
import Navbar from '../components/Navbar';
import ProductCard from '../components/Products/ProductCard';

const product = {
  id: 'p1',
  name: 'Oreo Cookies',
  price: 2.99,
  description: 'Classic chocolate cookies with a creamy filling.',
  image: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=400&q=80',
  rating: 4.6
};

function TestPage() {
  return (
    <>
      <Navbar darkMode={false} setDarkMode={() => {}} />
      <ProductCard product={product} />
    </>
  );
}

test('adding an item updates cart badge in Navbar', () => {
  renderWithProviders(<TestPage />);

  const cartButton = screen.getByRole('link', { name: /shopping cart/i });
  const addBtn = screen.getByRole('button', { name: /add to cart/i });

  fireEvent.click(addBtn);

  const badge = within(cartButton).getByText('1');
  expect(badge).toBeInTheDocument();
});
