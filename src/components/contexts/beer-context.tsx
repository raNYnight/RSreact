import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchBeerByParams, fetchBySearch } from '../../api/api';
import { BASE_ITEM_PER_PAGE, BASE_PAGE } from '../constants/constants';
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
  detailedBeerID: number | undefined;
  handleDetailsOpen: (id?: number) => void;
};

export const BeerContext = createContext<BeerContextValue | null>(null);

const BeerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const pageQueryParam = queryParams.get('page');
  const itemPerPageQueryParam = queryParams.get('per_page');
  const searchQueryParam = queryParams.get('search');

  const [searchTerm, setSearchTerm] = useState<string>(searchQueryParam || '');
  const [isResultsLoading, setIsResultsLoading] = useState(true);
  const [isDetailsLoading, setIsDetailsLoading] = useState(true);
  const [itemPerPage, setItemPerPage] = useState<string>(
    itemPerPageQueryParam || BASE_ITEM_PER_PAGE
  );
  const [searchResults, setSearchResults] = useState<Beer[]>([]);
  const [pageTerm, setPageTerm] = useState<number>(Number(pageQueryParam) || BASE_PAGE);
  const [isNextPageAvailable, setIsNextPageAvailable] = useState(true);
  const [detailedBeer, setDetailedBeer] = useState<DetailedBeerData | null>(null);
  const [detailedBeerID, setDetailedBeerID] = useState<number | undefined>(Number(params.id));
  const currentParams = Object.fromEntries(queryParams.entries());

  useEffect(() => {
    setDetailedBeerID(undefined);
    const fetchSearchResults = async () => {
      setIsResultsLoading(true);
      const data = await fetchBySearch(searchTerm, pageTerm, itemPerPage);
      setSearchResults(data);
      setIsResultsLoading(false);
      if (data.length < +itemPerPage) {
        setIsNextPageAvailable(false);
      } else {
        setIsNextPageAvailable(true);
      }
    };
    fetchSearchResults();
  }, [pageTerm, itemPerPage, searchTerm]);

  useEffect(() => {
    const fetchDetailedBeerData = async (): Promise<void> => {
      if (detailedBeerID) {
        setIsDetailsLoading(true);
        const data = await fetchBeerByParams(detailedBeerID);
        setDetailedBeer(data);
        setIsDetailsLoading(false);
      } else {
        setDetailedBeer(null);
      }
    };
    fetchDetailedBeerData();
  }, [detailedBeerID]);

  useEffect(() => {
    setPageTerm(pageQueryParam ? Number(pageQueryParam) : BASE_PAGE);
    setItemPerPage(itemPerPageQueryParam ? itemPerPageQueryParam : BASE_ITEM_PER_PAGE);
    if (searchQueryParam) {
      setSearchTerm(searchQueryParam);
      localStorage.setItem('searchTerm', searchQueryParam);
    } else {
      setSearchTerm('');
      localStorage.removeItem('searchTerm');
    }
  }, [pageQueryParam, itemPerPageQueryParam, searchQueryParam]);

  function handleSearch(inputValue: string) {
    const paramsToSet = {
      ...currentParams,
      search: inputValue,
      page: BASE_PAGE.toString(),
    };
    const queryParams = new URLSearchParams(paramsToSet).toString();
    navigate(`/?${queryParams}`);
  }

  function handleDetailsOpen(id?: number) {
    setDetailedBeerID(id);
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
    setPageTerm((prev) => prev + 1);
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
        handleDetailsOpen,
        detailedBeerID,
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
