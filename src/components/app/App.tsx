import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from '../pages/page-not-found/page-not-found';
import MainPage from '../pages/main-page/main-page';
import DetailedBeerItem from '../pages/main-page/detailed-beer-item/detailed-beer-item';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
