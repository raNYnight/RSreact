import React from 'react';
import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import './pagination.css';

export interface PaginationSectionProps {
  isNextPageAvailable: boolean;
}
const PaginationSection: React.FC<PaginationSectionProps> = ({ isNextPageAvailable }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentParams = Object.fromEntries(queryParams.entries());
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (currentParams.page === undefined) {
      setPage(1);
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
        disabled={!isNextPageAvailable}
      >
        Next Page
      </button>
    </div>
  );
};

export default PaginationSection;
