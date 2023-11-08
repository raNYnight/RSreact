import React from 'react';
import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import './pagination.css';
import { BeerContextValue, useBeerData } from '../../../contexts/beer-context';
import { BASE_PAGE } from '../../../constants/constants';

const PaginationSection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentParams = Object.fromEntries(queryParams.entries());
  const [page, setPage] = useState(1);
  const beerData = useBeerData() as BeerContextValue;

  useEffect(() => {
    if (currentParams.page === undefined) {
      setPage(BASE_PAGE);
    } else {
      setPage(Number(currentParams.page));
    }
  }, [currentParams.page]);

  function handleNext() {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      const paramsToSet = {
        ...currentParams,
        page: newPage.toString(),
      };
      const queryParams = new URLSearchParams(paramsToSet).toString();
      navigate(`/?${queryParams}`);
      return newPage;
    });
  }
  function handlePrev() {
    setPage((prevPage) => {
      const newPage = prevPage - 1;
      const paramsToSet = {
        ...currentParams,
        page: newPage.toString(),
      };
      const queryParams = new URLSearchParams(paramsToSet).toString();
      navigate(`/?${queryParams}`);
      return newPage;
    });
  }
  return (
    <div className="pagination-section">
      <button
        onClick={handlePrev}
        disabled={page === 1}
      >
        Prev page
      </button>
      <span>
        <h4>{page}</h4>
      </span>
      <button
        onClick={handleNext}
        disabled={!beerData.isNextPageAvailable}
      >
        Next Page
      </button>
    </div>
  );
};

export default PaginationSection;
