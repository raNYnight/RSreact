// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   selectDetailedBeerID,
//   selectItemPerPage,
//   selectPage,
//   selectSearch,
//   setDetailedBeerID,
//   setItemPerPage,
//   setPage,
//   setSearch,
// } from '../../slices/appSlice';

// const QueryParamsHandler = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const pageValue = useSelector(selectPage);
//   const searchValue = useSelector(selectSearch);
//   const itemPerPageValue = useSelector(selectItemPerPage);
//   const detailedBeerID = useSelector(selectDetailedBeerID);

//   //   useEffect(() => {
//   //     const searchParams = new URLSearchParams(location.search);
//   //     const search = searchParams.get('search') || '';
//   //     const page = parseInt(searchParams.get('page') || '1', 10);
//   //     const itemPerPage = searchParams.get('items_per_page') || '';
//   //     const detailedBeerID = parseInt(searchParams.get('details') || '', 10);

//   //     dispatch(setSearch(search));
//   //     dispatch(setPage(page));
//   //     dispatch(setItemPerPage(itemPerPage));
//   //     dispatch(setDetailedBeerID(detailedBeerID));
//   //   }, [location.search, dispatch]);

//   useEffect(() => {
//     const searchParams = new URLSearchParams();
//     if (searchValue) {
//       searchParams.set('search', searchValue);
//     }
//     if (pageValue !== 1) {
//       searchParams.set('page', pageValue.toString());
//     }
//     if (itemPerPageValue !== '25') {
//       searchParams.set('items_per_page', itemPerPageValue);
//     }
//     if (detailedBeerID) {
//       searchParams.set('details', detailedBeerID.toString());
//     }

//     navigate(`?${searchParams.toString()}`);
//   }, [pageValue, searchValue, itemPerPageValue, detailedBeerID, navigate]);

//   return null;
// };

// export default QueryParamsHandler;
