import Header from '@/components/header';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import * as nextRouter from 'next/router';
import { describe, expect, it, vi } from 'vitest';
import { mockRouter } from './test-utils/with-router';

describe('Header', async () => {
  vi.spyOn(nextRouter, 'useRouter').mockReturnValue(mockRouter);
  it('Header link should redirect to home', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Header />
      </RouterContext.Provider>
    );

    const header = await screen.findByTestId('header-link');

    fireEvent.click(header);
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/', '/', {
      locale: undefined,
      scroll: true,
      shallow: undefined,
    });
  });
});
