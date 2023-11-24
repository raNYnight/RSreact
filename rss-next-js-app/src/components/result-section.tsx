import React from 'react';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { Head } from 'next/document';
import { useRouter } from 'next/router';

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
