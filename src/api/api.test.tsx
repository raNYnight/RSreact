import { vi } from 'vitest';
import { fetchBeerByParams, fetchBySearch } from './api';
import { BASE_API_URL } from '../components/constants/constants';

describe('fetchBySearch', () => {
  it('should fetch beers by search query', async () => {
    const search = 'IPA';
    const page = 1;
    const itemPerPage = '10';
    const mockResponse = [
      {
        id: 1,
        name: 'Beer 1',
        tagline: 'Tagline 1',
        description: 'Description 1',
        abv: 5.0,
        image_url: 'https://example.com/beer1.jpg',
      },
      {
        id: 2,
        name: 'Beer 2',
        tagline: 'Tagline 2',
        description: 'Description 2',
        abv: 6.0,
        image_url: 'https://example.com/beer2.jpg',
      },
    ];

    vi.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockResponse),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    const result = await fetchBySearch(search, page, itemPerPage);
    expect(window.fetch).toHaveBeenCalledWith(
      `${BASE_API_URL}beers?beer_name=${search}&per_page=${itemPerPage}&page=${page}`
    );
    expect(result).toEqual([
      {
        id: 1,
        name: 'Beer 1',
        tagline: 'Tagline 1',
        description: 'Description 1',
        abv: 5.0,
        image_url: 'https://example.com/beer1.jpg',
      },
      {
        id: 2,
        name: 'Beer 2',
        tagline: 'Tagline 2',
        description: 'Description 2',
        abv: 6.0,
        image_url: 'https://example.com/beer2.jpg',
      },
    ]);
  });

  it('should handle errors', async () => {
    const search = 'IPA';
    const page = 1;
    const itemPerPage = '10';
    vi.spyOn(window, 'fetch').mockRejectedValueOnce(new Error('Network error'));
    const result = await fetchBySearch(search, page, itemPerPage);
    expect(window.fetch).toHaveBeenCalledWith(
      `${BASE_API_URL}beers?beer_name=${search}&per_page=${itemPerPage}&page=${page}`
    );
    expect(result).toEqual([]);
  });
});

describe('fetchBeerByParams', () => {
  it('should fetch beer by ID', async () => {
    const beerId = 123;
    const mockResponse = {
      id: 123,
      name: 'Beer 123',
      tagline: 'Tagline 123',
      description: 'Description 123',
      abv: 5.6,
      image_url: 'https://example.com/beer123.jpg',
      ingredients: {
        malt: [{ name: 'Malt 1' }, { name: 'Malt 2' }],
        hops: [{ name: 'Hop 1' }, { name: 'Hop 2' }],
        yeast: 'Yeast 123',
      },
      brewers_tips: 'Brewers tips 123',
      contributed_by: 'Contributor 123',
    };

    vi.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce([mockResponse]),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const result = await fetchBeerByParams(beerId);

    expect(window.fetch).toHaveBeenCalledWith(`${BASE_API_URL}beers/${beerId}`);

    expect(result).toEqual(mockResponse);
  });

  it('should handle errors', async () => {
    const beerId = 123;
    vi.spyOn(window, 'fetch').mockRejectedValueOnce(new Error('Network error'));
    const result = await fetchBeerByParams(beerId);
    expect(window.fetch).toHaveBeenCalledWith(`${BASE_API_URL}beers/${beerId}`);
    expect(result).toBeNull();
  });
});
