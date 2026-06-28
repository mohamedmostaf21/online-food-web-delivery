import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, Plus, Edit2, BarChart3, Users, Package } from 'lucide-react';
import useStore from '../store/useStore';
import { adminAPI } from '../api/api';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { user, token } = useStore();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const inventorySectionRef = useRef(null);
  const productsEndRef = useRef(null);
  const scrollAfterLoadRef = useRef(false);
  const updatedProductIdRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    price: '',
    image: '',
    category: 'mains',
    categoryAr: '',
    availability: true,
    preparationTime: '',
    rating: '',
  });

  useEffect(() => {
    if (!token || user?.role !== 'admin') return;
    loadDashboard();
  }, [token, user]);

  const scrollToNewProduct = () => {
    requestAnimationFrame(() => {
      if (updatedProductIdRef.current) {
        const targetRow = document.querySelector(`[data-product-id="${updatedProductIdRef.current}"]`);
        if (targetRow) {
          targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
          updatedProductIdRef.current = null;
          return;
        }
      }
      productsEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const loadDashboard = async () => {
    try {
      const [statsRes, ordersRes, productsRes, usersRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getOrders(),
        adminAPI.getProducts(),
        adminAPI.getUsers(),
      ]);
      setStats(statsRes.data);
      setOrders(ordersRes.data);
      setProducts(productsRes.data || []);
      setUsers(usersRes.data || []);
      if (scrollAfterLoadRef.current) {
        scrollAfterLoadRef.current = false;
        scrollToNewProduct();
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToInventoryForm = () => {
    requestAnimationFrame(() => {
      inventorySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleAddProduct = async () => {
    if (!formData.name || !formData.price) {
      alert(t('required_fields'));
      return;
    }
    try {
      if (editingProduct) {
        updatedProductIdRef.current = editingProduct._id;
        scrollAfterLoadRef.current = true;
        await adminAPI.updateProduct(editingProduct._id, formData);
      } else {
        scrollAfterLoadRef.current = true;
        await adminAPI.createProduct(formData);
      }
      setFormData({
        name: '',
        nameAr: '',
        description: '',
        descriptionAr: '',
        price: '',
        image: '',
        category: 'mains',
        categoryAr: '',
        availability: true,
        preparationTime: '',
        rating: '',
      });
      setShowProductForm(!editingProduct);
      setEditingProduct(null);
      loadDashboard();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm(t('confirm_delete'))) {
      try {
        await adminAPI.deleteProduct(productId);
        loadDashboard();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      nameAr: product.nameAr,
      description: product.description,
      descriptionAr: product.descriptionAr,
      price: product.price,
      image: product.image,
      category: product.category || 'mains',
      categoryAr: product.categoryAr || '',
      availability: product.availability,
      preparationTime: product.preparationTime,
      rating: product.rating,
    });
    setShowProductForm(true);
    scrollToInventoryForm();
  };

  if (loading) return <div className="loading">{t('loading')}</div>;

  if (!stats) return <div className="error">{t('error')}</div>;

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
        <button 
          className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          <Package size={18} /> {t('inventory')}
        </button>
        <button 
          className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <BarChart3 size={18} /> {t('reports')}
        </button>
        <button 
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={18} /> {t('users')}
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
                <th>{t('order_id')}</th>
                <th>{t('customer')}</th>
                <th>{t('total')}</th>
                <th>{t('status')}</th>
                <th>{t('payment')}</th>
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

      {activeTab === 'inventory' && (
        <div className="inventory-section" ref={inventorySectionRef}>
          <div className="section-header">
            <h3>{t('manage_products')}</h3>
            <button 
              className="btn-add-product"
              onClick={() => {
                setEditingProduct(null);
                setFormData({
                  name: '',
                  nameAr: '',
                  description: '',
                  descriptionAr: '',
                  price: '',
                  image: '',
                  category: 'mains',
                  categoryAr: '',
                  availability: true,
                  preparationTime: '',
                  rating: '',
                });
                setShowProductForm(true);
                scrollToInventoryForm();
              }}
            >
              <Plus size={18} /> {t('add_product')}
            </button>
          </div>

          {showProductForm && (
            <div className="product-form">
              <h4>{editingProduct ? t('edit_product') : t('add_new_product')}</h4>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder={t('product_name_en')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder={t('product_name_ar')}
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                />
                <input
                  type="number"
                  placeholder={t('price')}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
                <input
                  type="text"
                  placeholder={t('preparation_time')}
                  value={formData.preparationTime}
                  onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                />
                <input
                  type="text"
                  placeholder={t('description_en')}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <input
                  type="text"
                  placeholder={t('description_ar')}
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                />
                <input
                  type="text"
                  placeholder={t('image_url')}
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="appetizers">Appetizers</option>
                  <option value="mains">Mains</option>
                  <option value="desserts">Desserts</option>
                  <option value="beverages">Beverages</option>
                  <option value="sides">Sides</option>
                </select>
                <input
                  type="number"
                  placeholder={t('rating')}
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                />
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                  />
                  {t('available')}
                </label>
              </div>
              <div className="form-buttons">
                <button className="btn-save" onClick={handleAddProduct}>
                  {editingProduct ? t('update_product') : t('add_new')}
                </button>
                <button className="btn-cancel" onClick={() => setShowProductForm(false)}>
                  {t('cancel')}
                </button>
              </div>
            </div>
          )}

          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>{t('product_name')}</th>
                  <th>{t('price')}</th>
                  <th>{t('available')}</th>
                  <th>{t('prep_time')}</th>
                  <th>{t('rating')}</th>
                  <th>{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} data-product-id={product._id}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td><span className={`availability-badge ${product.availability ? 'available' : 'unavailable'}`}>
                      {product.availability ? t('in_stock') : t('out_of_stock')}
                    </span></td>
                    <td>{product.preparationTime} {t('min')}</td>
                    <td>⭐ {product.rating || 'N/A'}</td>
                    <td>
                      <button className="btn-edit" onClick={() => handleEditProduct(product)}>
                        <Edit2 size={16} /> {t('edit')}
                      </button>
                      <button className="btn-delete" onClick={() => handleDeleteProduct(product._id)}>
                        <Trash2 size={16} /> {t('delete')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div ref={productsEndRef} />
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="reports-section">
          <div className="reports-grid">
            <div className="report-card">
              <h4>{t('revenue_report')}</h4>
              <div className="report-content">
                <p>{t('total_revenue')}: <strong>${stats?.totalRevenue || 0}</strong></p>
                <p>{t('total_orders')}: <strong>{stats?.totalOrders || 0}</strong></p>
                <p>{t('avg_order_value')}: <strong>${stats?.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : 0}</strong></p>
              </div>
            </div>
            <div className="report-card">
              <h4>{t('sales_summary')}</h4>
              <div className="report-content">
                <p>{t('total_products')}: <strong>{stats?.totalProducts || 0}</strong></p>
                <p>{t('total_users')}: <strong>{stats?.totalUsers || 0}</strong></p>
                <p>{t('today')}: <strong>{orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString()).length}</strong></p>
              </div>
            </div>
            <div className="report-card">
              <h4>{t('order_status_distribution')}</h4>
              <div className="report-content">
                <p>{t('completed')}: <strong>{orders.filter(o => o.orderStatus === 'delivered').length}</strong></p>
                <p>{t('pending')}: <strong>{orders.filter(o => o.orderStatus === 'preparing').length}</strong></p>
                <p>{t('cancelled')}: <strong>{orders.filter(o => o.orderStatus === 'cancelled').length}</strong></p>
              </div>
            </div>
            <div className="report-card">
              <h4>{t('payment_methods')}</h4>
              <div className="report-content">
                <p>{t('online')}: <strong>{orders.filter(o => o.paymentMethod === 'card').length}</strong></p>
                <p>{t('cash')}: <strong>{orders.filter(o => o.paymentMethod === 'cash').length}</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="users-section">
          <h3>{t('manage_users')}</h3>
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>{t('name')}</th>
                  <th>{t('email')}</th>
                  <th>{t('phone_number')}</th>
                  <th>{t('role')}</th>
                  <th>{t('joined')}</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone || 'N/A'}</td>
                    <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
