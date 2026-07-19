import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setError('');
    setIsLoading(true);

    try {
      // Check if EmailJS credentials are available
      if (!import.meta.env.VITE_EMAILJS_PUBLIC_KEY || !import.meta.env.VITE_EMAILJS_SERVICE_ID || !import.meta.env.VITE_EMAILJS_TEMPLATE_ID) {
        // Simulate successful send for dummy message
        console.log('Simulating message send (EmailJS credentials not configured):', {
          from_name: formData.name,
          from_email: formData.email,
          message: 'رساله وهميه',
          to_email: 'midomostafa1901650@gmail.com',
        });
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: 'رساله وهميه',
            to_email: 'midomostafa1901650@gmail.com',
          }
        );
      }
      setStatus(t('contact_page_success'));
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setError(t('contact_page_error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section className={`contact-page ${i18n && i18n.dir && i18n.dir() === 'rtl' ? 'rtl' : 'ltr'}`}>
      <div className="contact-page-inner">
        <h1>{t('contact_page_title')}</h1>
        <p>{t('contact_page_subtitle')}</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            <span>{t('contact_page_name')}</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('contact_page_name')}
              required
            />
          </label>
          <label>
            <span>{t('contact_page_email')}</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('contact_page_email')}
              required
            />
          </label>
          <label>
            <span>{t('contact_page_message')}</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('contact_page_message')}
              rows="5"
              required
            />
          </label>
          <button type="submit" className="contact-submit" disabled={isLoading}>
            {isLoading ? t('contact_page_sending') || 'جاري الإرسال...' : t('contact_page_send')}
          </button>
          {status && <div className="contact-status success">{status}</div>}
          {error && <div className="contact-status error">{error}</div>}
        </form>
      </div>
    </section>
  );
}
