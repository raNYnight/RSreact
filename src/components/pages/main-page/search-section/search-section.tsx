import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../../index.css';

export interface SearchSectionProps {
  // onSearch: (searchTerm: string) => void;
  // searchTerm: string;
}

const SearchSection: React.FC<SearchSectionProps> = () => {
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const currentParams = Object.fromEntries(queryParams.entries());
  const searchTerm = queryParams.get('search');

  function handleSearch() {
    const paramsToSet = {
      ...currentParams,
      search: inputValue,
      page: '1',
    };
    const queryParams = new URLSearchParams(paramsToSet).toString();
    navigate(`/?${queryParams}`);
  }

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const paramsToSet = { ...currentParams, per_page: e.target.value, page: '1' };
    const queryParams = new URLSearchParams(paramsToSet).toString();
    navigate(`/?${queryParams}`);
  };
  useEffect(() => {
    if (searchTerm === null) {
      setInputValue('');
    } else {
      setInputValue(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className="form-input form-input-with-button">
      <button
        className="button glyphicon glyphicon-search"
        onClick={handleSearch}
      ></button>
      <input
        className="input"
        type="text"
        value={inputValue}
        placeholder="Find beer"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div>
        <label htmlFor="itemsPerPage">Items per page:</label>
        <select
          id="itemsPerPage"
          value={currentParams.per_page || '25'}
          onChange={handleItemsPerPageChange}
        >
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
};

export default SearchSection;
