import styles from '@/styles/Home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

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

interface detailedBeerItemProps {
  detailedBeer: DetailedBeerData | null;
}

const DetailedBeerItem = (props: detailedBeerItemProps) => {
  const detailedBeer = props.detailedBeer!;
  const router = useRouter();
  return (
    <div
      className={styles['detailed-beer']}
      data-testid="detailed-beer"
    >
      <>
        <button
          data-testid="close-detailed-beer"
          className="bi bi-x-square"
          onClick={() => {
            delete router.query.details;
            router.push({ pathname: router.pathname, query: router.query }, undefined, {
              scroll: false,
            });
          }}
        ></button>
        <h1 data-testid="detailed-beer-name">{detailedBeer.name}</h1>
        <Image
          loading="lazy"
          src={detailedBeer.image_url}
          alt={detailedBeer.name}
          sizes="30vw"
          style={{
            width: '12rem',
            height: 'auto',
          }}
          width={100}
          height={100}
        />
        <h3>{detailedBeer.tagline}</h3>
        <h3>abv: {detailedBeer.abv}%</h3>
        <p>{detailedBeer.description}</p>

        <ul>
          <h4>Ingridients:</h4>
          <li>
            <b>Malt:</b> {detailedBeer.ingredients.malt.map((malt) => malt.name).join(', ')}
          </li>
          <li>
            <b>Hops:</b> {detailedBeer.ingredients.hops.map((hop) => hop.name).join(', ')}
          </li>
          <li>
            <b>Yeast:</b> {detailedBeer.ingredients.yeast}
          </li>
        </ul>
        <p>
          <b>Brewer tips:</b> {detailedBeer.brewers_tips}
        </p>
        <p>
          <b>Contributed by:</b> {detailedBeer.contributed_by}
        </p>
      </>
    </div>
  );
};

export default DetailedBeerItem;
