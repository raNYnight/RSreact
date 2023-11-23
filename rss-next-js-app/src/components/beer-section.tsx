import DetailedBeerItem from './detailed-beer-item';
import ResultsSection from './result-section';
import '../styles/Home.module.css';

const BeerSection = () => {
  return (
    <div
      className="beer-section"
      style={{ gridTemplateColumns: '1fr 1fr' }}
    >
      {/* <ResultsSection /> */}
      {/* <div className="beer-info">{<DetailedBeerItem />}</div> */}
    </div>
  );
};

export default BeerSection;
