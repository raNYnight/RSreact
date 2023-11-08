import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BASE_API_URL, BASE_ITEM_PER_PAGE, BASE_PAGE } from '../constants/constants';
import { DetailedBeerData } from '../pages/main-page/detailed-beer-item/detailed-beer-item';
import { Beer } from '../pages/main-page/result-section/result-section';

export type BeerContextValue = {
  searchTerm: string;
  handleSearch: (searchTerm: string) => void;
  itemPerPage: string;
  handleItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState<string>(queryParams.get('search') || '');
  const [isResultsLoading, setIsResultsLoading] = useState<boolean>(true);
  const [isDetailsLoading, setIsDetailsLoading] = useState<boolean>(true);
  const [itemPerPage, setItemPerPage] = useState<string>(
    queryParams.get('per_page') || BASE_ITEM_PER_PAGE
  );
  const [searchResults, setSearchResults] = useState<Beer[]>([]);
  const [isNextPageAvailable, setIsNextPageAvailable] = useState<boolean>(true);
  const [detailedBeer, setDetailedBeer] = useState<DetailedBeerData | null>(null);
  // const perPageTerm = queryParams.get('per_page') || BASE_ITEM_PER_PAGE;
  const pageTerm = queryParams.get('page');
  const currentParams = Object.fromEntries(queryParams.entries());

  useEffect(() => {
    const fetchSearchResults = async (): Promise<void> => {
      setIsResultsLoading(true);

      let url = `${BASE_API_URL}beers`;

      const params = new URLSearchParams();
      if (searchTerm && searchTerm.trim() !== '') {
        params.set('beer_name', searchTerm.trim());
      }
      if (itemPerPage && itemPerPage.trim() !== '') {
        params.set('per_page', itemPerPage.trim());
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

        if (data.length < itemPerPage) {
          setIsNextPageAvailable(false);
        }

        setSearchResults(data);
        setIsResultsLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchSearchResults();
  }, [pageTerm, itemPerPage, searchTerm]);

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

  function handleSearch(inputValue: string) {
    setSearchTerm(inputValue);
    localStorage.setItem('searchTerm', inputValue);
    const paramsToSet = {
      ...currentParams,
      search: inputValue,
      page: BASE_PAGE.toString(),
    };
    const queryParams = new URLSearchParams(paramsToSet).toString();
    navigate(`/?${queryParams}`);
  }

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const paramsToSet = { ...currentParams, per_page: e.target.value, page: BASE_PAGE.toString() };
    const queryParams = new URLSearchParams(paramsToSet).toString();
    setItemPerPage(e.target.value);
    navigate(`/?${queryParams}`);
  };

  return (
    <BeerContext.Provider
      value={{
        searchTerm,
        handleSearch,
        itemPerPage,
        handleItemsPerPageChange,
        searchResults,
        isNextPageAvailable,
        isResultsLoading,
        isDetailsLoading,
        detailedBeer,
      }}
    >
      {children}
    </BeerContext.Provider>
  );
};

const useBeerData = () => {
  return useContext(BeerContext);
};

export { BeerProvider, useBeerData };
