import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/main-page/main-page';
import PageNotFound from '../pages/page-not-found/page-not-found';
// import BeerInfoSection from '../pages/main-page/beer-info-section/beer-info-section';
import DetailedBeerItem from '../pages/main-page/beer-info-section/detailed-beer-item';

function App() {
  const basename = process.env.PUBLIC_URL;

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route
          path="/"
          element={<Main />}
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
    </BrowserRouter>
  );
}

export default App;
