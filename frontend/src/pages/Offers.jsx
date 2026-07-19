import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/Home.css';

export default function Offers() {
  const { t } = useTranslation();
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.replace('#', ''));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
    <div className="offers-page">
      <section className="offers-hero">
        <div className="offers-hero-copy">
          <h1>{t('offers_coming_soon')}</h1>
          <p>{t('offers_coming_soon_description')}</p>
          <Link to="/" className="btn-primary btn-hero">
            {t('back_to_home')}
          </Link>
        </div>
      </section>
      <div id="offers-end" className="offers-end-anchor" />
    </div>
  );
}
