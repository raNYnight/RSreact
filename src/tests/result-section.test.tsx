// Tests for the Card List component:
// Verify that the component renders the specified number of cards ++
// Check that an appropriate message is displayed if no cards are present++
//handle click on card works correctly ++
//Validate that clicking on a card opens a detailed card component;

import ResultSection from '@/components/result-section';
import Home from '@/pages';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import * as nextRouter from 'next/router';
import { describe, expect, it, vi } from 'vitest';
import { mockBeersDefaultParams } from './test-utils/mock-data';
import { mockRouter } from './test-utils/with-router';

describe('ResultSection', () => {
  vi.spyOn(nextRouter, 'useRouter').mockReturnValue(mockRouter);

  it('Verify that the component renders the specified number of cards', async () => {
    render(<ResultSection fetchedBeers={mockBeersDefaultParams} />);
    const beers = await screen.findAllByTestId('beer-card');
    expect(beers).toHaveLength(25);
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    render(<ResultSection fetchedBeers={[]} />);
    const msg = screen.getByText('No results were found. Please try another search.');
    expect(msg).toBeInTheDocument();
  });

  it('handle click on card works correctly', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Home
          fetchedBeers={mockBeersDefaultParams}
          detailedBeer={null}
        />
      </RouterContext.Provider>
    );

    const beers = await screen.findAllByTestId('beer-card');
    const beer = beers[0];

    fireEvent.click(beer);
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/?details=1', '/?details=1', {
      locale: undefined,
      scroll: false,
      shallow: undefined,
    });

    // expect(mockRouter.query.details).toBe('1');
  });
});
