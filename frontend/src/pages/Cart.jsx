import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, X, Lock, User, Calendar } from 'lucide-react';
import useStore from '../store/useStore';
import CartItem from '../components/CartItem';
import { ordersAPI } from '../api/api';
import '../styles/Cart.css';

export default function Cart() {
  const { t } = useTranslation();
  const { cart, clearCart, user, token } = useStore();
  const [deliveryFee] = useState(5);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [addressChoice, setAddressChoice] = useState('saved');
  const [customAddress, setCustomAddress] = useState('');

  // Payment card details
  const [cardDetails, setCardDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const hasSavedAddress = !!user?.address?.trim();

  const validatePaymentDetails = () => {
    if (!cardDetails.cardName.trim()) {
      showMessage('error', 'Please enter cardholder name');
      return false;
    }
    if (!cardDetails.cardNumber.replace(/\s/g, '')) {
      showMessage('error', 'Please enter card number');
      return false;
    }
    if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
      showMessage('error', 'Card number must be 16 digits');
      return false;
    }
    if (!cardDetails.expiryDate) {
      showMessage('error', 'Please enter expiry date (MM/YY)');
      return false;
    }
    if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
      showMessage('error', 'CVV must be 3 digits');
      return false;
    }
    return true;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const getDeliveryAddress = () => {
    return addressChoice === 'custom'
      ? customAddress.trim()
      : user?.address?.trim();
  };

  const handleCheckout = async () => {
    if (!token) {
      showMessage('error', 'Please login first');
      return;
    }

    if (addressChoice === 'saved' && !hasSavedAddress) {
      showMessage('error', t('no_saved_address_warning'));
      return;
    }

    if (addressChoice === 'custom' && !customAddress.trim()) {
      showMessage('error', t('enter_delivery_address'));
      return;
    }

    if (paymentMethod === 'online') {
      if (!validatePaymentDetails()) {
        return;
      }
    }

    setLoading(true);
    try {
      const response = await ordersAPI.create({
        items: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: Number(total.toFixed(2)),
        paymentMethod,
        deliveryAddress: getDeliveryAddress() || 'Address not provided',
        specialInstructions,
        paymentDetails: paymentMethod === 'online' ? {
          cardLast4: cardDetails.cardNumber.replace(/\s/g, '').slice(-4),
          cardName: cardDetails.cardName.trim(),
        } : null,
      });

      if (response?.status === 201 || response?.status === 200) {
        const order = response.data;
        clearCart();
        setShowPaymentModal(false);
        showMessage('success', `Order placed successfully! Order ID: ${order._id}`);
        setTimeout(() => {
          window.location.href = '/orders';
        }, 2000);
      } else {
        showMessage('error', response?.data?.message || 'Error placing order');
      }
    } catch (error) {
      showMessage('error', error?.response?.data?.message || 'Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">🛒</div>
          <h2>{t('empty_cart')}</h2>
        <p>{t('empty_cart_description')}</p>
          <a href="/menu" className="btn-empty-cart">
            🍕 {t('continue_shopping')}
          </a>
          <div className="empty-cart-decoration"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {message.text && (
        <div className={`message-toast message-${message.type}`}>
          {message.type === 'success' && '✓ '}
          {message.type === 'error' && '✗ '}
          {message.text}
        </div>
      )}

      <h2>🛒 {t('cart')}</h2>
      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        <div className="cart-summary">
        <h3>{t('order_summary')}</h3>
        <div className="summary-row">
          <span>{t('subtotal')}:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>{t('delivery_fee')}:</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="summary-total">
          <span>{t('total')}:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="checkout-section">
          <h3>{t('delivery_address')}</h3>
          <div className="address-options">
            <label className="address-option">
              <input
                type="radio"
                name="addressChoice"
                value="saved"
                checked={addressChoice === 'saved'}
                onChange={() => setAddressChoice('saved')}
              />
              <span>{t('use_saved_address')}</span>
            </label>
            <label className="address-option">
              <input
                type="radio"
                name="addressChoice"
                value="custom"
                checked={addressChoice === 'custom'}
                onChange={() => setAddressChoice('custom')}
              />
              <span>{t('enter_different_address')}</span>
            </label>
          </div>
          {addressChoice === 'saved' ? (
            <div className="saved-address-box">
              {user?.address ? user.address : t('no_saved_address')}
            </div>
          ) : (
            <textarea
              placeholder={t('enter_delivery_address')}
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              rows="3"
            />
          )}

          <h3>{t('payment_method')}</h3>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="cash">{t('cash_on_delivery')}</option>
            <option value="online">{t('online_payment_card')}</option>
          </select>

          <textarea
            placeholder={t('special_instructions')}
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            rows="3"
          />

          <button 
            className="btn-checkout"
            onClick={() => {
              if (paymentMethod === 'online') {
                setShowPaymentModal(true);
              } else {
                handleCheckout();
              }
            }}
            disabled={loading}
          >
            {loading ? t('loading') : t('place_order')}
          </button>
        </div>
      </div>
      </div>

      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <div className="modal-header">
              <div className="header-title">
                <CreditCard size={28} className="header-icon" />
                <h2>{t('payment_details')}</h2>
              </div>
              <button className="close-btn" onClick={() => setShowPaymentModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="payment-form">
                <div className="form-group">
                  <label>
                    <User size={18} className="label-icon" />
                    {t('cardholder_name')}
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    placeholder={t('enter_cardholder_name')}
                    value={cardDetails.cardName}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                    autoComplete="cc-name"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <CreditCard size={18} className="label-icon" />
                    {t('card_number')}
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: formatCardNumber(e.target.value) })}
                    maxLength="19"
                    autoComplete="cc-number"
                  />
                  <small>{t('visa_mastercard_accepted')}</small>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <Lock size={18} className="label-icon" />
                      {t('cvv')}
                    </label>
                    <input
                      type="password"
                      name="cvv"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                      maxLength="3"
                      autoComplete="cc-csc"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <Calendar size={18} className="label-icon" />
                      {t('expiry_date')}
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={cardDetails.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4);
                        }
                        setCardDetails({ ...cardDetails, expiryDate: value });
                      }}
                      maxLength="5"
                      autoComplete="cc-exp"
                    />
                  </div>
                </div>

                <div className="order-amount">
                  <span>{t('amount_to_pay')}:</span>
                  <span className="amount">${total.toFixed(2)}</span>
                </div>

                <div className="modal-actions">
                  <button 
                    className="btn-cancel"
                    onClick={() => setShowPaymentModal(false)}
                  >
                    {t('cancel')}
                  </button>
                  <button 
                    className="btn-pay"
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? t('processing') : `${t('pay')} $${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
