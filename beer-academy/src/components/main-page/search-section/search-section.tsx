import React, { useRef } from 'react';
import '../../../index.css';

export interface SearchSectionProps {
  onSearch: (searchTerm: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const inputValue = inputRef.current?.value || '';
    onSearch(inputValue);
  };

  return (
    <div className="form-input form-input-with-button">
      <button
        className="button glyphicon glyphicon-search"
        onClick={handleSearch}
      />
      <input
        className="input"
        type="text"
        ref={inputRef}
        defaultValue={localStorage.getItem('searchTerm') || ''}
        placeholder="Find beer"
      />
    </div>
  );
};

export default SearchSection;
