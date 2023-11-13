import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import ErrorBoundary from './components/error-boundary/error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
