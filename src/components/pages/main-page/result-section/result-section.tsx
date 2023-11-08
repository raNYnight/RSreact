import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../../../../index.css';
import { useBeerData } from '../../../contexts/beer-context';
import Spinner from '../../../load-spinner/spinner';

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  description: string;
  abv: number;
  image_url: string;
}

const ResultsSection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const beerData = useBeerData();
  const queryParams = new URLSearchParams(location.search);
  const currentParams = Object.fromEntries(queryParams.entries());

  const handleBeerClick = (beer: Beer) => {
    navigate(`/details/${beer.id}`, currentParams);
  };
  return beerData!.isResultsLoading ? (
    <Spinner />
  ) : (
    <ul className="beer-list">
      {beerData!.searchResults.map((beer) => (
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
