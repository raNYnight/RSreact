import React, { useState, useEffect } from 'react';

import ResultsSection from './result-section/result-section';
import SearchSection from './search-section/search-section';

import '../../index.css';

const Main = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    localStorage.setItem('searchTerm', searchTerm);
  };

  useEffect(() => {
    const searchTerm = localStorage.getItem('searchTerm');
    if (searchTerm) {
      setSearchTerm(searchTerm);
    }
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Beer academy</h1>
      </header>
      <main className="main">
        <h2>Beer catalogue</h2>

        <p>
          The Beer Academy is a renowned institution for beer enthusiasts, offering educational
          programs, workshops, and tastings to explore the art and science of brewing beer. Cheers
          to beer education!
        </p>
      </main>
      <SearchSection onSearch={handleSearch} />
      <ResultsSection searchTerm={searchTerm} />
    </div>
  );
};

export default Main;
