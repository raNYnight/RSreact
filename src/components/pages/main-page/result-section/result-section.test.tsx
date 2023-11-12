// Tests for the Card List component:
// Verify that the component renders the specified number of cards;
// Check that an appropriate message is displayed if no cards are present.
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { it, vi } from 'vitest';
import { BeerContext, BeerContextValue } from '../../../contexts/beer-context';
import ResultSection from './result-section';

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

  it('Displays a spinner while loading', async () => {
    mockData = {
      ...mockData,
      isResultsLoading: true,
    };
    render(
      <MemoryRouter initialEntries={['/']}>
        <BeerContext.Provider value={mockData}>
          <ResultSection />
        </BeerContext.Provider>
      </MemoryRouter>
    );
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('handle click on card works correctly', async () => {
    mockData = {
      ...mockData,
      isResultsLoading: false,
    };
    render(
      <MemoryRouter initialEntries={['/']}>
        <BeerContext.Provider value={mockData}>
          <ResultSection />
        </BeerContext.Provider>
      </MemoryRouter>
    );
    const beerCard = screen.getAllByTestId('beer-card')[0];
    expect(beerCard).toBeInTheDocument();
    vi.spyOn(mockData, 'handleDetailsOpen');
    fireEvent.click(beerCard);
    expect(mockData.handleDetailsOpen).toHaveBeenCalled();
  });
});
