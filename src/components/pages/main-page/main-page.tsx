import ResultsSection from './result-section/result-section';
import SearchSection from './search-section/search-section';

import { Link, useLocation, useParams } from 'react-router-dom';
import '../../../index.css';
import BeerInfoSection from './beer-info-section/beer-info-section';
import PaginationSection from './pagination-section/pagination-section';

function Main() {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const perPage = `?per_page=${queryParams.get('per_page')}`;
  return (
    <div className="container">
      <header className="header">
        <Link
          to={perPage || '/'}
          style={{ textDecoration: 'none' }}
        >
          <h1>Beer academy</h1>
        </Link>
      </header>
      <main className="main">
        <h2>Beer catalogue</h2>

        <p>
          The Beer Academy is a renowned institution for beer enthusiasts, offering educational
          programs, workshops, and tastings to explore the art and science of brewing beer. Cheers
          to beer education!
        </p>

        <SearchSection />
        <PaginationSection />
        <div
          className="beer-section"
          style={{ gridTemplateColumns: params.id ? '1fr 1fr' : '1fr' }}
        >
          <ResultsSection />
          {params.id && <BeerInfoSection />}
        </div>
      </main>
    </div>
  );
}

export default Main;
