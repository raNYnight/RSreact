// o	Verify that clicking the Search button saves the entered value to the local storage++
// Check that the component retrieves the value from the local storage upon mounting.
import * as nextRouter from 'next/router';
import { mockRouter } from './test-utils/with-router';
import SearchSection from '@/components/search-section';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, vi, it, expect } from 'vitest';

describe('SearchSection', () => {
  vi.spyOn(nextRouter, 'useRouter').mockReturnValue(mockRouter);
  it('should trigger input change on search input', () => {
    render(<SearchSection />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'new value' } });

    expect(input.value).toBe('new value');
  });

  it('should trigger URL change on input change', async () => {
    render(<SearchSection />);
    const router = mockRouter;
    const inputElement = screen.getByTestId('items-per-page-input') as HTMLInputElement;

    await waitFor(() => {
      fireEvent.change(inputElement, { target: { value: '10' } });
      expect(router.query.per_page).toBe('10');
    });
  });
});
