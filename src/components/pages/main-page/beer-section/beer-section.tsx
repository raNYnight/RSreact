import { Outlet } from 'react-router-dom';
import { useBeerData } from '../../../contexts/beer-context';
import ResultsSection from '../result-section/result-section';
import '../../../../index.css';

const BeerSection = () => {
  const beerData = useBeerData();
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
