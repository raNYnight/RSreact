// Tests for the Card List component:
// Verify that the component renders the specified number of cards;
// Check that an appropriate message is displayed if no cards are present.
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { it } from 'vitest';
import { BeerContext, BeerContextValue } from '../../../contexts/beer-context';
import ResultSection from './result-section';
import App from '../../../app/App';

describe('ResultsSection', async () => {
  let mockData: BeerContextValue = {
    searchTerm: 'Berliner Weisse',
    itemPerPage: '25',
    pageTerm: 1,
    searchResults: [
      {
        id: 3,
        name: 'Berliner Weisse With Yuzu - B-Sides',
        tagline: 'Japanese Citrus Berliner Weisse.',
        description: 'Japanese citrus fruit intensifies the sour nature of this German classic.',
        abv: 4.2,
        image_url: 'https://images.punkapi.com/v2/keg.png',
      },
      {
        id: 35,
        name: 'Berliner Weisse With Raspberries And Rhubarb - B-Sides',
        tagline: 'Fruity Berliner Weisse.',
        description: 'Tart, dry and acidic with a punch of summer berry as rhubarb crumble.',
        abv: 3.6,
        image_url: 'https://images.punkapi.com/v2/keg.png',
      },
      {
        id: 193,
        name: 'Blitz Berliner Weisse',
        tagline: 'Berliner Fruit Beer.',
        description:
          'Our sour recipe for all fruit Blitz beers uses a process called kettle souring. In this we steep a bag of malt in the wort to allow the bacteria to grow in it.',
        abv: 3,
        image_url: 'https://images.punkapi.com/v2/keg.png',
      },
    ],
    isNextPageAvailable: false,
    isResultsLoading: false,
    isDetailsLoading: true,
    detailedBeer: null,
    detailedBeerID: undefined,
    handleSearch: () => {},
    handleItemsPerPageChange: () => {},
    handlePreviousPage: () => {},
    handleNextPage: () => {},
    handleDetailsOpen: () => {},
  };

  it('Renders the specified number of cards', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <BeerContext.Provider value={mockData}>
          <ResultSection />
        </BeerContext.Provider>
      </MemoryRouter>
    );
    const beerCards = screen.getAllByTestId('beer-card');
    expect(beerCards.length).toBe(3);
  });

  it('Displays an appropriate message if no cards are present', async () => {
    mockData = {
      ...mockData,
      searchTerm: '322',
      searchResults: [],
    };
    render(
      <MemoryRouter initialEntries={['/']}>
        <BeerContext.Provider value={mockData}>
          <App />
        </BeerContext.Provider>
      </MemoryRouter>
    );
    const beerCards = screen.queryAllByTestId('beer-card');
    expect(beerCards.length).toBe(0);
    expect(screen.getByText('There is no beer found')).toBeInTheDocument();
  });
});
