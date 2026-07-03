import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <p>{t('footer_text', { year })}</p>
    </footer>
  );
};

export default Footer;
