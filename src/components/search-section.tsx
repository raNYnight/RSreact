import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';
import React from 'react';
import { BASE_ITEM_PER_PAGE, BASE_PAGE } from './constants';

const SearchSection: React.FC = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = React.useState<string>((router.query.search as string) || '');

  const handleSearch = () => {
    const currentQuery = { ...router.query };
    inputValue ? (currentQuery.search = inputValue) : delete currentQuery.search;
    currentQuery.page = '1';
    delete currentQuery.details;
    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  return (
    <div className={`${styles.formInput} ${styles.formInputWithButton}`}>
      <button
        data-testid="search-button"
        className={styles.searchButton}
        onClick={handleSearch}
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
          value={router.query.per_page || BASE_ITEM_PER_PAGE}
          data-testid="items-per-page-input"
          id="itemsPerPage"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            router.query.per_page = e.target.value;
            delete router.query.details;
            router.push({
              pathname: router.pathname,
              query: { ...router.query, page: BASE_PAGE.toString() },
            });
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
