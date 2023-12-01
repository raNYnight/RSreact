import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link
        to={'/'}
        style={{ textDecoration: 'none' }}
      >
        <h1>React Forms</h1>
      </Link>
    </header>
  );
};

export default Header;
