import React, { createContext, useContext, useState } from 'react';

import type { Product } from '../services/productService'; //API’den gelen bir ürünün hangi alanlara sahip olduğunu belirten Product tipini alıyoruz.
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

const StoreContext = createContext<StoreContextValue | undefined>(undefined); //Context’in içinde store bilgileri olabilir veya Provider yoksa değer bulunmayabilir.

type StoreProviderProps = {
  children: React.ReactNode; //children, StoreProvider içine yerleştirilen componentlerdir.
};
//Sepet ve favori bilgilerinin yönetildiği ana componenttir.
export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const isFavorite = (productId: number) => {
    return favoriteProducts.some(product => product.id === productId);
  };
  //Tıklanan ürünü alır.
  const toggleFavorite = (product: Product) => {
    setFavoriteProducts(currentProducts => {
      //Tıklanan ürün zaten favorilerde mi diye kontrol eder.
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
  //Sepet state’i
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  //Eklenecek ürünü ve adet bilgisini alır.
  const addToCart = (product: Product, quantity: number) => {
    setCartItems(currentItems => {
      //Ürün zaten sepette var mı diye find ile arar.
      const existingItem = currentItems.find(
        item => item.product.id === product.id,
      );

      if (existingItem) {
        // ürün sepetteyse bu bölüm açlışır
        return currentItems.map(item =>
          item.product.id === product.id // Şu an incelenen eleman, eklemek istediğimiz ürün mü diye bakar.
            ? {
                ...item,
                //Ürünün diğer bilgilerini korur, yalnızca miktarını artırır.
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      return [
        //Ürün sepette yoksa , Eski sepet elemanları korunur ve yeni ürün sepete eklenir.
        ...currentItems,
        {
          product,
          quantity,
        },
      ];
    });
  };
  //Ürün adedini artırma
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
  //Silinecek ID’ye sahip ürün dışında kalan ürünlerle yeni bir liste oluşturur.
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
//StoreContext içindeki ortak bilgilere ulaşır.
export const useStore = () => {
  const context = useContext(StoreContext);
  //Bir component StoreProvider dışında useStore kullanırsa anlaşılır bir hata verir.
  if (!context) {
    throw new Error('useStore, StoreProvider içinde kullanılmalıdır.');
  }

  return context;
};
