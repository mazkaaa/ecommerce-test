import { createContext, useContext, useEffect, useState } from 'react';

interface IContext {
  addItem: (item: IProductResponse) => void;
  removeItem: (id: number) => void;
  storage: IProductResponse[];
}

const context = createContext<IContext>({
  addItem: () => {},
  removeItem: () => {},
  storage: []
} as IContext);

import { ReactNode } from 'react';
import { IProductResponse } from '../type';

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [storage, setStorage] = useState<IProductResponse[]>([]);

  const addItem = (item: IProductResponse) => {
    setStorage((prev) => [...prev, item]);
    localStorage.setItem('products', JSON.stringify([...storage, item]));
  };

  const removeItem = (id: number) => {
    setStorage((prev) => prev.filter((item) => item.id !== id));
    localStorage.setItem(
      'products',
      JSON.stringify(storage.filter((item) => item.id !== id))
    );
  };

  useEffect(() => {
    const localStorageData = localStorage.getItem('products');
    if (localStorageData) {
      setStorage(JSON.parse(localStorageData));
    } else {
      setStorage([]);
    }
  }, []);

  return (
    <context.Provider
      value={{
        addItem,
        removeItem,
        storage
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useProduct = () => useContext(context);
