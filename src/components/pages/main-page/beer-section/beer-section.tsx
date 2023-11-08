import { Outlet } from 'react-router-dom';
import { BeerContextValue, useBeerData } from '../../../contexts/beer-context';
import ResultsSection from '../result-section/result-section';
import '../../../../index.css';

const BeerSection = () => {
  const beerData = useBeerData() as BeerContextValue;
  const beerOnPage = beerData.searchResults.length;
  if (beerOnPage === 0) {
    return <h1>There is no beer found</h1>;
  }
  return (
    <div
      className="beer-section"
      style={{ gridTemplateColumns: beerData!.detailedBeer ? '1fr 1fr' : '1fr' }}
    >
      <ResultsSection />
      <div className="beer-info">
        <Outlet />
      </div>
    </div>
  );
};

export default BeerSection;
