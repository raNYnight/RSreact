import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../components/constants/constants';
import { Beer } from '../components/pages/main-page/result-section/result-section';
import { DetailedBeerData } from '../components/pages/main-page/detailed-beer-item/detailed-beer-item';

export const beerApi = createApi({
  reducerPath: 'beerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  endpoints: (builder) => ({
    fetchBeerById: builder.query<DetailedBeerData, number>({
      query: (id) => `beers/${id}`,
    }),
    fetchBySearch: builder.query<Beer[], { search: string; page: number; itemPerPage: string }>({
      query: ({ search, page, itemPerPage }) => {
        let url = `beers`;
        const params = new URLSearchParams();
        if (search) {
          params.set('beer_name', search.trim().replace(/ /g, '_'));
        }
        params.set('per_page', itemPerPage);
        params.set('page', page.toString());

        url += `?${params.toString()}`;

        return { url };
      },
    }),
  }),
});

export const { useFetchBySearchQuery, useFetchBeerByIdQuery } = beerApi;
