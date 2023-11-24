import { fireEvent, screen } from '@testing-library/react';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
import { mockBeersDefaultParams, mockDetailedBeer } from '../../../../test-utils/mock-data';
import { renderWithProviders } from '../../../../test-utils/provider-util';
import ResultsSection from '../../src/components/pages/main-page/result-section/result-section';
import BeerSection from '../../src/components/pages/main-page/beer-section/beer-section';

// //Renders beer cards ++
// //Applies a correct style if detailedBeer is present++

describe('BeerSection', () => {
  it('Renders beer cards', async () => {
    const handlers = [
      http.get('https://api.punkapi.com/v2/beers  ', async () => {
        await delay(150);
        return HttpResponse.json(mockBeersDefaultParams);
      }),
    ];

    const server = setupServer(...handlers);
    server.listen();
    renderWithProviders(<ResultsSection />);
    const beerCards = await screen.findAllByTestId('beer-card');
    expect(beerCards).toHaveLength(25);

    server.resetHandlers();
    server.close();
  });

  it('Applies a correct style if detailedBeer is present', async () => {
    const handlers = [
      http.get('https://api.punkapi.com/v2/beers  ', async () => {
        await delay(150);
        return HttpResponse.json(mockBeersDefaultParams);
      }),
      http.get('https://api.punkapi.com/v2/beers/1', async () => {
        await delay(150);
        return HttpResponse.json(mockDetailedBeer);
      }),
    ];

    const server = setupServer(...handlers);
    server.listen();

    renderWithProviders(<BeerSection />);
    const beerCards = await screen.findAllByTestId('beer-card');
    const beerSection = document.querySelector('.beer-section');
    expect(beerSection).toHaveStyle('grid-template-columns: 1fr');
    fireEvent.click(beerCards[0]);
    const detailedBeer = await screen.findByTestId('detailed-beer');
    expect(beerSection).toHaveStyle('grid-template-columns: 1fr 1fr');
    expect(detailedBeer).toBeInTheDocument();

    server.resetHandlers();
    server.close();
  });
});
