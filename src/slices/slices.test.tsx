/* eslint-disable @typescript-eslint/no-explicit-any */
import appReducer, { resetApp } from '../slices/appSlice';
import { setSearch, setPage, setItemPerPage, setDetailedBeerID } from '../slices/appSlice';

describe('slices', () => {
  it('setSearch', () => {
    const state = {
      search: 'test',
    };
    expect(appReducer(state as any, setSearch('test'))).toEqual({
      search: 'test',
    });
  });

  it('setPage', () => {
    const state = {
      page: 1,
    };
    expect(appReducer(state as any, setPage(1))).toEqual({
      page: 1,
    });
  });

  it('setItemPerPage', () => {
    const state = {
      itemPerPage: '25',
    };
    expect(appReducer(state as any, setItemPerPage('25'))).toEqual({
      itemPerPage: '25',
    });
  });

  it('setDetailedBeerID', () => {
    const state = {
      detailedBeerID: 1,
    };
    expect(appReducer(state as any, setDetailedBeerID(1))).toEqual({
      detailedBeerID: 1,
    });
  });

  it('reset', () => {
    const state = {
      search: 'test',
      page: 6,
      itemPerPage: '222',
      detailedBeerID: 5,
    };
    expect(appReducer(state as any, resetApp())).toEqual({
      search: '',
      page: 1,
      itemPerPage: '25',
      detailedBeerID: null,
    });
  });
});
