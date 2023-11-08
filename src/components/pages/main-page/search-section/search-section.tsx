import React from 'react';
import '../../../../index.css';
import { BeerContextValue, useBeerData } from '../../../contexts/beer-context';

const SearchSection: React.FC = () => {
  const inputRef = React.createRef<HTMLInputElement>();

  const beerData = useBeerData() as BeerContextValue;

  return (
    <div className="form-input form-input-with-button">
      <button
        className="button glyphicon glyphicon-search"
        onClick={() => {
          beerData.handleSearch(inputRef.current!.value);
        }}
      ></button>
      <input
        className="input"
        type="text"
        defaultValue={beerData.searchTerm}
        placeholder="Find beer"
        ref={inputRef}
      />
      <div>
        <label htmlFor="itemsPerPage">Items per page:</label>
        <select
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
