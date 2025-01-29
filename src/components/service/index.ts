import { IProductResponse } from '../type';

export const APIService = {
  getProducts: async (query: { limit?: number }) => {
    const limit = query.limit ? query.limit : 10;
    const params = new URLSearchParams({ limit: limit.toString() });

    try {
      const response = await fetch(
        'https://fakestoreapi.com/products?' + params.toString(),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.ok) {
        const data: IProductResponse[] = await response.json();
        return data;
      }
      return Promise.reject(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getCategories: async () => {
    try {
      const response = await fetch(
        'https://fakestoreapi.com/products/categories',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.ok) {
        const data: string[] = await response.json();
        return data;
      }
      return Promise.reject(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
