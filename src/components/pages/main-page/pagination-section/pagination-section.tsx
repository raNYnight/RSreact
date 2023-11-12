import React from 'react';
import { BeerContextValue, useBeerData } from '../../../contexts/beer-context';
import './pagination.css';

const PaginationSection: React.FC = () => {
  const beerData = useBeerData() as BeerContextValue;

  return (
    <div className="pagination-section">
      <button
        onClick={beerData.handlePreviousPage}
        disabled={beerData.pageTerm === 1}
      >
        Prev page
      </button>
      <span>
        <h4>{beerData.pageTerm}</h4>
      </span>
      <button
        onClick={beerData.handleNextPage}
        disabled={!beerData.isNextPageAvailable}
      >
        Next Page
      </button>
    </div>
  );
};

export default PaginationSection;
