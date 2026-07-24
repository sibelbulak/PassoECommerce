import api from './api';

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};

export const getProducts = async () => {
  const response = await api.get<Product[]>('/products', {
    params: {
      offset: 0,
      limit: 10,
    },
  });

  return response.data;
};

export const getProductById = async (productId: number) => {
  const response = await api.get<Product>(`/products/${productId}`);

  return response.data;
};
