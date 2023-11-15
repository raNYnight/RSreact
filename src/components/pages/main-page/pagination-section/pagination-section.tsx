/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchBySearchQuery } from '../../../../slices/apiSlice';
import {
  selectItemPerPage,
  selectPage,
  selectSearch,
  setDetailedBeerID,
  setPage,
} from '../../../../slices/appSlice';
import './pagination.css';

const PaginationSection: React.FC = () => {
  const dispatch = useDispatch();
  const pageValue = useSelector(selectPage);
  const searchValue = useSelector(selectSearch);
  const itemPerPageValue = useSelector(selectItemPerPage);
  const { data: fetchedBeers } = useFetchBySearchQuery({
    search: searchValue,
    page: pageValue,
    itemPerPage: itemPerPageValue,
  });

  const handlePreviousPage = () => {
    pageValue > 1 && (dispatch(setPage(pageValue - 1)), dispatch(setDetailedBeerID(null)));
  };

  const handleNextPage = () => {
    dispatch(setPage(pageValue + 1));
    dispatch(setDetailedBeerID(null));
  };

  return (
    <div className="pagination-section">
      <button
        onClick={handlePreviousPage}
        disabled={pageValue === 1}
      >
        Prev page
      </button>
      <span>
        <h4>{pageValue}</h4>
      </span>
      <button
        onClick={handleNextPage}
        disabled={!fetchedBeers || fetchedBeers.length < +itemPerPageValue}
      >
        Next Page
      </button>
    </div>
  );
};

export default PaginationSection;
