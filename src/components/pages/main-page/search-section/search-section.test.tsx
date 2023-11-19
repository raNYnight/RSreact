// o	Verify that clicking the Search button saves the entered value to the local storage++
// Check that the component retrieves the value from the local storage upon mounting.

import { fireEvent, screen } from '@testing-library/react';
import 'vitest-localstorage-mock';
import { renderWithProviders } from '../../../../test-utils/provider-util';
import SearchSection from './search-section';

describe('SearchSection', () => {
  it('clicking the Search button saves the entered value to the local storage', async () => {
    renderWithProviders(<SearchSection />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    const searchBTN = screen.getByTestId('search-button') as HTMLButtonElement;
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(searchBTN);
    expect(localStorage.getItem('search')).toStrictEqual('test');
  });

  it('should trigger input change on search input', () => {
    renderWithProviders(<SearchSection />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'new value' } });

    expect(input.value).toBe('new value');
  });

  it('should trigger input change on items per page input', () => {
    renderWithProviders(<SearchSection />);

    const inputElement = screen.getByTestId('items-per-page-input') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: '5' } });

    expect(inputElement.value).toBe('5');
  });

  it('Check that the component retrieves the value from the local storage upon mounting.', () => {
    localStorage.setItem('search', 'test');
    renderWithProviders(<SearchSection />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    expect(input.value).toBe(localStorage.search);
  });
});
