import { useEffect, useState } from 'react';
import Spinner from '../../load-spinner/spinner';

import '../../../index.css';

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  description: string;
  abv: number;
  image_url: string;
}

export interface ResultsSectionProps {
  searchTerm: string;
}

export interface ResultsSectionState {
  searchResults: Beer[];
  isLoading: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ searchTerm }) => {
  const [searchResults, setSearchResults] = useState<Beer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSearchResults = async (): Promise<void> => {
      let url = 'https://api.punkapi.com/v2/beers';
      if (searchTerm && searchTerm.trim() !== '') {
        url += `?beer_name=${encodeURIComponent(searchTerm.trim())}`;
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
  }, [searchTerm]);

  return isLoading ? (
    <Spinner />
  ) : (
    <ul className="beer-list">
      {searchResults.map((beer) => (
        <li
          className="beer-card"
          key={beer.id}
        >
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
      ))}
    </ul>
  );
};
export default ResultsSection;
