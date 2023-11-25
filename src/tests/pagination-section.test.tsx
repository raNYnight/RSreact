// o	Make sure the component updates URL query parameter when page changes.
import PaginationSection from '@/components/pagination-section';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as nextRouter from 'next/router';
import { describe, expect, it, vi } from 'vitest';
import { mockRouter } from './test-utils/with-router';

describe('PaginationSection', () => {
  it('should update URL query parameter when page changes', async () => {
    vi.spyOn(nextRouter, 'useRouter').mockReturnValue(mockRouter);

    render(<PaginationSection isNextPageDisabled={false} />);

    const nextBTN = screen.getByTestId('next-page-button');
    const previousBTN = screen.getByTestId('prev-page-button');
    await waitFor(() => {
      fireEvent.click(nextBTN);
      expect(mockRouter.push).toHaveBeenCalledTimes(1);
      expect(mockRouter.query.page).toBe('2');
      fireEvent.click(nextBTN);
      expect(mockRouter.push).toHaveBeenCalledTimes(2);
      expect(mockRouter.query.page).toBe('3');
      fireEvent.click(previousBTN);
      expect(mockRouter.push).toHaveBeenCalledTimes(3);
      expect(mockRouter.query.page).toBe('2');
    });
  });
});
