import React, { Component, createRef } from 'react';
import '../../../index.css';

export interface SearchSectionProps {
  onSearch: (searchTerm: string) => void;
}

class SearchSection extends Component<SearchSectionProps> {
  private inputRef = createRef<HTMLInputElement>();

  handleSearch = () => {
    const inputValue = this.inputRef.current?.value || '';
    this.props.onSearch(inputValue);
  };

  render() {
    return (
      <div className="form-input form-input-with-button">
        <button
          className="button glyphicon glyphicon-search"
          onClick={this.handleSearch}
        />
        <input
          className="input"
          type="text"
          ref={this.inputRef}
          defaultValue={localStorage.getItem('searchTerm') || ''}
          placeholder="Find beer"
        />
      </div>
    );
  }
}

export default SearchSection;
