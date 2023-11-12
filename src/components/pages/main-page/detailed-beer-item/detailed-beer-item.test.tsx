// Tests for the Card List component:
// Verify that the component renders the specified number of cards;
// Check that an appropriate message is displayed if no cards are present.
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { it } from 'vitest';
import { BeerContext, BeerContextValue } from '../../../contexts/beer-context';
import DetailedBeerItem from './detailed-beer-item';

describe('Detailed beer item', async () => {
  const mockData: BeerContextValue = {
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

  it('Detailed beer to be null ', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <BeerContext.Provider value={mockData}>
          <DetailedBeerItem />
        </BeerContext.Provider>
      </MemoryRouter>
    );
    const detailedBeer = screen.queryByTestId('detailed-beer');
    expect(detailedBeer).not.toBeInTheDocument();
  });

  it('Loading spinner to be displayed while fetching', async () => {
    const mockDataLoading: BeerContextValue = {
      ...mockData,
      detailedBeerID: 193,
      detailedBeer: {
        id: 193,
        name: 'Blitz Berliner Weisse',
        tagline: 'Berliner Fruit Beer.',
        description:
          'Our sour recipe for all fruit Blitz beers uses a process called kettle souring. In this we steep a bag of malt in the wort to allow the bacteria to grow in it.',
        abv: 3,
        image_url: 'https://images.punkapi.com/v2/keg.png',
        ingredients: {
          malt: [
            {
              name: 'Malt',
            },
          ],
          hops: [
            {
              name: 'Hops',
            },
          ],
          yeast: 'Yeast',
        },
        brewers_tips: 'Brewers tips',
        contributed_by: 'Contributed by',
      },
      isDetailsLoading: true,
    };
    render(
      <MemoryRouter initialEntries={['/']}>
        <BeerContext.Provider value={mockDataLoading}>
          <DetailedBeerItem />
        </BeerContext.Provider>
      </MemoryRouter>
    );
    const detailedBeer = screen.getByTestId('detailed-beer');
    expect(detailedBeer).toBeInTheDocument();
    expect(detailedBeer).toContainElement(screen.getByTestId('spinner'));
  });

  it('detailed card component correctly displays the detailed card data', async () => {
    const mockDataDetailedBeer: BeerContextValue = {
      ...mockData,
      detailedBeerID: 3,
      detailedBeer: {
        id: 3,
        name: 'Berliner Weisse With Yuzu - B-Sides',
        tagline: 'Japanese Citrus Berliner Weisse.',
        description: 'Japanese citrus fruit intensifies the sour nature of this German classic.',
        abv: 4.2,
        image_url: 'https://images.punkapi.com/v2/keg.png',
        ingredients: {
          malt: [
            {
              name: 'Propino Pale Malt',
            },
            {
              name: 'Wheat Malt',
            },
            {
              name: 'Propino Pale Malt for kettle souring',
            },
            {
              name: 'Acidulated Malt for kettle souring',
            },
          ],
          hops: [
            {
              name: 'Bramling Cross',
            },
          ],
          yeast: 'Wyeast 1056 - American Ale™',
        },
        brewers_tips:
          'Clean everything twice. All you want is the clean sourness of lactobacillus.',
        contributed_by: 'Sam Mason <samjbmason>',
      },
      isDetailsLoading: false,
      handleDetailsOpen: () => {},
    };
    render(
      <MemoryRouter initialEntries={['/']}>
        <BeerContext.Provider value={mockDataDetailedBeer}>
          <DetailedBeerItem />
        </BeerContext.Provider>
      </MemoryRouter>
    );
    const detailedBeer = screen.getByTestId('detailed-beer');
    const name = detailedBeer.querySelector('h1')?.textContent;
    const img = detailedBeer.querySelector('img')?.getAttribute('src');
    const tagline = detailedBeer.querySelector('h3')?.textContent;
    const description = detailedBeer.querySelector('p')?.textContent;

    expect(name).toBe(mockDataDetailedBeer.detailedBeer?.name);
    expect(img).toBe(mockDataDetailedBeer.detailedBeer?.image_url);
    expect(tagline).toBe(mockDataDetailedBeer.detailedBeer?.tagline);
    expect(description).toBe(mockDataDetailedBeer.detailedBeer?.description);
  });

  it('clicking the close button hides the component', async () => {
    const detailedMockData: BeerContextValue = {
      searchTerm: '',
      itemPerPage: '25',
      pageTerm: 1,
      searchResults: [
        {
          id: 1,
          name: 'Buzz',
          tagline: 'A Real Bitter Experience.',
          description:
            'A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.',
          abv: 4.5,
          image_url: 'https://images.punkapi.com/v2/keg.png',
        },
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
          id: 3,
          name: 'Berliner Weisse With Yuzu - B-Sides',
          tagline: 'Japanese Citrus Berliner Weisse.',
          description: 'Japanese citrus fruit intensifies the sour nature of this German classic.',
          abv: 4.2,
          image_url: 'https://images.punkapi.com/v2/keg.png',
        },
        {
          id: 4,
          name: 'Pilsen Lager',
          tagline: 'Unleash the Yeast Series.',
          description:
            'Our Unleash the Yeast series was an epic experiment into the differences in aroma and flavour provided by switching up your yeast. We brewed up a wort with a light caramel note and some toasty biscuit flavour, and hopped it with Amarillo and Centennial for a citrusy bitterness. Everything else is down to the yeast. Pilsner yeast ferments with no fruity esters or spicy phenols, although it can add a hint of butterscotch.',
          abv: 6.3,
          image_url: 'https://images.punkapi.com/v2/4.png',
        },
        {
          id: 5,
          name: 'Avery Brown Dredge',
          tagline: "Bloggers' Imperial Pilsner.",
          description:
            'An Imperial Pilsner in collaboration with beer writers. Tradition. Homage. Revolution. We wanted to showcase the awesome backbone of the Czech brewing tradition, the noble Saaz hop, and also tip our hats to the modern beers that rock our world, and the people who make them.',
          abv: 7.2,
          image_url: 'https://images.punkapi.com/v2/5.png',
        },
        {
          id: 6,
          name: 'Electric India',
          tagline: 'Vibrant Hoppy Saison.',
          description:
            'Re-brewed as a spring seasonal, this beer – which appeared originally as an Equity Punk shareholder creation – retains its trademark spicy, fruity edge. A perfect blend of Belgian Saison and US IPA, crushed peppercorns and heather honey are also added to produce a genuinely unique beer.',
          abv: 5.2,
          image_url: 'https://images.punkapi.com/v2/6.png',
        },
        {
          id: 7,
          name: 'AB:12',
          tagline: 'Imperial Black Belgian Ale.',
          description:
            'An Imperial Black Belgian Ale aged in old Invergordon Scotch whisky barrels with mountains of raspberries, tayberries and blackberries in each cask. Decadent but light and dry, this beer would make a fantastic base for ageing on pretty much any dark fruit - we used raspberries, tayberries and blackberries beause they were local.',
          abv: 11.2,
          image_url: 'https://images.punkapi.com/v2/7.png',
        },
        {
          id: 8,
          name: 'Fake Lager',
          tagline: 'Bohemian Pilsner.',
          description:
            'Fake is the new black. Fake is where it is at. Fake Art, fake brands, fake breasts, and fake lager. We want to play our part in the ugly fallout from the Lager Dream. Say hello to Fake Lager – a zesty, floral 21st century faux masterpiece with added BrewDog bitterness.',
          abv: 4.7,
          image_url: 'https://images.punkapi.com/v2/8.png',
        },
        {
          id: 9,
          name: 'AB:07',
          tagline: 'Whisky Cask-Aged Scotch Ale.',
          description:
            'Whisky cask-aged imperial scotch ale. Beer perfect for when the rain is coming sideways. Liquorice, plum and raisin temper the warming alcohol, producing a beer capable of holding back the Scottish chill.',
          abv: 12.5,
          image_url: 'https://images.punkapi.com/v2/9.png',
        },
        {
          id: 10,
          name: 'Bramling X',
          tagline: 'Single Hop IPA Series - 2011.',
          description:
            'Good old Bramling Cross is elegant, refined, assured, (boring) and understated. Understated that is unless you hop the living daylights out of a beer with it. This is Bramling Cross re-invented and re-imagined, and shows just what can be done with English hops if you use enough of them. Poor Bramling Cross normally gets lost in a woeful stream of conformist brown ales made by sleepy cask ale brewers. But not anymore. This beer shows that British hops do have some soul, and is a fruity riot of blackberries, pears, and plums. Reminds me of the bramble, apple and ginger jam my grandmother used to make.',
          abv: 7.5,
          image_url: 'https://images.punkapi.com/v2/10.png',
        },
        {
          id: 11,
          name: 'Misspent Youth',
          tagline: 'Milk & Honey Scotch Ale.',
          description:
            'The brainchild of our small batch brewer, George Woods. A dangerously drinkable milk sugar- infused Scotch Ale.',
          abv: 7.3,
          image_url: 'https://images.punkapi.com/v2/keg.png',
        },
        {
          id: 12,
          name: 'Arcade Nation',
          tagline: 'Seasonal Black IPA.',
          description:
            'Running the knife-edge between an India Pale Ale and a Stout, this particular style is one we truly love. Black IPAs are a great showcase for the skill of our brew team, balancing so many complex and twisting flavours in the same moment. The citrus, mango and pine from the hops – three of our all-time favourites – play off against the roasty dryness from the malt bill at each and every turn.',
          abv: 5.3,
          image_url: 'https://images.punkapi.com/v2/12.png',
        },
        {
          id: 13,
          name: 'Movember',
          tagline: 'Moustache-Worthy Beer.',
          description:
            'A deliciously robust, black malted beer with a decadent dark, dry cocoa flavour that provides an enticing backdrop to the Cascade hops.',
          abv: 4.5,
          image_url: 'https://images.punkapi.com/v2/13.png',
        },
        {
          id: 14,
          name: 'Alpha Dog',
          tagline: 'Existential Red Ale.',
          description:
            'A fusion of caramel malt flavours and punchy New Zealand hops. A session beer you can get your teeth into.',
          abv: 4.5,
          image_url: 'https://images.punkapi.com/v2/14.png',
        },
        {
          id: 15,
          name: 'Mixtape 8',
          tagline: 'An Epic Fusion Of Old Belgian, American New Wave, And Scotch Whisky.',
          description:
            'This recipe is for the Belgian Tripel base. A blend of two huge oak aged beers – half a hopped up Belgian Tripel, and half a Triple India Pale Ale. Both aged in single grain whisky barrels for two years and blended, each beer brings its own character to the mix. The Belgian Tripel comes loaded with complex spicy, fruity esters, and punchy citrus hop character.',
          abv: 14.5,
          image_url: 'https://images.punkapi.com/v2/15.png',
        },
        {
          id: 16,
          name: 'Libertine Porter',
          tagline: 'Dry-Hopped Aggressive Porter.',
          description:
            'An avalanche of cross-continental hop varieties give this porter a complex spicy, resinous and citrusy aroma, with a huge malt bill providing a complex roasty counterpoint. Digging deeper into the flavour draws out cinder toffee, bitter chocolate and hints of woodsmoke.',
          abv: 6.1,
          image_url: 'https://images.punkapi.com/v2/16.png',
        },
        {
          id: 17,
          name: 'AB:06',
          tagline: 'Imperial Black IPA.',
          description:
            'Our sixth Abstrakt, this imperial black IPA combined dark malts with a monumental triple dry-hop, using an all-star team of some of our favourite American hops. Roasty and resinous.',
          abv: 11.2,
          image_url: 'https://images.punkapi.com/v2/17.png',
        },
        {
          id: 18,
          name: 'Russian Doll – India Pale Ale',
          tagline: 'Nesting Hop Bomb.',
          description:
            'The levels of hops vary throughout the range. We love hops, so all four beers are big, bitter badasses, but by tweaking the amount of each hop used later in the boil and during dry- hopping, we can balance the malty backbone with some unexpected flavours. Simcoe is used in the whirlpool for all four beers, and yet still lends different characters to each',
          abv: 6,
          image_url: 'https://images.punkapi.com/v2/18.png',
        },
        {
          id: 19,
          name: 'Hello My Name Is Mette-Marit',
          tagline: 'Lingonberry Double IPA.',
          description:
            "We sent this beer to Norway where it was known as 'Hello, my name is Censored’. You can make up your own mind as to why. This brew was a red berry explosion, with a reisnous bitter edge layered with dry berry tartness.",
          abv: 8.2,
          image_url: 'https://images.punkapi.com/v2/19.png',
        },
        {
          id: 20,
          name: 'Rabiator',
          tagline: 'Imperial Wheat Beer',
          description:
            'Imperial Wheat beer / Weizenbock brewed by a homesick German in leather trousers. Think banana bread, bubble gum and David Hasselhoff.',
          abv: 10.27,
          image_url: 'https://images.punkapi.com/v2/keg.png',
        },
        {
          id: 21,
          name: 'Vice Bier',
          tagline: 'Hoppy Wheat Bier.',
          description:
            'Our take on the classic German Kristallweizen. A clear German wheat beer, layers of bubblegum and vanilla perfectly balanced with the American and New Zealand hops.',
          abv: 4.3,
          image_url: 'https://images.punkapi.com/v2/keg.png',
        },
        {
          id: 22,
          name: 'Devine Rebel (w/ Mikkeller)',
          tagline: 'Oak-aged Barley Wine.',
          description:
            "Two of Europe's most experimental, boundary-pushing brewers, BrewDog and Mikkeller, combined forces to produce a rebellious beer that combined their respective talents and brewing skills. The 12.5% Barley Wine fermented well, and the champagne yeast drew it ever closer to 12.5%. The beer was brewed with a single hop variety and was going to be partially aged in oak casks.",
          abv: 12.5,
          image_url: 'https://images.punkapi.com/v2/22.png',
        },
        {
          id: 23,
          name: 'Storm',
          tagline: 'Islay Whisky Aged IPA.',
          description:
            'Dark and powerful Islay magic infuses this tropical sensation of an IPA. Using the original Punk IPA as a base, we boosted the ABV to 8% giving it some extra backbone to stand up to the peated smoke imported directly from Islay.',
          abv: 8,
          image_url: 'https://images.punkapi.com/v2/23.png',
        },
        {
          id: 24,
          name: 'The End Of History',
          tagline: "The World's Strongest Beer.",
          description:
            'The End of History: The name derives from the famous work of philosopher Francis Fukuyama, this is to beer what democracy is to history. Complexity defined. Floral, grapefruit, caramel and cloves are intensified by boozy heat.',
          abv: 55,
          image_url: 'https://images.punkapi.com/v2/24.png',
        },
        {
          id: 25,
          name: 'Bad Pixie',
          tagline: 'Spiced Wheat Beer.',
          description:
            '2008 Prototype beer, a 4.7% wheat ale with crushed juniper berries and citrus peel.',
          abv: 4.7,
          image_url: 'https://images.punkapi.com/v2/25.png',
        },
      ],
      isNextPageAvailable: true,
      isResultsLoading: false,
      isDetailsLoading: false,
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
      detailedBeerID: 1,
      handleDetailsOpen: () => {
        detailedMockData.detailedBeerID = undefined;
        detailedMockData.detailedBeer = null;
        render(
          <BrowserRouter>
            <BeerContext.Provider value={detailedMockData}>
              <DetailedBeerItem />
            </BeerContext.Provider>
          </BrowserRouter>
        );
      },
      handleNextPage: () => {},
      handlePreviousPage: () => {},
      handleItemsPerPageChange: () => {},
      handleSearch: () => {},
    };
    render(
      <BrowserRouter>
        <BeerContext.Provider value={detailedMockData}>
          <DetailedBeerItem />
        </BeerContext.Provider>
      </BrowserRouter>
    );
    const closeButton = screen.getByTestId('close-detailed-beer');
    fireEvent.click(closeButton);
    const detailedBeer = screen.queryByTestId('detailed-beer');
    expect(detailedBeer).not.toBeInTheDocument();
  });
});
