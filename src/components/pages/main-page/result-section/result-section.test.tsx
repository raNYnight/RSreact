// Tests for the Card List component:
// Verify that the component renders the specified number of cards ++
// Check that an appropriate message is displayed if no cards are present++
//handle click on card works correctly ++
//Displays a spinner while loading ++
//Validate that clicking on a card opens a detailed card component;

import React from 'react';
import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test-utils/provider-util';
import ResultsSection from './result-section';
import { mockBeersDefaultParams, mockDetailedBeer } from '../../../../test-utils/mock-data';
import BeerSection from '../beer-section/beer-section';

describe('ResultSection', () => {
  it('Verify that the component renders the specified number of cards', async () => {
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

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    const handlers = [
      http.get(
        'https://api.punkapi.com/v2/beers?beer_name=asdasdas&per_page=25&page=1  ',
        async () => {
          await delay(150);
          return HttpResponse.json([]);
        }
      ),
    ];

    const server = setupServer(...handlers);
    server.listen();

    renderWithProviders(<ResultsSection />);

    const msg = await screen.findByText('There is no beer found');
    expect(msg).toBeInTheDocument();

    server.resetHandlers();
    server.close();
  });

  it('Displays a spinner while loading', async () => {
    const handlers = [
      http.get(
        'https://api.punkapi.com/v2/beers?beer_name=asdasdas&per_page=25&page=1  ',
        async () => {
          await delay(1500);
          return HttpResponse.json([]);
        }
      ),
    ];

    const server = setupServer(...handlers);
    server.listen();

    renderWithProviders(<ResultsSection />);

    const spinner = await screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument();

    server.resetHandlers();
    server.close();
  });

  it('handle click on card works correctly', async () => {
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

    fireEvent.click(beerCards[0]);
    const detailedBeer = await screen.findByTestId('detailed-beer');
    expect(detailedBeer).toBeInTheDocument();
    server.resetHandlers();
    server.close();
  });
});
