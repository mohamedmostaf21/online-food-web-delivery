import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="footer-logo">🍕 {t('app_title')}</span>
          <p>{t('footer_tagline')}</p>
        </div>

        <div className="footer-links">
          <h3>{t('footer_links_title')}</h3>
          <Link to="/" className="footer-link">{t('home')}</Link>
          <Link to="/menu" className="footer-link">{t('menu')}</Link>
          <Link to="/orders" className="footer-link">{t('my_orders')}</Link>
          <Link to="/cart" className="footer-link">{t('cart')}</Link>
        </div>

        <div className="footer-contact">
          <h3>{t('footer_contact_title')}</h3>
          <p>{t('footer_contact_desc')}</p>
          <a href="mailto:hello@onlinefood.app" className="footer-button">
            {t('footer_contact_button')}
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t('footer_text', { year })}</p>
      </div>
    </footer>
  );
};

export default Footer;
