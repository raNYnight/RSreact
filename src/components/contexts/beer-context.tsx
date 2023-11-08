import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Beer } from '../pages/main-page/result-section/result-section';
import { DetailedBeerData } from '../pages/main-page/detailed-beer-item/detailed-beer-item';
import { BASE_API_URL, BASE_ITEM_PER_PAGE } from '../constants/constants';

export type BeerContextValue = {
  searchResults: Beer[] | [];
  isNextPageAvailable: boolean;
  isResultsLoading: boolean;
  isDetailsLoading: boolean;
  detailedBeer: DetailedBeerData | null;
};

const BeerContext = createContext<BeerContextValue | null>(null);

const BeerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [isResultsLoading, setIsResultsLoading] = useState<boolean>(true);
  const [isDetailsLoading, setIsDetailsLoading] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<Beer[]>([]);
  const [isNextPageAvailable, setIsNextPageAvailable] = useState<boolean>(true);
  const [detailedBeer, setDetailedBeer] = useState<DetailedBeerData | null>(null);
  const searchTerm = queryParams.get('search');
  const perPageTerm = queryParams.get('per_page') || BASE_ITEM_PER_PAGE;
  const pageTerm = queryParams.get('page');

  useEffect(() => {
    const fetchSearchResults = async (): Promise<void> => {
      setIsResultsLoading(true);

      let url = `${BASE_API_URL}beers`;

      const params = new URLSearchParams();
      if (searchTerm && searchTerm.trim() !== '') {
        params.set('beer_name', searchTerm.trim());
      }
      if (perPageTerm && perPageTerm.trim() !== '') {
        params.set('per_page', perPageTerm.trim());
      }
      if (pageTerm && pageTerm.trim() !== '') {
        params.set('page', pageTerm.trim());
      }

      if (params.toString() !== '') {
        url += `?${params.toString()}`;
      }

      try {
        setIsNextPageAvailable(true);
        const response = await fetch(url);
        const data = await response.json();

        if (data.length < perPageTerm) {
          setIsNextPageAvailable(false);
        }

        setSearchResults(data);
        setIsResultsLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchSearchResults();
  }, [pageTerm, perPageTerm, searchTerm]);

  useEffect(() => {
    const fetchDetailedBeerData = async (): Promise<void> => {
      setIsDetailsLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}beers/${params.id || ''}`);
        const data = await response.json();
        setDetailedBeer(data[0]);
        setIsDetailsLoading(false);
      } catch (error) {
        console.error('Error fetching detailed beer data:', error);
      }
    };
    if (params.id) {
      fetchDetailedBeerData();
    }
    if (!params.id) {
      setDetailedBeer(null);
    }
  }, [params.id]);

  const value = useMemo(() => {
    return {
      searchResults,
      isNextPageAvailable,
      isResultsLoading,
      isDetailsLoading,
      detailedBeer,
    };
  }, [searchResults, isNextPageAvailable, isResultsLoading, isDetailsLoading, detailedBeer]);

  return <BeerContext.Provider value={value}>{children}</BeerContext.Provider>;
};

const useBeerData = () => {
  return useContext(BeerContext);
};

export { BeerProvider, useBeerData };
