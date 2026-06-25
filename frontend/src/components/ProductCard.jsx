import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import '../styles/ProductCard.css';

export default function ProductCard({ product }) {
  const { t } = useTranslation();
  const { addToCart, token } = useStore();
  const language = useStore((state) => state.language);
  const navigate = useNavigate();
  const productName = language === 'ar' ? product.nameAr : product.name;
  const productDesc = language === 'ar' ? product.descriptionAr : product.description;
  const [showMessage, setShowMessage] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handleAddToCart = () => {
    if (!token) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 2000);
      return;
    }
    addToCart(product);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div className="product-card">
      {showMessage && (
        <div className="cart-message">
          ✓ {t('add_to_cart')} - {productName}
        </div>
      )}
      {showLoginMessage && (
        <div className="login-message">
          🔒 {t('login_required')}
        </div>
      )}
      <div className="product-image">
        <img src={product.image || 'https://via.placeholder.com/200'} alt={productName} />
        {product.rating && (
          <div className="product-rating">
            ⭐ {product.rating}
          </div>
        )}
      </div>
      <div className="product-info">
        <div className="product-header">
          <h3>{productName}</h3>
          {product.preparationTime && (
            <span className="prep-time">⏱️ {product.preparationTime} min</span>
          )}
        </div>
        <p className="product-desc">{productDesc}</p>
        <div className="product-meta">
          {product.availability && (
            <span className="availability">✓ {t('available')}</span>
          )}
        </div>
        <div className="product-footer">
          <span className="price">${product.price.toFixed(2)}</span>
          {product.availability ? (
            token ? (
              <button 
                className="btn-add-cart"
                onClick={handleAddToCart}
              >
                {t('add_to_cart')}
              </button>
            ) : (
              <button 
                className="btn-add-cart-disabled"
                onClick={handleAddToCart}
                title={t('login_required') || 'Please login or register to add items to cart'}
              >
                {t('add_to_cart')}
              </button>
            )
          ) : (
            <button className="btn-unavailable" disabled>
              {t('not_available')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
