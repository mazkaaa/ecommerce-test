import { useCallback, useEffect, useState } from 'react';
import { IProductResponse } from '../type';
import { APIService } from '../service';
import { ProductCard } from './product-card';
import { Button } from '../ui/button';

export const MainContentPage = () => {
  const [products, setProducts] = useState<IProductResponse[]>([]);
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);

  const fetchProducts = useCallback(async () => {
    setIsFetchLoading(true);
    try {
      const data = await APIService.getProducts({ limit });
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className='container mx-auto space-y-6 px-6 pb-6 pt-24'>
      <section className='grid grid-cols-1 gap-4'>
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </section>
      <section>
        <Button
          onClick={() => {
            setLimit(limit + 10);
          }}
          className='w-full'
        >
          {isFetchLoading ? 'Loading...' : 'Load More'}
        </Button>
      </section>
    </main>
  );
};
