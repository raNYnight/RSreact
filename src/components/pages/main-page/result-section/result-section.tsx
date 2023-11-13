import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../../../../index.css';
import { useFetchBySearchQuery } from '../../../../slices/apiSlice';
import {
  selectItemPerPage,
  selectPage,
  selectSearch,
  setDetailedBeerID,
} from '../../../../slices/appSlice';
import { BASE_ITEM_PER_PAGE, BASE_PAGE } from '../../../constants/constants';
import Spinner from '../../../load-spinner/spinner';

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  description: string;
  abv: number;
  image_url: string;
}

const ResultsSection: React.FC = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearch || '');
  const pageValue = useSelector(selectPage || BASE_PAGE);
  const itemPerPageValue = useSelector(selectItemPerPage || BASE_ITEM_PER_PAGE);

  const {
    data: fetchedBeers,
    isSuccess,
    isLoading,
    isFetching,
  } = useFetchBySearchQuery({
    search: searchValue,
    page: pageValue,
    itemPerPage: itemPerPageValue,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const handleBeerClick = (beer: Beer) => {
    dispatch(setDetailedBeerID(beer.id));
    const currentParams = Object.fromEntries(queryParams.entries());

    navigate(`/details/${beer.id}`, currentParams);
  };

  if (isLoading || isFetching) {
    return <Spinner />;
  }
  if (isSuccess) {
    return !fetchedBeers.length ? (
      <h1>There is no beer found</h1>
    ) : (
      <ul className="beer-list">
        {fetchedBeers.map((beer) => (
          <NavLink
            onClick={() => handleBeerClick(beer)}
            to={{
              pathname: `details/${beer.id}`,
              search: queryParams.toString(),
            }}
            key={beer.id}
          >
            <li
              className="beer-card"
              data-testid="beer-card"
            >
              <img
                src={beer.image_url}
                alt={beer.name}
              />
              <div>
                <h3>{beer.name}</h3>
                <h4>{beer.tagline}</h4>
                <p>{beer.description}</p>
                <span>abv: {beer.abv}</span>
              </div>
            </li>
          </NavLink>
        ))}
      </ul>
    );
  }
};
export default ResultsSection;
