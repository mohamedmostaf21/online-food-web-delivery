import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import useStore from '../store/useStore';
import { ShoppingCart, Menu, X, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import '../styles/Navbar.css';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const { user, token, cart, language, setLanguage, setUser, setToken } = useStore();
    const navigate = useNavigate();
    const [key, setKey] = React.useState(0);
    const [menuOpen, setMenuOpen] = React.useState(false);

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        setMenuOpen(false);
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'ar' : 'en';
        setLanguage(newLang);

        // Set direction immediately
        const dir = newLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.dir = dir;
        document.body.dir = dir;
        document.documentElement.lang = newLang;

        // Change i18n language
        i18n.changeLanguage(newLang);

        // Force re-render
        setKey(prev => prev + 1);
        closeMenu();
    };

    return (
        <nav className="navbar">
            <div className={`navbar-container ${menuOpen ? 'menu-open' : ''}`}>
                <Link to="/" className="navbar-logo">
                    🍕 {t('app_title')}
                </Link>

                <button
                    type="button"
                    className="mobile-menu-btn"
                    onClick={toggleMenu}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>

                <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                    <Link to="/" className="nav-link" onClick={closeMenu}>{t('home')}</Link>
                    <Link to="/menu" className="nav-link" onClick={closeMenu}>{t('menu')}</Link>

                    {token && (
                        <>
                            <Link to="/orders" className="nav-link" onClick={closeMenu}>{t('my_orders')}</Link>
                            {user?.role === 'admin' && (
                                <Link to="/admin" className="nav-link admin-link" onClick={closeMenu}>
                                    <LayoutDashboard size={20} /> {t('admin')}
                                </Link>
                            )}
                        </>
                    )}
                </div>

                <div className="nav-actions">
                    {token ? (
                        <div className="user-menu">
                            <Link to="/profile" className="profile-link" onClick={closeMenu}>
                                {user?.name}
                            </Link>
                            <button onClick={handleLogout} className="logout-btn">
                                <LogOut size={20} />
                            </button>
                        </div>

                    ) : (
                        <div className="auth-links">
                            <Link to="/login" className="btn-link" onClick={closeMenu}>{t('login')}</Link>
                            <Link to="/register" className="btn-link btn-primary" onClick={closeMenu}>{t('register')}</Link>
                        </div>
                    )}

                    <button className="lang-btn" onClick={toggleLanguage}>
                        {language === 'en' ? 'عربي' : 'English'}
                    </button>

                    <Link to="/cart" className="cart-link" onClick={closeMenu}>
                        <ShoppingCart size={24} />
                        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
