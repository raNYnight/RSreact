import React from 'react';
import styles from '@/styles/Home.module.css';

const SearchSection: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  console.log(styles);
  return (
    <div className={`${styles.formInput} ${styles.formInputWithButton}`}>
      <button
        data-testid="search-button"
        className={styles.searchButton}
      >
        <i className="bi bi-search"></i>
      </button>
      <input
        data-testid="search-input"
        className={styles.input}
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
