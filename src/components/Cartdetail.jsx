/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Simpan ke localStorage setiap kali cart berubah
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const exists = cartItems.find(item => item.id === product.id);
    if (exists) {
      // update quantity
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, newQuantity) => {
  if (newQuantity < 1) return; // jangan biarkan 0

  setCartItems(prevItems =>
    prevItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
  );
};

const removeFromCart = (id) => {
  setCartItems(prevItems => prevItems.filter(item => item.id !== id));
};

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, updateQuantity, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);


