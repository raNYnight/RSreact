import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import ErrorBoundary from './components/error-boundary/error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import setupStore from './store/store';
import './index.css';
import QueryParamsHandler from './components/app/query-params-handler';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <QueryParamsHandler />
          <App />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
