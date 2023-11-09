import { Route, Routes } from 'react-router-dom';
import DetailedBeerItem from '../pages/main-page/detailed-beer-item/detailed-beer-item';
import MainPage from '../pages/main-page/main-page';
import PageNotFound from '../pages/page-not-found/page-not-found';

function App() {
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
