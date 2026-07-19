import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useStore from '../store/useStore';
import '../styles/Deal.css';

const promoImageUrl = 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80';

const dealProduct = {
  _id: 'special-burger-deal',
  name: 'Special Burger Deal',
  nameAr: 'عرض البرجر الخاص',
  description: 'Premium burger with fresh ingredients and a special discount.',
  descriptionAr: 'برجر فاخر مع مكونات طازجة وخصم خاص.',
  price: 12.5,
  image: promoImageUrl,
  preparationTime: 17,
  availability: true,
  rating: 4.7,
};

export default function Deal() {
  const { t } = useTranslation();
  const addToCart = useStore((state) => state.addToCart);
  const token = useStore((state) => state.token);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    let timer;
    if (showMessage || showLoginMessage) {
      timer = setTimeout(() => {
        setShowMessage(false);
        setShowLoginMessage(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showMessage, showLoginMessage]);

  const handleAddToCart = () => {
    if (!token) {
      setShowLoginMessage(true);
      return;
    }
    addToCart(dealProduct);
    setShowMessage(true);
  };

  return (
    <section className="deal-page">
      <div className="deal-card">
        <div className="sale-ribbon">{t('sale_50')}</div>
        <img src={promoImageUrl} alt={t('special_burger_deal_title')} />
        <div className="deal-body">
          <h1>{t('special_burger_deal_title')}</h1>
          <br />
          <p>{t('special_burger_deal_desc')}</p>
          <div className="deal-actions">
            {token ? (
              <button
                type="button"
                className="btn-add-cart"
                onClick={handleAddToCart}
              >
                {t('add_to_cart')}
              </button>
            ) : (
              <button
                type="button"
                className="btn-add-cart-disabled"
                onClick={handleAddToCart}
                disabled
              >
                {t('add_to_cart')}
              </button>
            )}
            <button type="button" className="btn-offer-secondary" onClick={() => navigate('/')}>{t('back_to_home')}</button>
          </div>
          {showMessage && <div className="cart-message">Added to cart!</div>}
          {showLoginMessage && <div className="login-message">Please login to add to cart.</div>}
        </div>
      </div>
    </section>
  );
}
