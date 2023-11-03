import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../../../../index.css';

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
export interface ResultsSectionProps {
  searchResults: Beer[];
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ searchResults }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentParams = Object.fromEntries(queryParams.entries());

  const handleBeerClick = (beer: Beer) => {
    navigate(`/details/${beer.id}`, currentParams);
  };
  return (
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
