import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Link
        to={'/'}
        className="footer-logo"
      >
        <h1>- Beer academy -</h1>
      </Link>
      <ul className="contacts-list">
        <li className="contact-item">
          <a href="https://github.com">
            <i className="bi bi-github"></i>
            GitHub
          </a>
        </li>
        <li className="contact-item">
          <a href="https://t.me">
            <i className="bi bi-telegram"></i>
            Telegram
          </a>
        </li>
        <li className="contact-item">
          <a href="mailto:example@example.com">
            <i className="bi bi-envelope"></i>
            Email
          </a>
        </li>
        <li className="contact-item">
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
