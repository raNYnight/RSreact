import { useDispatch, useSelector } from 'react-redux';
import { useFetchBeerByIdQuery } from '../../../../slices/apiSlice';
import { selectDetailedBeerID, setDetailedBeerID } from '../../../../slices/appSlice';
import Spinner from '../../../load-spinner/spinner';
import './detailed-beer.css';

export interface DetailedBeerData {
  id: number;
  name: string;
  tagline: string;
  description: string;
  abv: number;
  image_url: string;
  ingredients: BeerIngridients;
  brewers_tips: string;
  contributed_by: string;
}
export interface BeerIngridients {
  malt: {
    name: string;
  }[];
  hops: {
    name: string;
  }[];
  yeast: string;
}

function DetailedBeerItem() {
  const detailedBeerID = useSelector(selectDetailedBeerID);
  const dispatch = useDispatch();
  const {
    data: beer,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useFetchBeerByIdQuery(detailedBeerID!);
  const handleCloseDetails = () => {
    dispatch(setDetailedBeerID(null));
  };

  if (isError) {
    handleCloseDetails();
    return null;
  }
  if (isLoading || isFetching) {
    return (
      <div
        className="detailed-beer"
        data-testid="detailed-beer"
      >
        <Spinner />
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div
        className="detailed-beer"
        data-testid="detailed-beer"
      >
        <>
          <button
            data-testid="close-detailed-beer"
            className="button glyphicon glyphicon-remove"
            onClick={handleCloseDetails}
          ></button>
          <h1 data-testid="detailed-beer-name">{beer.name}</h1>
          <img
            src={beer.image_url}
            alt={beer.name}
          />
          <h3>{beer.tagline}</h3>
          <h3>abv: {beer.abv}%</h3>
          <p>{beer.description}</p>

          <ul>
            <h4>Ingridients:</h4>
            <li>
              <b>Malt:</b> {beer.ingredients.malt.map((malt) => malt.name).join(', ')}
            </li>
            <li>
              <b>Hops:</b> {beer.ingredients.hops.map((hop) => hop.name).join(', ')}
            </li>
            <li>
              <b>Yeast:</b> {beer.ingredients.yeast}
            </li>
          </ul>
          <p>
            <b>Brewer tips:</b> {beer.brewers_tips}
          </p>
          <p>
            <b>Contributed by:</b> {beer.contributed_by}
          </p>
        </>
      </div>
    );
  }
}

export default DetailedBeerItem;
