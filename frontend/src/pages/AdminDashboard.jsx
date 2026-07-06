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
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('adminActiveTab') || 'dashboard';
    });
    const [showProductForm, setShowProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const inventorySectionRef = useRef(null);
    const productsEndRef = useRef(null);
    const scrollAfterLoadRef = useRef(false);
    const updatedProductIdRef = useRef(null);
    const [message, setMessage] = useState({ type: '', text: '' });
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

    useEffect(() => {
        localStorage.setItem('adminActiveTab', activeTab);
    }, [activeTab]);

    const scrollToInventoryForm = () => {
        requestAnimationFrame(() => {
            inventorySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleAddProduct = async () => {
        if (!formData.name || !formData.price) {
            showMessage('error', t('required_fields'));
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
        try {
            await adminAPI.deleteProduct(productId);
            showMessage('success', t('product_deleted'));
            loadDashboard();
        } catch (error) {
            showMessage('error', error?.response?.data?.message || t('error_deleting_product'));
            console.error('Error deleting product:', error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            console.log('AdminDashboard: delete order requested', {
                target: orderId,
                token: localStorage.getItem('token'),
                url: (import.meta.env.VITE_API_URL || '') + `/admin/orders/${orderId}`,
            });
            await adminAPI.deleteOrder(orderId);
            showMessage('success', t('order_deleted'));
            loadDashboard();
        } catch (error) {
            console.error('Error deleting order - response data:', error?.response?.data, error);
            showMessage('error', error?.response?.data?.message || t('error_deleting_order'));
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            console.log('AdminDashboard: delete user requested', {
                target: userId,
                token: localStorage.getItem('token'),
                url: (import.meta.env.VITE_API_URL || '') + `/admin/users/${userId}`,
            });
            await adminAPI.deleteUser(userId);
            showMessage('success', t('user_deleted'));
            loadDashboard();
        } catch (error) {
            console.error('Error deleting user - response data:', error?.response?.data, error);
            showMessage('error', error?.response?.data?.message || t('error_deleting_user'));
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
            {message.text && (
                <div className={`message-toast message-${message.type}`}>
                    {message.type === 'success' && '✓ '}
                    {message.type === 'error' && '✗ '}
                    {message.text}
                </div>
            )}
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
                                <th>{t('action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td data-label={t('order_id')}>{order._id.substring(0, 8)}</td>
                                    <td data-label={t('customer')}>{order.userId?.name}</td>
                                    <td data-label={t('total')}>${order.totalAmount}</td>
                                    <td data-label={t('status')}><span className="status-badge">{order.orderStatus}</span></td>
                                    <td data-label={t('payment')}>{order.paymentMethod}</td>
                                    <td data-label={t('action')}>
                                        <button className="btn-delete" onClick={() => handleDeleteOrder(order._id)}>
                                            <Trash2 size={16} /> {t('delete')}
                                        </button>
                                    </td>
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
                                <div className="form-group">
                                    <label>{t('product_name_en')}</label>
                                    <input
                                        type="text"
                                        placeholder={t('product_name_en')}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{t('product_name_ar')}</label>
                                    <input
                                        type="text"
                                        placeholder={t('product_name_ar')}
                                        value={formData.nameAr}
                                        onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{t('price')}</label>
                                    <input
                                        type="number"
                                        placeholder={t('price')}
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{t('preparation_time')}</label>
                                    <input
                                        type="text"
                                        placeholder={t('preparation_time')}
                                        value={formData.preparationTime}
                                        onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{t('description_en')}</label>
                                    <input
                                        type="text"
                                        placeholder={t('description_en')}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{t('description_ar')}</label>
                                    <input
                                        type="text"
                                        placeholder={t('description_ar')}
                                        value={formData.descriptionAr}
                                        onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{t('image_url')}</label>
                                    <input
                                        type="text"
                                        placeholder={t('image_url')}
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{t('product_category')}</label>
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
                                </div>
                                <div className="form-group">
                                    <label>{t('rating')}</label>
                                    <input
                                        type="number"
                                        placeholder={t('rating')}
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                    />
                                </div>
                                <div className="form-group checkbox-group">
                                    <label>{t('available')}</label>
                                    <div className="checkbox full-width-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={formData.availability}
                                            onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                                        />
                                    </div>
                                </div>
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
                                        <td data-label={t('product_name')}>{product.name}</td>
                                        <td data-label={t('price')}>${product.price}</td>
                                        <td data-label={t('available')}><span className={`availability-badge ${product.availability ? 'available' : 'unavailable'}`}>
                                            {product.availability ? t('in_stock') : t('out_of_stock')}
                                        </span></td>
                                        <td data-label={t('prep_time')}>{product.preparationTime} {t('min')}</td>
                                        <td data-label={t('rating')}>⭐ {product.rating || 'N/A'}</td>
                                        <td data-label={t('action')}>
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
                                    <th>{t('action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id}>
                                        <td data-label={t('name')}>
                                            <div className="cell-scroll" title={u.name}>{u.name}</div>
                                        </td>
                                        <td data-label={t('email')}>
                                            <div className="cell-scroll" title={u.email}>{u.email}</div>
                                        </td>
                                        <td data-label={t('phone_number')}>{u.phone || 'N/A'}</td>
                                        <td data-label={t('role')}><span className={`role-badge ${u.role}`}>{u.role}</span></td>
                                        <td data-label={t('joined')}>{new Date(u.createdAt).toLocaleDateString()}</td>
                                        <td data-label={t('action')}>
                                            <button className="btn-delete" onClick={() => handleDeleteUser(u._id)}>
                                                <Trash2 size={16} /> {t('delete')}
                                            </button>
                                        </td>
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
