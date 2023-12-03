import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/header/header';
import '../index.css';
import { RootState } from '../store/store';
import SubmitList from '../components/submit-list/submit-list';

function MainPage(): JSX.Element {
  const firstFormSubmits = useSelector((state: RootState) => state.firstForm.submits);
  const secondFormSubmits = useSelector((state: RootState) => state.secondForm.submits);
  return (
    <div className="container">
      <Header />
      <main className="main">
        <Link to={'/first-form'}>
          <h2>Form with uncontrolled components </h2>
        </Link>

        <Link to={'/second-form'}>
          <h2>Form with React Hook Form</h2>
        </Link>
        <div className="form-submits">
          <div className="form-data">
            <h3>Form with uncontrolled components</h3>
            {firstFormSubmits && <SubmitList submits={firstFormSubmits} />}
          </div>
          <div className="form-data">
            <h3>Form with React Hook Form</h3>
            {secondFormSubmits && <SubmitList submits={secondFormSubmits} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
