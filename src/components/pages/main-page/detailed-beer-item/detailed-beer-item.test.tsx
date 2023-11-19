import { fireEvent, screen, waitFor } from '@testing-library/react';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
import { mockBeersDefaultParams, mockDetailedBeer } from '../../../../test-utils/mock-data';
import { renderWithProviders } from '../../../../test-utils/provider-util';
import BeerSection from '../beer-section/beer-section';
import { vi } from 'vitest';
import * as useFetchBeerByIdQuery from '../../../../slices/apiSlice';

// Tests for the Detailed card component //
// Check that a loading indicator is displayed while fetching data;++
// Make sure the detailed card component correctly displays the detailed card data;++
// Ensure that clicking the close button hides the component.++
//Check that click makes additional api call++

describe('Detailed beer', () => {
  const handlers = [
    http.get('https://api.punkapi.com/v2/beers  ', async () => {
      await delay(150);
      return HttpResponse.json(mockBeersDefaultParams);
    }),
    http.get('https://api.punkapi.com/v2/beers/1', async () => {
      await delay(0);
      return HttpResponse.json([mockDetailedBeer]);
    }),
  ];

  const server = setupServer(...handlers);
  server.listen();
  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
  beforeAll(() => server.listen());

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    renderWithProviders(<BeerSection />, {
      preloadedState: {
        app: {
          search: '',
          detailedBeerID: 1,
          page: 1,
          itemPerPage: '25',
        },
      },
    });
    const beerCards = await screen.findAllByTestId('beer-card');
    fireEvent.click(beerCards[0]);
    const detailedBeer = await screen.findByTestId('detailed-beer');
    await waitFor(async () => {
      expect(detailedBeer).toBeInTheDocument();
      const name = await screen.findByTestId('detailed-beer-name');
      const img = detailedBeer.querySelector('img');
      const descr = detailedBeer.querySelector('p') as HTMLParagraphElement;
      const tag = detailedBeer.querySelector('h3') as HTMLHeadingElement;
      expect(name.textContent).toEqual(mockDetailedBeer.name);
      expect(img?.src).toEqual(mockDetailedBeer.image_url);
      expect(descr.textContent).toEqual(mockDetailedBeer.description);
      expect(tag.textContent).toEqual(mockDetailedBeer.tagline);
    });
  });

  it('Ensure that clicking the close button hides the component', async () => {
    renderWithProviders(<BeerSection />);
    const beerCards = await screen.findAllByTestId('beer-card');
    fireEvent.click(beerCards[0]);
    const closeBTN = await screen.findByTestId('close-detailed-beer');
    expect(closeBTN).toBeInTheDocument();
    fireEvent.click(closeBTN);
    const detailedBeer = screen.queryByTestId('detailed-beer');
    expect(detailedBeer).not.toBeInTheDocument();
  });

  it('Check that a loading indicator is displayed while fetching data', async () => {
    renderWithProviders(<BeerSection />);
    const beerCards = await screen.findAllByTestId('beer-card');
    fireEvent.click(beerCards[0]);
    const detailedBeer = await screen.findByTestId('detailed-beer');
    expect(detailedBeer).toBeInTheDocument();
    await waitFor(() => {
      const spinner = screen.queryByTestId('spinner');
      expect(spinner).toBeInTheDocument();
    });
  });

  it('Check that click makes additional api call', async () => {
    const spyApi = vi.spyOn(useFetchBeerByIdQuery, 'useFetchBeerByIdQuery');
    renderWithProviders(<BeerSection />);
    const beerCards = await screen.findAllByTestId('beer-card');
    fireEvent.click(beerCards[0]);
    const detailedBeer = await screen.findByTestId('detailed-beer');
    expect(detailedBeer).toBeInTheDocument();
    expect(spyApi).toHaveBeenCalled();
  });
});
