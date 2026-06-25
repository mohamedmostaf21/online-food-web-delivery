import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import useStore from './store/useStore';
import './App.css';

function App() {
  const { token, user } = useStore();
  const { i18n } = useTranslation();

  const ProtectedRoute = ({ element }) => {
    return token ? element : <Navigate to="/login" />;
  };

  const AdminRoute = ({ element }) => {
    return token && user?.role === 'admin' ? element : <Navigate to="/" />;
  };

  // Ensure direction is set whenever language changes
  React.useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.body.dir = dir;
  }, [i18n.language]);

  return (
    <Router>
      <div className={`app ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
