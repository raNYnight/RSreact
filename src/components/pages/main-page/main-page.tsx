import SearchSection from './search-section/search-section';

import { Link } from 'react-router-dom';
import '../../../index.css';
import BeerSection from './beer-section/beer-section';
import Footer from './footer/footer';
import PaginationSection from './pagination-section/pagination-section';

const MainPage = () => {
  return (
    <div className="container">
      <header className="header">
        <Link
          to={'/'}
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
        <BeerSection />
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
