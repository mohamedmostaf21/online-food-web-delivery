import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { ShoppingCart, Menu, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import '../styles/Navbar.css';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, token, cart, language, setLanguage, setUser, setToken } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    navigate('/');
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🍕 {t('app_title')}
        </Link>
        
        <div className="nav-menu">
          <Link to="/" className="nav-link">{t('home')}</Link>
          <Link to="/menu" className="nav-link">{t('menu')}</Link>
          
          {token && (
            <>
              <Link to="/orders" className="nav-link">{t('my_orders')}</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="nav-link admin-link">
                  <LayoutDashboard size={20} /> {t('admin')}
                </Link>
              )}
            </>
          )}
        </div>

        <div className="nav-actions">
          <button className="lang-btn" onClick={toggleLanguage}>
            {language === 'en' ? 'عربي' : 'English'}
          </button>

          {token ? (
            <div className="user-menu">
              <Link to="/profile" className="profile-link">
                {user?.name}
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn-link">{t('login')}</Link>
              <Link to="/register" className="btn-link btn-primary">{t('register')}</Link>
            </div>
          )}

          <Link to="/cart" className="cart-link">
            <ShoppingCart size={24} />
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
