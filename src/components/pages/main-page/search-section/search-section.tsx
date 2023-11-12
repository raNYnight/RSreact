import React, { useEffect } from 'react';
import '../../../../index.css';
import { BeerContextValue, useBeerData } from '../../../contexts/beer-context';

const SearchSection: React.FC = () => {
  localStorage.setItem('search', '');
  const [inputValue, setInputValue] = React.useState<string>('');
  const beerData = useBeerData() as BeerContextValue;

  useEffect(() => {
    setInputValue(beerData.searchTerm);
  }, [beerData.searchTerm]);

  return (
    <div className="form-input form-input-with-button">
      <button
        data-testid="search-button"
        className="button glyphicon glyphicon-search"
        onClick={() => {
          beerData.handleSearch(inputValue);
        }}
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
          value={beerData.itemPerPage}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            beerData.handleItemsPerPageChange(e);
          }}
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
