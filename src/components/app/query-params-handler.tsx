/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  selectDetailedBeerID,
  selectItemPerPage,
  selectPage,
  selectSearch,
  setDetailedBeerID,
  setItemPerPage,
  setPage,
  setSearch,
} from '../../slices/appSlice';
import { BASE_ITEM_PER_PAGE, BASE_PAGE } from '../constants/constants';

const QueryParamsHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pageValue = useSelector(selectPage);
  const searchValue = useSelector(selectSearch);
  const itemsPerPageValue = useSelector(selectItemPerPage);
  const detailedBeerID = useSelector(selectDetailedBeerID);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('search') || '';
    const pageQuery = parseInt(searchParams.get('page') || BASE_PAGE.toString(), 10);
    const itemsPerPageQuery = searchParams.get('items_per_page') || BASE_ITEM_PER_PAGE;
    const detailedBeer = searchParams.get('details');
    const detailedBeerQuery = detailedBeer ? +detailedBeer : null;

    dispatch(setSearch(searchQuery));
    dispatch(setPage(pageQuery));
    dispatch(setItemPerPage(itemsPerPageQuery));
    dispatch(setDetailedBeerID(detailedBeerQuery));
  }, []);

  useEffect(() => {
    itemsPerPageValue === '25'
      ? searchParams.delete('items_per_page')
      : searchParams.set('items_per_page', itemsPerPageValue.toString());
    searchValue ? searchParams.set('search', searchValue) : searchParams.delete('search');
    navigate(`?${searchParams.toString()}`);
  }, [itemsPerPageValue, searchValue]);

  useEffect(() => {
    if (pageValue === 1) {
      searchParams.delete('page');
      navigate(`?${searchParams.toString()}`);
    } else {
      searchParams.set('page', pageValue.toString());

      navigate(`?${searchParams.toString()}`);
    }
  }, [pageValue]);

  useEffect(() => {
    if (detailedBeerID) {
      searchParams.set('details', detailedBeerID.toString());
      navigate(`?${searchParams.toString()}`);
    } else {
      searchParams.delete('details');
      navigate(`?${searchParams.toString()}`);
    }
  }, [detailedBeerID]);

  return null;
};

export default QueryParamsHandler;
