import React, { createContext, useContext, useState } from 'react';

type LoadingContextValue = {
  //Global loading sisteminin sunacağı bilgileri tanımlıyor.
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

const LoadingContext = createContext<LoadingContextValue | undefined>(
  //Ortak paylaşım alanını oluşturuyor.
  undefined,
);

type LoadingProviderProps = {
  //Ortak paylaşım alanını oluşturuyor.
  children: React.ReactNode;
};

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  //Global loading state’ini oluşturur. Başlangıçta false, yani loader kapalıdır.
  const [isLoading, setIsLoading] = useState(false);
  
  //Loader’ı açar.
  const showLoading = () => {
    setIsLoading(true);
  };

  //Loader’ı kapatır.
  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider //Bu üç bilgiyi alt componentlere açar:
      value={{
        isLoading,
        showLoading,
        hideLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading, LoadingProvider içinde kullanılmalıdır.');
  }

  return context;
};
