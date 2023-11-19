import { useSelector } from 'react-redux';
import '../../../../index.css';
import { selectDetailedBeerID } from '../../../../slices/appSlice';
import DetailedBeerItem from '../detailed-beer-item/detailed-beer-item';
import ResultsSection from '../result-section/result-section';

const BeerSection = () => {
  const detailedBeerID = useSelector(selectDetailedBeerID);
  return (
    <div
      className="beer-section"
      style={{ gridTemplateColumns: detailedBeerID ? '1fr 1fr' : '1fr' }}
    >
      <ResultsSection />
      <div className="beer-info">{detailedBeerID && <DetailedBeerItem />}</div>
    </div>
  );
};

export default BeerSection;
