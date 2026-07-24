import React, { createContext, useContext, useState } from 'react';

import type { Product } from '../services/productService';
export type CartItem = {
  product: Product;
  quantity: number;
};

type StoreContextValue = {
  addToCart: (product: Product, quantity: number) => void;
  favoriteProducts: Product[];
  cartItems: CartItem[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  increaseCartItem: (productId: number) => void;
  decreaseCartItem: (productId: number) => void;
  removeCartItem: (productId: number) => void;
};

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

type StoreProviderProps = {
  children: React.ReactNode;
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const isFavorite = (productId: number) => {
    return favoriteProducts.some(product => product.id === productId);
  };

  const toggleFavorite = (product: Product) => {
    setFavoriteProducts(currentProducts => {
      const productAlreadyFavorite = currentProducts.some(
        favoriteProduct => favoriteProduct.id === product.id,
      );

      if (productAlreadyFavorite) {
        return currentProducts.filter(
          favoriteProduct => favoriteProduct.id !== product.id,
        );
      }

      return [...currentProducts, product];
    });
  };
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const addToCart = (product: Product, quantity: number) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(
        item => item.product.id === product.id,
      );

      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          product,
          quantity,
        },
      ];
    });
  };

  const increaseCartItem = (productId: number) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseCartItem = (productId: number) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  };

  const removeCartItem = (productId: number) => {
    setCartItems(currentItems =>
      currentItems.filter(item => item.product.id !== productId),
    );
  };

  return (
    <StoreContext.Provider
      value={{
        favoriteProducts,
        cartItems,
        toggleFavorite,
        isFavorite,
        addToCart,
        increaseCartItem,
        decreaseCartItem,
        removeCartItem,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore, StoreProvider içinde kullanılmalıdır.');
  }

  return context;
};
