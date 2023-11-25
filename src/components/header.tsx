import styles from '@/styles/Home.module.css';
import Link from 'next/link';
const Header = () => {
  return (
    <header className={styles.header}>
      <Link
        href={'/'}
        style={{ textDecoration: 'none' }}
        data-testid="header-link"
      >
        <h1 style={{ textDecoration: 'none' }}>Beer academy</h1>
      </Link>
    </header>
  );
};

export default Header;
