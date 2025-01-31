import { useCallback, useEffect, useState } from 'react';
import { IProductResponse } from '../type';
import { APIService } from '../service';
import { ProductCard } from './product-card';
import { Button } from '../ui/button';
import { SelectWrapper } from '../reusable';
import { ProductDetailModal } from './product-detail-modal';

export const MainContentPage = () => {
  const [products, setProducts] = useState<IProductResponse[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);

  const [selectedProduct, setSelectedProduct] = useState<{
    isOpen: boolean;
    product: IProductResponse;
  }>({
    isOpen: false,
    product: {} as IProductResponse
  });

  const [filter, setFilter] = useState<{
    category: 'all' | string;
    price: 'asc' | 'desc' | 'all';
    rating: 'asc' | 'desc' | 'all';
  }>({
    category: 'all',
    price: 'all',
    rating: 'all'
  });

  const fetchProducts = useCallback(async () => {
    setIsFetchLoading(true);
    try {
      const data = await APIService.getProducts({
        limit,
        category: filter.category === 'all' ? undefined : filter.category
      });
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchLoading(false);
    }
  }, [filter.category, limit]);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await APIService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <main className='container mx-auto space-y-6 px-6 pb-6 pt-24'>
      <section className='space-y-6'>
        <div className='grid grid-cols-4 gap-4 md:grid-cols-12'>
          <div className='col-span-2 flex flex-col space-y-2 md:col-span-1'>
            <label className='text-sm text-foreground'>Sort by rating</label>
            <SelectWrapper
              options={[
                {
                  label: 'All',
                  value: 'all'
                },
                {
                  label: 'Low to High',
                  value: 'asc'
                },
                {
                  label: 'High to Low',
                  value: 'desc'
                }
              ]}
              className='w-full'
              placeholder='Rating'
              value={filter.rating}
              onChange={(value) => {
                setFilter((prev) => ({
                  ...prev,
                  rating: value as 'asc' | 'desc'
                }));
              }}
            />
          </div>
          <div className='col-span-2 flex flex-col space-y-2 md:col-span-1'>
            <label className='text-sm text-foreground'>Sort by price</label>
            <SelectWrapper
              options={[
                {
                  label: 'All',
                  value: 'all'
                },
                {
                  label: 'Low to High',
                  value: 'asc'
                },
                {
                  label: 'High to Low',
                  value: 'desc'
                }
              ]}
              className='w-full'
              placeholder='Price'
              value={filter.price}
              onChange={(value) => {
                setFilter((prev) => ({
                  ...prev,
                  price: value as 'asc' | 'desc'
                }));
              }}
            />
          </div>
          <div className='col-span-4 flex flex-col space-y-2 md:col-span-2'>
            <label className='text-sm text-foreground'>Sort by category</label>
            <SelectWrapper
              options={[
                {
                  label: 'All',
                  value: 'all'
                },
                ...categories.map((category) => ({
                  label: category,
                  value: category
                }))
              ]}
              className='w-full'
              placeholder='Category'
              value={filter.category}
              onChange={(value) => {
                setFilter((prev) => ({ ...prev, category: value }));
              }}
            />
          </div>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
          {products
            .sort((a, b) => {
              if (filter.price === 'asc') {
                return parseFloat(a.price) - parseFloat(b.price);
              } else if (filter.price === 'desc') {
                return parseFloat(b.price) - parseFloat(a.price);
              } else if (filter.rating === 'asc') {
                return a.rating - b.rating;
              } else if (filter.rating === 'desc') {
                return b.rating - a.rating;
              }
              return 0;
            })
            .map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onClick={(product) => {
                  setSelectedProduct({
                    isOpen: true,
                    product
                  });
                }}
              />
            ))}
        </div>
      </section>
      <section className='md:flex md:justify-center'>
        <Button
          disabled={isFetchLoading}
          onClick={() => {
            setLimit(limit + 10);
          }}
          className='w-full md:w-auto'
        >
          {isFetchLoading ? 'Loading...' : 'Load More'}
        </Button>
      </section>
      <ProductDetailModal
        isOpen={selectedProduct.isOpen}
        setOpen={(value) => {
          setSelectedProduct((prev) => ({ ...prev, isOpen: value }));
        }}
        product={selectedProduct.product}
      />
    </main>
  );
};
