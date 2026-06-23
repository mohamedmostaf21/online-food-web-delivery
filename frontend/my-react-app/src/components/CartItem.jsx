import { useTranslation } from 'react-i18next';
import { Trash2, Plus, Minus } from 'lucide-react';
import useStore from '../store/useStore';
import '../styles/CartItem.css';

export default function CartItem({ item }) {
  const { t } = useStore((state) => state.language === 'ar' ? item.nameAr : item.name);
  const { removeFromCart, updateCartQuantity } = useStore();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      updateCartQuantity(item._id, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} />
      <div className="item-details">
        <h4>{item.name}</h4>
        <p>${item.price}</p>
      </div>
      <div className="quantity-control">
        <button onClick={() => handleQuantityChange(item.quantity - 1)}>
          <Minus size={18} />
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => handleQuantityChange(item.quantity + 1)}>
          <Plus size={18} />
        </button>
      </div>
      <div className="item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      <button 
        className="btn-remove"
        onClick={() => removeFromCart(item._id)}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
