/* eslint-disable linebreak-style */
import { describe, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  it('Renders Not Found Page if path is invalid', () => {
    const invalidRoute = '/invalid';
    render(
      <MemoryRouter initialEntries={[invalidRoute]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('page-not-found')).toBeInTheDocument();
  });
});
