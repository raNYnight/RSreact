/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { setDetailedBeerID, setItemPerPage, setPage, setSearch } from '../../slices/appSlice';
import { BASE_ITEM_PER_PAGE, BASE_PAGE } from '../constants/constants';
import DetailedBeerItem from '../pages/main-page/detailed-beer-item/detailed-beer-item';
import MainPage from '../pages/main-page/main-page';
import PageNotFound from '../pages/page-not-found/page-not-found';

function App() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || BASE_PAGE.toString(), 10);
    const itemPerPage = searchParams.get('items_per_page') || BASE_ITEM_PER_PAGE;
    const detailedBeer = searchParams.get('details');
    const detailedBeerID = detailedBeer ? +detailedBeer : null;

    dispatch(setSearch(search));
    dispatch(setPage(page));
    dispatch(setItemPerPage(itemPerPage));
    dispatch(setDetailedBeerID(detailedBeerID));
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage />}
      >
        <Route
          path="details/:id"
          element={<DetailedBeerItem />}
        />
      </Route>
      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Routes>
  );
}

export default App;
