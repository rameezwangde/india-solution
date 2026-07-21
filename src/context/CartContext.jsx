import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleUpdateQuantity = (product, quantity) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (quantity === 0) {
        return prev.filter((item) => item.id !== product.id);
      }
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, selectedQuantity: quantity } : item
        );
      }
      return [...prev, { ...product, selectedQuantity: quantity }];
    });
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.selectedQuantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleUpdateQuantity,
        handleRemoveItem,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
