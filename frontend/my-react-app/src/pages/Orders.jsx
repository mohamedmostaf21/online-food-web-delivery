import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '../store/useStore';
import '../styles/Orders.css';

export default function Orders() {
  const { t } = useTranslation();
  const { token } = useStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/user/my-orders', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const getStatusColor = (status) => {
    const colors = {
      placed: '#FFA500',
      preparing: '#4169E1',
      ready: '#32CD32',
      out_for_delivery: '#1E90FF',
      delivered: '#228B22',
      cancelled: '#DC143C',
    };
    return colors[status] || '#000';
  };

  if (loading) return <div className="orders-container"><p>{t('loading')}</p></div>;

  return (
    <div className="orders-container">
      <h2>🛍️ {t('my_orders')}</h2>
      {orders.length === 0 ? (
        <p>{t('no_orders_found')}</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>📦 #{order._id.substring(0, 8)}</h3>
                <span 
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(order.orderStatus) }}
                >
                  {t(order.orderStatus)}
                </span>
              </div>
              <div className="order-details">
                <p><strong>📅 {t('order_date')}:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>💰 {t('order_total')}:</strong> ${order.totalAmount.toFixed(2)}</p>
                <p><strong>🍽️ {t('order_items')}:</strong> {order.items.length}</p>
                <p><strong>📍 {t('order_delivery')}:</strong> {order.deliveryAddress}</p>
              </div>
              <div className="order-items">
                <div style={{marginBottom: '10px', fontWeight: 'bold', color: '#2c3e50'}}>📋 {t('order_summary')}:</div>
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    🍔 {item.name} × {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
