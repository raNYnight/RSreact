import { Link } from 'react-router-dom';
import '../index.css';
import Header from '../components/header/header';

function MainPage(): JSX.Element {
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
      </main>
    </div>
  );
}

export default MainPage;
