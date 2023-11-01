import { useEffect, useState } from 'react';
import Spinner from '../../../load-spinner/spinner';

import '../../../../index.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  description: string;
  abv: number;
  image_url: string;
}

export interface ResultsSectionState {
  searchResults: Beer[];
  isLoading: boolean;
}

const ResultsSection: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Beer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentParams = Object.fromEntries(queryParams.entries());
  const searchTerm = queryParams.get('search');
  const perPageTerm = queryParams.get('per_page');
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
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setSearchResults(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchSearchResults();
  }, [pageTerm, perPageTerm, searchTerm]);

  const handleBeerClick = (beer: Beer) => {
    navigate(`/details/${beer.id}`, currentParams);
  };
  return isLoading ? (
    <Spinner />
  ) : (
    <ul className="beer-list">
      {searchResults.map((beer) => (
        <NavLink
          onClick={() => handleBeerClick(beer)}
          to={{
            pathname: `details/${beer.id}`,
            search: queryParams.toString(),
          }}
          key={beer.id}
        >
          <li className="beer-card">
            <img
              src={beer.image_url}
              alt={beer.name}
            />
            <div>
              <h3>{beer.name}</h3>
              <h4>{beer.tagline}</h4>
              <p>{beer.description}</p>
              <span>abv: {beer.abv}</span>
            </div>
          </li>
        </NavLink>
      ))}
    </ul>
  );
};
export default ResultsSection;
