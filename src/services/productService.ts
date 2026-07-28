//Ürünlerle ilgili istekleri gerçekleştirir.
import api from './api'; //api.ts içinde hazırladığımız Axios nesnesini bu dosyaya alırız.

export type Product = {
  // apiden gelen ürünü anlatıyor
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};
//API’den ürün listesini getiren asenkron fonksiyondur.
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
