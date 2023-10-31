import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/main-page/main-page';
// import PageNotFound from '../pages/page-not-found/page-not-found';
import BeerInfoSection from '../pages/main-page/beer-info-section/beer-info-section';
import ResultsSection from '../pages/main-page/result-section/result-section';
import DetailedBeerItem from '../pages/main-page/beer-info-section/detailed-beer-item';
import { useState } from 'react';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const pathArr = window.location.pathname.split('/');

  const [params, setParams] = useState({
    searchTerm: urlParams.get('search') || '',
    frontpage: urlParams.get('frontpage') || '',
    details: pathArr[pathArr.length - 1],
  });
  console.log(params);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Main />}
        >
          <Route
            path={`details`}
            element={<BeerInfoSection />}
          />
          <Route
            path="details/:id"
            element={<DetailedBeerItem />}
          />
        </Route>
        {/* <Route
          path="*"
          element={<PageNotFound />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
