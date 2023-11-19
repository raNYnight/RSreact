// o	Make sure the component updates URL query parameter when page changes.

import { waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../../test-utils/provider-util';
import PaginationSection from './pagination-section';

describe('PaginationSection', () => {
  it('should update URL query parameter when page changes', async () => {
    renderWithProviders(
      <MemoryRouter>
        <PaginationSection />
      </MemoryRouter>
    );
    const paginationSection = document.querySelector('.pagination-section');
    const nextBTN = paginationSection?.querySelector('button:last-child');

    waitFor(async () => {
      const page = new URLSearchParams(window.location.search).get('page');
      await userEvent.click(nextBTN!).then(() => {
        expect(page).toBe(`2`);
      });
    });
  });
});
