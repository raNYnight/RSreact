/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styles from '@/styles/Home.module.css';

const PaginationSection: React.FC = () => {
  return (
    <div className={styles['pagination-section']}>
      <button>Prev page</button>
      <span>
        <h4>{4}</h4>
      </span>
      <button>Next Page</button>
    </div>
  );
};

export default PaginationSection;
