import { useLocation, useNavigate } from 'react-router-dom';
import { BeerContextValue, useBeerData } from '../../../contexts/beer-context';
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
  const beerData = useBeerData() as BeerContextValue;
  const beer = beerData.detailedBeer;
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const queryParams = new URLSearchParams(location.search);
    navigate({ pathname: '/', search: queryParams.toString() });
  };
  if (beerData.isDetailsLoading) {
    return (
      <div className="detailed-beer">
        <Spinner />
      </div>
    );
  }

  if (!beer) {
    return <h1>Beer not found</h1>;
  }

  return (
    <div className="detailed-beer">
      <button
        className="button glyphicon glyphicon-remove"
        onClick={handleClick}
      ></button>
      <h1>{beer.name}</h1>
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
    </div>
  );
}

export default DetailedBeerItem;
