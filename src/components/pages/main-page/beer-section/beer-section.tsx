import '../../../../index.css';
import { BeerContextValue, useBeerData } from '../../../contexts/beer-context';
import DetailedBeerItem from '../detailed-beer-item/detailed-beer-item';
import ResultsSection from '../result-section/result-section';

const BeerSection = () => {
  const beerData = useBeerData() as BeerContextValue;
  const beerOnPage = beerData.searchResults.length;
  if (beerOnPage === 0) {
    return <h1>There is no beer found</h1>;
  }
  return (
    <div
      className="beer-section"
      style={{ gridTemplateColumns: beerData!.detailedBeerID ? '1fr 1fr' : '1fr' }}
    >
      <ResultsSection />
      <div className="beer-info">{beerData.detailedBeerID && <DetailedBeerItem />}</div>
    </div>
  );
};

export default BeerSection;
