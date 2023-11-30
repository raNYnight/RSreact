import { Route, Routes } from 'react-router-dom';
import '../../index.css';
import FirstFormPage from '../pages/first-form-page';
import MainPage from '../pages/main-page';
import SecondFormPage from '../pages/second-form-page';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage />}
      />
      <Route
        path="first-form"
        element={<FirstFormPage />}
      />
      <Route
        path="second-form"
        element={<SecondFormPage />}
      />
    </Routes>
  );
}

export default App;
