import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';
import '../styles/Menu.css';

export default function Menu() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['appetizers', 'mains', 'desserts', 'beverages', 'sides'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const url = selectedCategory 
        ? `http://localhost:5000/api/products/category/${selectedCategory}`
        : 'http://localhost:5000/api/products';
      
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  if (loading) return (
    <div className="menu-container loading-state">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>{t('loading')}</p>
      </div>
    </div>
  );

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2>🍽️ {t('menu')}</h2>
        <p className="menu-subtitle">{t('explore_delicious_selection')}</p>
      </div>
      
      <div className="categories">
        <div className="categories-header">
          <h3>🏷️ {t('filter_by_category')}</h3>
          <span className="category-divider"></span>
        </div>
        <div className="category-buttons">
          {categories.map((category, idx) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
              style={{'--delay': `${idx * 0.1}s`}}
            >
              {t(`category.${category}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="products-section">
        <div className="products-grid">
          {products.length > 0 ? (
            products.map((product, idx) => (
              <div key={product._id} className="product-wrapper" style={{'--index': idx}}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="no-products">😕 {t('no_products_found')}</div>
          )}
        </div>
      </div>
    </div>
  );
}
