import React from 'react';
import ResultsSection, { Beer } from './result-section/result-section';
import SearchSection from './search-section/search-section';

import { Link, useLocation, useParams } from 'react-router-dom';
import '../../../index.css';
import BeerInfoSection from './beer-info-section/beer-info-section';
import PaginationSection from './pagination-section/pagination-section';
import { useEffect, useState } from 'react';
import Spinner from '../../load-spinner/spinner';

function Main(): JSX.Element {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const perPageQuery = `?per_page=${queryParams.get('per_page') || '25'}`;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<Beer[]>([]);
  const [isNextPageAvailable, setIsNextPageAvailable] = useState<boolean>(true);
  const searchTerm = queryParams.get('search');
  const perPageTerm = queryParams.get('per_page') || '25';
  const pageTerm = queryParams.get('page');

  useEffect(() => {
    const fetchSearchResults = async (): Promise<void> => {
      let url = 'https://api.punkapi.com/v2/beers';

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
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();

        if (data.length < perPageTerm) {
          setIsNextPageAvailable(false);
          console.log('No more results available', data.length);
        }

        setSearchResults(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchSearchResults();
  }, [pageTerm, perPageTerm, searchTerm]);
  return (
    <div className="container">
      <header className="header">
        <Link
          to={'/'}
          style={{ textDecoration: 'none' }}
        >
          <h1>Beer academy</h1>
        </Link>
      </header>
      <main className="main">
        <h2>Beer catalogue</h2>

        <p>
          The Beer Academy is a renowned institution for beer enthusiasts, offering educational
          programs, workshops, and tastings to explore the art and science of brewing beer. Cheers
          to beer education!
        </p>

        <SearchSection />
        <PaginationSection isNextPageAvailable={isNextPageAvailable} />
        <div
          className="beer-section"
          style={{ gridTemplateColumns: params.id ? '1fr 1fr' : '1fr' }}
        >
          {isLoading ? <Spinner /> : <ResultsSection searchResults={searchResults} />}
          {params.id && (isLoading ? <Spinner /> : <BeerInfoSection />)}
        </div>
      </main>
    </div>
  );
}

export default Main;
