import SearchSection from './search-section/search-section';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../../index.css';
import { setDetailedBeerID, setItemPerPage, setPage, setSearch } from '../../../slices/appSlice';
import { BASE_ITEM_PER_PAGE, BASE_PAGE } from '../../constants/constants';
import BeerSection from './beer-section/beer-section';
import Footer from './footer/footer';
import PaginationSection from './pagination-section/pagination-section';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleReturnToMainPage = () => {
    dispatch(setDetailedBeerID(null));
    dispatch(setPage(BASE_PAGE));
    dispatch(setSearch(''));
    dispatch(setItemPerPage(BASE_ITEM_PER_PAGE));
    navigate('/');
  };
  return (
    <div className="container">
      <header className="header">
        <h1
          style={{ textDecoration: 'none' }}
          onClick={handleReturnToMainPage}
        >
          Beer academy
        </h1>
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
