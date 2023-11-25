import styles from '../styles/Home.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h1 className={styles['footer-logo']}>- Beer academy -</h1>

      <ul className={styles['contacts-list']}>
        <li className={styles['contact-item']}>
          <a href="https://github.com">
            <i className="bi bi-github"></i>
            GitHub
          </a>
        </li>
        <li className={styles['contact-item']}>
          <a href="https://t.me">
            <i className="bi bi-telegram"></i>
            Telegram
          </a>
        </li>
        <li className={styles['contact-item']}>
          <a href="mailto:example@example.com">
            <i className="bi bi-envelope"></i>
            Email
          </a>
        </li>
        <li className={styles['contact-item']}>
          <a href="https://linkedin.com">
            <i className="bi bi-linkedin"></i>
            LinkedIn
          </a>
        </li>
      </ul>
      <h5>Designed and built by Ranynight</h5>
    </footer>
  );
};

export default Footer;
