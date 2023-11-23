import { BASE_API_URL, BASE_PAGE, BASE_ITEM_PER_PAGE } from '@/components/constants';
import { DetailedBeerData } from '@/components/detailed-beer-item';
import { Beer } from '@/components/result-section';

export const fetchBySearch = async (
  search: string,
  page: string,
  itemPerPage: string
): Promise<Beer[]> => {
  let url = `${BASE_API_URL}beers`;
  //   const queryParams = new URLSearchParams(location.search);
  //   const pageQueryParam = queryParams.get('page') || BASE_PAGE;
  //   const itemPerPageQueryParam = queryParams.get('per_page') || BASE_ITEM_PER_PAGE;
  //   const searchQueryParam = queryParams.get('search') || '';

  //   const params = new URLSearchParams();
  //   if (searchQueryParam || search) {
  //     params.set('beer_name', search || searchQueryParam?.trim());
  //   }

  //   params.set('per_page', itemPerPage || itemPerPageQueryParam.trim());
  //   params.set('page', page.toString() || pageQueryParam.toString().trim());

  const params = new URLSearchParams();

  if (search) {
    params.set('beer_name', search);
  }

  params.set('per_page', itemPerPage);
  params.set('page', page);
  url += `?${params.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.map((beer: Beer) => {
      return {
        id: beer.id,
        name: beer.name,
        tagline: beer.tagline,
        description: beer.description,
        abv: beer.abv,
        image_url: beer.image_url,
      };
    });
  } catch (error) {
    console.error('Error fetching search results:', error);

    return [];
  }
};

export const fetchDetailedBeer = async (id?: number) => {
  if (!id) {
    return null;
  }
  try {
    const response = await fetch(`${BASE_API_URL}beers/${id}`);
    const data = (await response.json()).map((beerObject: DetailedBeerData) => {
      return {
        id: beerObject.id,
        name: beerObject.name,
        tagline: beerObject.tagline,
        description: beerObject.description,
        abv: beerObject.abv,
        image_url: beerObject.image_url,
        ingredients: {
          malt: beerObject.ingredients.malt.map((malt) => ({ name: malt.name })),
          hops: beerObject.ingredients.hops.map((hop) => ({ name: hop.name })),
          yeast: beerObject.ingredients.yeast,
        },
        brewers_tips: beerObject.brewers_tips,
        contributed_by: beerObject.contributed_by,
      };
    });
    return data[0];
  } catch (error) {
    console.error('Error fetching detailed beer data:', error);
    return null;
  }
};