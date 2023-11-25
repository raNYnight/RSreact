import styles from '@/styles/Home.module.css';

const ResultsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={styles['beer-section']}
      style={{ gridTemplateColumns: '1fr 1fr' }}
    >
      {children}
    </div>
  );
};

export default ResultsLayout;
