import { useTranslation } from 'react-i18next';
import '../styles/Opinion.css';

export default function Opinion() {
  const { t } = useTranslation();

  return (
    <section className="opinion-page">
      <div className="opinion-content">
        <h1>{t('opinion_page_title')}</h1>
        <p>{t('opinion_page_description')}</p>
        <div className="opinion-panel">
          <h2>{t('opinion_future_heading')}</h2>
          <p>{t('opinion_future_text')}</p>
        </div>
      </div>
    </section>
  );
}
