// import { useDispatch, useSelector } from 'react-redux';
// import styles from '@/styles/Home.module.css';
// import { fetchDetailedBeer } from '@/api/api';
// import { GetServerSideProps } from 'next';
// import { Props } from 'next/script';
// import { Query } from '..';
// import RootLayout from '@/components/layout';
// import { NextPageWithLayout } from '../_app';
// import ResultsLayout from '@/components/ResultsLayout';

// export interface DetailedBeerData {
//   id: number;
//   name: string;
//   tagline: string;
//   description: string;
//   abv: number;
//   image_url: string;
//   ingredients: BeerIngridients;
//   brewers_tips: string;
//   contributed_by: string;
// }
// export interface BeerIngridients {
//   malt: {
//     name: string;
//   }[];
//   hops: {
//     name: string;
//   }[];
//   yeast: string;
// }

// interface detailedBeerItemProps {
//   detailedBeer: DetailedBeerData | null;
// }

// interface DetailedGSSProps {
//   detailedBeer: DetailedBeerData | null;
// }
// export const getServerSideProps: GetServerSideProps<DetailedGSSProps> = async ({ params }) => {
//   const detailedBeerID = params!.id as string;

//   try {
//     let detailedBeer = null;

//     if (detailedBeerID) {
//       detailedBeer = await fetchDetailedBeer(+detailedBeerID);
//     }

//     return {
//       props: { detailedBeer },
//     };
//   } catch (error) {
//     console.error(error);

//     return {
//       props: { detailedBeer: null },
//     };
//   }
// };
// const DetailedBeerItem: NextPageWithLayout<DetailedGSSProps> = (props: detailedBeerItemProps) => {
//   const detailedBeer = props.detailedBeer!;
//   return (
//     <div
//       className={styles['detailed-beer']}
//       data-testid="detailed-beer"
//     >
//       <>
//         <button
//           data-testid="close-detailed-beer"
//           className="bi bi-x-square"
//         ></button>
//         <h1 data-testid="detailed-beer-name">{detailedBeer.name}</h1>
//         <img
//           src={detailedBeer.image_url}
//           alt={detailedBeer.name}
//         />
//         <h3>{detailedBeer.tagline}</h3>
//         <h3>abv: {detailedBeer.abv}%</h3>
//         <p>{detailedBeer.description}</p>

//         <ul>
//           <h4>Ingridients:</h4>
//           <li>
//             <b>Malt:</b> {detailedBeer.ingredients.malt.map((malt) => malt.name).join(', ')}
//           </li>
//           <li>
//             <b>Hops:</b> {detailedBeer.ingredients.hops.map((hop) => hop.name).join(', ')}
//           </li>
//           <li>
//             <b>Yeast:</b> {detailedBeer.ingredients.yeast}
//           </li>
//         </ul>
//         <p>
//           <b>Brewer tips:</b> {detailedBeer.brewers_tips}
//         </p>
//         <p>
//           <b>Contributed by:</b> {detailedBeer.contributed_by}
//         </p>
//       </>
//     </div>
//   );
// };

// DetailedBeerItem.getLayout = (page) => {
//   return (
//     <RootLayout>
//       <ResultsLayout>{page}</ResultsLayout>
//     </RootLayout>
//   );
// };

// // export default DetailedBeerItem;
