// o	Verify that clicking the Search button saves the entered value to the local storage
// o	Make sure the component updates URL query parameter when page changes.

import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BeerContext, BeerContextValue } from '../../../contexts/beer-context';
import SearchSection from './search-section';

describe('SearchSection', () => {
  const mockData: BeerContextValue = {
    searchTerm: 'test',
    itemPerPage: '5',
    pageTerm: 1,
    searchResults: [
      {
        id: 2,
        name: 'Trashy Blonde',
        tagline: "You Know You Shouldn't",
        description:
          'A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.',
        abv: 4.1,
        image_url: 'https://images.punkapi.com/v2/2.png',
      },
      {
        id: 30,
        name: 'Dana - IPA Is Dead',
        tagline: 'Single Hop India Pale Ale.',
        description:
          'Hailing from Slovenia, Dana was originally cross bred from the German Hallertau Magnum and native Slovenian varieties. Like any good faux noble hop should, it infuses a rustic, musty spiciness into a toasty beast of a malt base.',
        abv: 6.7,
        image_url: 'https://images.punkapi.com/v2/30.png',
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
        id: 39,
        name: 'Kohatu - IPA Is Dead',
        tagline: 'Single Hop India Pale Ale.',
        description:
          'As you’d expect from a New Zealand hop variety, Kohatu contributes bags of tropical fruit, but with loads of lime notes, & pineapple hits. Seriously fruity, with sweet, juicy melon and stonefruit notes.',
        abv: 7.2,
        image_url: 'https://images.punkapi.com/v2/39.png',
      },
      {
        id: 40,
        name: 'Hello My Name is Vladimir',
        tagline: 'Limonnik Infused Imperial IPA (Not for Gays).',
        description:
          'A Limonnik-infused, triple dry- hopped double IPA. Dry berry tartness and intense citrus hop character meld with a dry bready malt base, boosted by a hint of alcohol warmth. This beer was brewed as a protest against the anti-LGBT legislation in Russia surrounding the Sochi Olympics.',
        abv: 8.2,
        image_url: 'https://images.punkapi.com/v2/40.png',
      },
    ],
    isNextPageAvailable: true,
    isResultsLoading: false,
    isDetailsLoading: false,
    detailedBeerID: undefined,
    detailedBeer: null,
    handleItemsPerPageChange: () => {},
    handleSearch: (value: string) => {
      localStorage.setItem('searchTerm', JSON.stringify(value));
    },
    handleNextPage: () => {},
    handlePreviousPage: () => {},
    handleDetailsOpen: () => {},
  };

  it('clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <BeerContext.Provider value={mockData}>
          <SearchSection />
        </BeerContext.Provider>
      </MemoryRouter>
    );
    const searchBTN = screen.getByTestId('search-button') as HTMLButtonElement;
    fireEvent.click(searchBTN);
    expect(JSON.parse(localStorage.getItem('searchTerm') || '')).toStrictEqual(mockData.searchTerm);
  });

  it('should trigger input change on search input', () => {
    const { getByTestId } = render(
      <BeerContext.Provider value={mockData}>
        <SearchSection />
      </BeerContext.Provider>
    );
    const inputElement = getByTestId('search-input') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'new value' } });

    expect(inputElement.value).toBe('new value');
  });

  it('should trigger input change on items per page input', () => {
    const { getByTestId } = render(
      <BeerContext.Provider value={mockData}>
        <SearchSection />
      </BeerContext.Provider>
    );
    const inputElement = getByTestId('items-per-page-input') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: '5' } });

    expect(inputElement.value).toBe('5');
  });
});
