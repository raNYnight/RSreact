/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';
import { BASE_PAGE } from './constants';
import { useEffect } from 'react';

interface PaginationSectionProps {
  isNextPageDisabled: boolean;
}

const PaginationSection: React.FC<PaginationSectionProps> = ({ isNextPageDisabled }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(Number(router.query.page) || BASE_PAGE);

  useEffect(() => {
    setCurrentPage(Number(router.query.page) || BASE_PAGE);
  }, [router.query.page]);

  const handlePageUpdate = (newPageValue: number) => {
    delete router.query.details;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPageValue },
    });
    setCurrentPage(newPageValue);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPageValue = currentPage - 1;
      handlePageUpdate(newPageValue);
    }
  };

  const handleNextPage = () => {
    const newPageValue = currentPage + 1;
    handlePageUpdate(newPageValue);
  };

  return (
    <div className={styles['pagination-section']}>
      <button
        data-testid="prev-page-button"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Prev page
      </button>
      <span>
        <h4>{router.query.page}</h4>
      </span>
      <button
        data-testid="next-page-button"
        onClick={() => handleNextPage()}
        disabled={isNextPageDisabled}
      >
        Next Page
      </button>
    </div>
  );
};

export default PaginationSection;
