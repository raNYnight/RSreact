import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './pagination.css';

function PaginationSection() {
  const [page, setPage] = useState(1);

  const [queryParams, setQueryParams] = useSearchParams();
  const currentParams = Object.fromEntries(queryParams.entries());
  function handleNext() {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      setQueryParams({
        ...currentParams,
        page: newPage.toString(),
      });
      return newPage;
    });
  }
  function handlePrev() {
    setPage((prevPage) => {
      const newPage = prevPage - 1;
      setQueryParams({
        ...currentParams,
        page: newPage.toString(),
      });
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
      <button onClick={handleNext}>Next Page</button>
    </div>
  );
}

export default PaginationSection;
