/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectSearch, selectItemPerPage, selectPage, selectDetailedBeerID } from './appSlice';

describe('selectors', () => {
  it('selectSearch', () => {
    const state = {
      app: {
        search: 'test',
      },
    };
    expect(selectSearch(state as any)).toBe('test');
  });

  it('selectPage', () => {
    const state = {
      app: {
        page: 1,
      },
    };
    expect(selectPage(state as any)).toBe(1);
  });

  it('selectItemPerPage', () => {
    const state = {
      app: {
        itemPerPage: '25',
      },
    };
    expect(selectItemPerPage(state as any)).toBe('25');
  });

  it('selectDetailedBeerID', () => {
    const state = {
      app: {
        detailedBeerID: 1,
      },
    };
    expect(selectDetailedBeerID(state as any)).toBe(1);
  });
});
