/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../index.css';
import {
  selectItemPerPage,
  selectSearch,
  setDetailedBeerID,
  setItemPerPage,
  setPage,
  setSearch,
} from '../../../../slices/appSlice';
import { BASE_ITEM_PER_PAGE, BASE_PAGE } from '../../../constants/constants';

const SearchSection: React.FC = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const searchValue = useSelector(selectSearch || '');
  const itemsPerPageValue = useSelector(selectItemPerPage || BASE_ITEM_PER_PAGE);
  const [inputValue, setInputValue] = React.useState<string>(localStorage.getItem('search') || '');

  // useEffect(() => {
  //   setInputValue(localStorage.getItem('search') || '');
  // }, []);
  useEffect(() => {
    localStorage.setItem('search', searchValue);
    setInputValue(localStorage.getItem('search') || '');
  }, [searchValue]);

  const handleSearch = () => {
    localStorage.setItem('search', inputValue);
    dispatch(setDetailedBeerID(null));
    dispatch(setPage(BASE_PAGE));
    dispatch(setSearch(inputValue));
  };
  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setItemPerPage(e.target.value));
    dispatch(setPage(BASE_PAGE));
    dispatch(setDetailedBeerID(null));
  };

  return (
    <div className="form-input form-input-with-button">
      <button
        data-testid="search-button"
        className="button glyphicon glyphicon-search"
        onClick={handleSearch}
      ></button>
      <input
        data-testid="search-input"
        className="input"
        type="text"
        value={inputValue}
        placeholder="Find beer"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        }}
      />
      <div>
        <label htmlFor="itemsPerPage">Items per page:</label>
        <select
          data-testid="items-per-page-input"
          id="itemsPerPage"
          value={itemsPerPageValue}
          onChange={handleItemsPerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="80">80</option>
        </select>
      </div>
    </div>
  );
};

export default SearchSection;
