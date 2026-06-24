import create from 'zustand';

const useStore = create((set) => ({
  // Auth state
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  
  setUser: (user) => {
    set((state) => {
      if (user) {
        // Save current cart to backup for this user on login
        const userEmail = user.email;
        const currentCart = state.cart;
        
        // Try to restore cart from backup if exists
        const backupCart = localStorage.getItem(`cart_backup_${userEmail}`);
        const cartToUse = backupCart ? JSON.parse(backupCart) : currentCart;
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('cart', JSON.stringify(cartToUse));
        
        return { user, cart: cartToUse };
      } else {
        // User is logging out - save current cart to backup and clear active cart
        const previousUser = state.user;
        if (previousUser) {
          localStorage.setItem(`cart_backup_${previousUser.email}`, JSON.stringify(state.cart));
        }
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        return { user: null, cart: [] };
      }
    });
  },
  
  setToken: (token) => {
    set({ token });
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },

  // Cart state
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item._id === product._id);
    let newCart;
    if (existingItem) {
      newCart = state.cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...state.cart, { ...product, quantity: 1 }];
    }
    localStorage.setItem('cart', JSON.stringify(newCart));
    return { cart: newCart };
  }),

  removeFromCart: (productId) => set((state) => {
    const newCart = state.cart.filter(item => item._id !== productId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    return { cart: newCart };
  }),

  updateCartQuantity: (productId, quantity) => set((state) => {
    let newCart;
    if (quantity <= 0) {
      newCart = state.cart.filter(item => item._id !== productId);
    } else {
      newCart = state.cart.map(item =>
        item._id === productId ? { ...item, quantity } : item
      );
    }
    localStorage.setItem('cart', JSON.stringify(newCart));
    return { cart: newCart };
  }),

  clearCart: () => set(() => {
    localStorage.removeItem('cart');
    return { cart: [] };
  }),

  // Language state
  language: localStorage.getItem('language') || 'en',
  
  setLanguage: (lang) => {
    set({ language: lang });
    localStorage.setItem('language', lang);
  },
}));

export default useStore;
