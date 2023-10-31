import ResultsSection from './result-section/result-section';
import SearchSection from './search-section/search-section';

import { useSearchParams } from 'react-router-dom';
import '../../../index.css';
import BeerInfoSection from './beer-info-section/beer-info-section';

function Main() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');

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
      <SearchSection />
      <div className="beer-section">
        <ResultsSection searchTerm={searchTerm || ''} />
        <BeerInfoSection />
      </div>
    </div>
  );
}

export default Main;
