import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/api';
import useStore from '../store/useStore';
import '../styles/Auth.css';

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser, setToken } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.register(formData);
      setToken(response.data.token);
      setUser(response.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{t('register')}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={t('name')}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t('email')}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder={t('password')}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder={t('phone')}
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder={t('address')}
            value={formData.address}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? t('loading') : t('register')}
          </button>
        </form>
        <p>
          {t('login')}? <a href="/login">{t('login')}</a>
        </p>
      </div>
    </div>
  );
}
