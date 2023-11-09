import SearchSection from './search-section/search-section';

import { Link } from 'react-router-dom';
import '../../../index.css';
import BeerSection from './beer-section/beer-section';
import PaginationSection from './pagination-section/pagination-section';
import { BeerProvider } from '../../contexts/beer-context';
import Footer from './footer/footer';

const MainPage = () => {
  console.log('main page rendered');
  return (
    <BeerProvider>
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
    </BeerProvider>
  );
};

export default MainPage;
