import Footer from '@/components/footer';
import Home from '@/pages';
import Custom404 from '@/pages/404';
import { render, screen } from '@testing-library/react';
import * as nextRouter from 'next/router';
import { describe, expect, it, vi } from 'vitest';
import { mockRouter } from './test-utils/with-router';

import { mockBeersDefaultParams, mockDetailedBeer } from './test-utils/mock-data';

describe('App ', () => {
  // vi.spyOn(nextRouter, 'useRouter').mockReturnValue(mockRouter);
  it('updates the route on button click', async () => {
    render(<Footer />);

    expect(mockRouter.push).toHaveBeenCalledTimes(0);
    mockRouter.push('/sda');
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    render(<Custom404 />);
    const text = screen.getByText('404 - Page Not Found');
    expect(text).toBeInTheDocument();
  });
  it('Applies a correct style if detailedBeer is present', async () => {
    vi.spyOn(nextRouter, 'useRouter').mockReturnValue(mockRouter);

    render(
      <Home
        fetchedBeers={mockBeersDefaultParams}
        detailedBeer={mockDetailedBeer}
      />
    );
    const beerSection = await screen.findByTestId('beer-section');
    expect(beerSection).toBeInTheDocument();
    expect(beerSection).toHaveStyle('grid-template-columns: 1fr 1fr');
  });
});
