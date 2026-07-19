import { useTranslation } from 'react-i18next';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import React from 'react';
import useStore from '../store/useStore';
import { ShoppingCart, Menu, X, LogOut, Settings, LayoutDashboard, ChefHat } from 'lucide-react';
import '../styles/Navbar.css';
import '../styles/_navbar-mobile-rtl-overrides.css';

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
                <div className="navbar-logo-wrapper">
                    <Link to="/" className="navbar-logo">
                        <ChefHat size={40} className="chef-icon" />
                        {t('app_title')}
                    </Link>
                </div>
                
                <button
                    type="button"
                    className="mobile-menu-btn"
                    onClick={toggleMenu}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                >
                    {menuOpen ? <X size={16} /> : <Menu size={16} />}
                </button>

                <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                    <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={closeMenu}>{t('home')}</NavLink>
                    <NavLink to="/menu" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={closeMenu}>{t('menu')}</NavLink>

                    {token && (
                        <>
                            <NavLink to="/orders" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={closeMenu}>{t('my_orders')}</NavLink>
                            {user?.role === 'admin' && (
                                <NavLink to="/admin" className={({ isActive }) => `nav-link admin-link${isActive ? ' active' : ''}`} onClick={closeMenu}>
                                    <LayoutDashboard size={20} /> {t('admin')}
                                </NavLink>
                            )}
                        </>
                    )}
                </div>

                <div className="nav-actions">
                    {token ? (
                        <div className="user-menu">
                            <Link to="/profile" className="profile-link" onClick={closeMenu}>
                                <span className="profile-avatar">{(user?.name && user.name.charAt(0))?.toUpperCase() || 'U'}</span>
                                <span className="profile-name">{user?.name}</span>
                            </Link>
                            <button onClick={handleLogout} className="logout-btn" title={t('logout')}>
                                <LogOut size={20} />
                            </button>
                        </div>

                    ) : (
                        <div className="auth-links">
                            <Link to="/login" className="btn-link btn-primary" onClick={closeMenu}>{t('login')}</Link>
                            <Link to="/register" className="btn-link" onClick={closeMenu}>{t('register')}</Link>
                        </div>
                    )}

                    <button className="lang-btn" onClick={toggleLanguage}>
                        {language === 'en' ? 'عربي' : 'English'}
                    </button>

                    <Link to="/cart" className="cart-link" onClick={closeMenu}>
                        <ShoppingCart size={20} />
                        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
