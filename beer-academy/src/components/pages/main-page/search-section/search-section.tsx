import React from 'react';
import '../../../../index.css';
import { Link, useSearchParams } from 'react-router-dom';

export interface SearchSectionProps {
  // onSearch: (searchTerm: string) => void;
  // searchTerm: string;
}

const SearchSection: React.FC<SearchSectionProps> = () => {
  const [inputValue, setInputValue] = React.useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');
  console.log('searchTerm', searchTerm);

  return (
    <div className="form-input form-input-with-button">
      <Link
        to={`/?search=${inputValue}`}
        className="button glyphicon glyphicon-search"
      />
      <input
        className="input"
        type="text"
        defaultValue={searchTerm || ''}
        placeholder="Find beer"
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default SearchSection;
