'use client'

import { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
  ideaId: string;
  title: string;
  price: number;
  image: string[];
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (ideaId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);


  useEffect(() => {
    const savedCart = localStorage.getItem('ideaCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ideaCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    // Only allow one item in cart at a time
    setCart([item]);
  };

  const removeFromCart = (ideaId: string) => {
    setCart(cart.filter(item => item.ideaId !== ideaId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);