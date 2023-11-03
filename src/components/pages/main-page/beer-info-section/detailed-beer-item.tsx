import { useEffect, useState } from 'react';
import './beer-info.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../../load-spinner/spinner';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [beer, setBeer] = useState<DetailedBeerData | undefined>();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  useEffect(() => {
    const fetchBeerData = async (beerID: string): Promise<DetailedBeerData> => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.punkapi.com/v2/beers/${beerID}`);
        const data: DetailedBeerData[] = await response.json();
        setIsLoading(false);
        return data[0];
      } catch (error) {
        console.error('Error fetching beer data:', error);
        throw error; // Если требуется обработка ошибки в другом месте
      }
    };

    const getBeerData = async () => {
      const beerData = await fetchBeerData(params.id || '');
      setBeer(beerData);
    };

    getBeerData();
  }, [params.id]);

  const handleClick = () => {
    navigate({ pathname: '/', search: queryParams.toString() });
  };
  if (isLoading) {
    return <Spinner />;
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
