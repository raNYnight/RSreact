import Home from '@/pages';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as nextRouter from 'next/router';
import { describe, expect, it, vi } from 'vitest';
import { mockBeersDefaultParams, mockDetailedBeer } from './test-utils/mock-data';
import { mockRouter } from './test-utils/with-router';

// Tests for the Detailed card component //
// Check that a loading indicator is displayed while fetching data;++
// Make sure the detailed card component correctly displays the detailed card data;++
// Ensure that clicking the close button hides the component.++
//Check that click makes additional api call++

describe('Detailed beer', () => {
  vi.spyOn(nextRouter, 'useRouter').mockReturnValue(mockRouter);
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(
      <Home
        fetchedBeers={mockBeersDefaultParams}
        detailedBeer={mockDetailedBeer}
      />
    );

    const detailedBeer = await screen.findByTestId('detailed-beer');
    await waitFor(async () => {
      expect(detailedBeer).toBeInTheDocument();
      const name = await screen.findByTestId('detailed-beer-name');
      const img = detailedBeer.querySelector('img');
      const descr = detailedBeer.querySelector('p') as HTMLParagraphElement;
      const tag = detailedBeer.querySelector('h3') as HTMLHeadingElement;
      expect(name.textContent).toEqual(mockDetailedBeer.name);
      expect(img?.src).toEqual(
        'http://localhost:3000/_next/image?url=https%3A%2F%2Fimages.punkapi.com%2Fv2%2Fkeg.png&w=3840&q=75'
      );
      expect(descr.textContent).toEqual(mockDetailedBeer.description);
      expect(tag.textContent).toEqual(mockDetailedBeer.tagline);
    });
  });

  it('Ensure that clicking the close button hides the component', async () => {
    render(
      <Home
        fetchedBeers={mockBeersDefaultParams}
        detailedBeer={mockDetailedBeer}
      />
    );
    const detailedBeer = await screen.findByTestId('detailed-beer');
    expect(detailedBeer).toBeInTheDocument();
    const closeBtn = await screen.findByTestId('close-detailed-beer');
    fireEvent.click(closeBtn);
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith(
      {
        pathname: '/',
        query: {},
      },
      undefined,
      {
        scroll: false,
      }
    );
  });
});
