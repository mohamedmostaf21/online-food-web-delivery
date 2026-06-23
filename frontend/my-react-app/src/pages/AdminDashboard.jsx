import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '../store/useStore';
import { adminAPI } from '../api/api';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { user, token } = useStore();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!token || user?.role !== 'admin') return;
    loadDashboard();
  }, [token, user]);

  const loadDashboard = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getOrders(),
      ]);
      setStats(statsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>{t('loading')}</div>;

  if (!stats) return <div>Error loading dashboard</div>;

  return (
    <div className="admin-dashboard">
      <h2>{t('dashboard')}</h2>

      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          {t('statistics')}
        </button>
        <button 
          className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          {t('manage_orders')}
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{t('total_orders')}</h3>
            <p className="stat-value">{stats.totalOrders}</p>
          </div>
          <div className="stat-card">
            <h3>{t('total_revenue')}</h3>
            <p className="stat-value">${stats.totalRevenue}</p>
          </div>
          <div className="stat-card">
            <h3>{t('total_users')}</h3>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>{t('total_products')}</h3>
            <p className="stat-value">{stats.totalProducts}</p>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id.substring(0, 8)}</td>
                  <td>{order.userId?.name}</td>
                  <td>${order.totalAmount}</td>
                  <td><span className="status-badge">{order.orderStatus}</span></td>
                  <td>{order.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
