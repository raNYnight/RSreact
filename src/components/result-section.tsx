/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  description: string;
  abv: number;
  image_url: string;
}

interface ResultsSectionProps {
  fetchedBeers: Beer[];
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ fetchedBeers }) => {
  const router = useRouter();
  if (fetchedBeers.length === 0) {
    return <h3>No results were found. Please try another search.</h3>;
  }
  return (
    <>
      <ul
        className={styles['beer-list']}
        id="beer-list"
      >
        {fetchedBeers.map((beer) => (
          <Link
            key={beer.id}
            className={styles['beer-card']}
            data-testid="beer-card"
            href={{
              pathname: `/`,
              query: { ...router.query, details: beer.id },
            }}
            scroll={false}
          >
            <img
              src={beer.image_url}
              alt={beer.name}
              width={100}
              height={200}
            />
            <div>
              <h3>{beer.name}</h3>
              <h4>{beer.tagline}</h4>
              <p>{beer.description}</p>
              <span>abv: {beer.abv}</span>
            </div>
          </Link>
        ))}
      </ul>
    </>
  );
};
export default ResultsSection;
