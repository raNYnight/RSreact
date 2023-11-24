import styles from '@/styles/Home.module.css';
import Header from './header';
import Footer from './footer';
import { Head } from 'next/document';
import PaginationSection from './pagination-section';
import SearchSection from './search-section';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <h2>Beer catalogue</h2>

          <p>
            The Beer Academy is a renowned institution for beer enthusiasts, offering educational
            programs, workshops, and tastings to explore the art and science of brewing beer. Cheers
            to beer education!
          </p>

          <SearchSection />

          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
