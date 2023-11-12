import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../../app/App';
import { BeerContext, BeerContextValue } from '../../../contexts/beer-context';
import BeerSection from './beer-section';

describe('BeerSection', () => {
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

  it('Renders beer cards', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <BeerContext.Provider value={mockData}>
          <BeerSection />
        </BeerContext.Provider>
      </MemoryRouter>
    );
    const beerCards = screen.queryAllByTestId('beer-card');
    expect(beerCards.length).toBe(3);
    expect(beerCards[0]).toHaveTextContent('Berliner Weisse With Yuzu - B-Sides');
    expect(beerCards[1]).toHaveTextContent(
      'Berliner Weisse With Raspberries And Rhubarb - B-Sides'
    );
    expect(beerCards[2]).toHaveTextContent('Blitz Berliner Weisse');
  });

  it('Applies a correct style if detailedBeer is present', async () => {
    mockData = {
      ...mockData,
      detailedBeerID: 1,
      detailedBeer: {
        id: 1,
        name: 'Buzz',
        tagline: 'A Real Bitter Experience.',
        description:
          'A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.',
        abv: 4.5,
        image_url: 'https://images.punkapi.com/v2/keg.png',
        ingredients: {
          malt: [
            {
              name: 'Maris Otter Extra Pale',
            },
            {
              name: 'Caramalt',
            },
            {
              name: 'Munich',
            },
          ],
          hops: [
            {
              name: 'Fuggles',
            },
            {
              name: 'First Gold',
            },
            {
              name: 'Fuggles',
            },
            {
              name: 'First Gold',
            },
            {
              name: 'Cascade',
            },
          ],
          yeast: 'Wyeast 1056 - American Ale™',
        },
        brewers_tips:
          'The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.',
        contributed_by: 'Sam Mason <samjbmason>',
      },
    };
    render(
      <MemoryRouter initialEntries={['/']}>
        <BeerContext.Provider value={mockData}>
          <BeerSection />
        </BeerContext.Provider>
      </MemoryRouter>
    );
    const beerSection = document.querySelector('.beer-section');
    expect(beerSection).toHaveStyle({
      gridTemplateColumns: '1fr 1fr',
    });
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
