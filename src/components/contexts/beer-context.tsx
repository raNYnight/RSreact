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
  pageTerm: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
};

const BeerContext = createContext<BeerContextValue | null>(null);

const BeerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const pageQueryParam = queryParams.get('page');
  const itemPerPageQueryParam = queryParams.get('per_page');
  const searchQueryParam = queryParams.get('search');

  const [searchTerm, setSearchTerm] = useState<string>(searchQueryParam || '');
  const [isResultsLoading, setIsResultsLoading] = useState<boolean>(true);
  const [isDetailsLoading, setIsDetailsLoading] = useState<boolean>(true);
  const [itemPerPage, setItemPerPage] = useState<string>(
    itemPerPageQueryParam || BASE_ITEM_PER_PAGE
  );
  const [searchResults, setSearchResults] = useState<Beer[]>([]);
  const [pageTerm, setPageTerm] = useState<number>(Number(pageQueryParam) || BASE_PAGE);
  const [isNextPageAvailable, setIsNextPageAvailable] = useState<boolean>(true);
  const [detailedBeer, setDetailedBeer] = useState<DetailedBeerData | null>(null);
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
      if (pageTerm && pageTerm.toString().trim() !== '') {
        params.set('page', pageTerm.toString().trim());
      }
      if (params.toString() !== '') {
        url += `?${params.toString()}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length < itemPerPage) {
          setIsNextPageAvailable(false);
        } else {
          setIsNextPageAvailable(true);
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

  useEffect(() => {
    setPageTerm(pageQueryParam ? Number(pageQueryParam) : BASE_PAGE);
    setItemPerPage(itemPerPageQueryParam ? itemPerPageQueryParam : BASE_ITEM_PER_PAGE);
    setSearchTerm(searchQueryParam ? searchQueryParam : '');
  }, [pageQueryParam, itemPerPageQueryParam, searchQueryParam]);

  function handleSearch(inputValue: string) {
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
    navigate(`/?${queryParams}`);
  };

  const handlePreviousPage = () => {
    const newPage = pageTerm - 1;
    const paramsToSet = {
      ...currentParams,
      page: newPage.toString(),
    };
    const queryParams = new URLSearchParams(paramsToSet).toString();
    navigate(`/?${queryParams}`);
  };

  const handleNextPage = () => {
    const newPage = pageTerm + 1;
    const paramsToSet = {
      ...currentParams,
      page: newPage.toString(),
    };
    const queryParams = new URLSearchParams(paramsToSet).toString();
    navigate(`/?${queryParams}`);
  };
  return (
    <BeerContext.Provider
      value={{
        searchTerm,
        handleSearch,
        itemPerPage,
        handleItemsPerPageChange,
        pageTerm,
        handleNextPage,
        handlePreviousPage,
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
