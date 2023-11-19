import React from 'react';
import { Link } from 'react-router-dom';
import './page-not-found.css';
function PageNotFound() {
  return (
    <div
      className="page-not-found"
      data-testid="page-not-found"
    >
      <h1>Page not found</h1>
      <Link
        to={'/'}
        style={{ textDecoration: 'none' }}
        className="btn btn-info"
      >
        <h2>Return to main page</h2>
      </Link>
    </div>
  );
}

export default PageNotFound;
