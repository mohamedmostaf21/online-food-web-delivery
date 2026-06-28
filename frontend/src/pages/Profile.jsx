import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '../store/useStore';
import { usersAPI } from '../api/api';
import '../styles/Profile.css';

export default function Profile() {
  const { t } = useTranslation();
  const { user, setUser, token } = useStore();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  useEffect(() => {
    if (!token) return;
    loadUserProfile();
  }, [token]);

  const loadUserProfile = async () => {
    try {
      const response = await usersAPI.getMe();
      setFormData({
        name: response.data.name || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        address: response.data.address || '',
      });
      setLoading(false);
    } catch (error) {
      console.error('Error loading profile:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const response = await usersAPI.updateProfile({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
      });
      setUser(response.data, { preserveCart: true });
      showMessage('success', t('profile_updated_successfully'));
    } catch (error) {
      console.error('Error updating profile:', error);
      showMessage('error', t('error_updating_profile'));
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div>{t('loading')}</div>;

  return (
    <div className="profile-container">
      {message.text && (
        <div className={`message-toast message-${message.type}`}>
          {message.type === 'success' && '✓ '}
          {message.type === 'error' && '✗ '}
          {message.text}
        </div>
      )}

      <h2>{t('edit_profile')}</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          name="name"
          placeholder={t('name')}
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
        />
        <input
          type="email"
          name="email"
          placeholder={t('email')}
          value={formData.email}
          disabled
          autoComplete="email"
        />
        <input
          type="tel"
          name="phone"
          placeholder={t('phone')}
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
        />
        <textarea
          name="address"
          placeholder={t('address')}
          value={formData.address}
          onChange={handleChange}
          rows="3"
          autoComplete="street-address"
        />
        <button type="submit" disabled={updating}>
          {updating ? t('loading') : t('save')}
        </button>
      </form>
    </div>
  );
}
