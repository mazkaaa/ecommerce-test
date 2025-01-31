import { useMemo } from 'react';
import { useProduct } from '../context/product-provider';
import { Card } from '../reusable';
import { IProductResponse } from '../type';
import { Button } from '../ui/button';
import { ShoppingBasket } from 'lucide-react';

interface PROPS {
  product: IProductResponse;
  onClick?: (product: IProductResponse) => void;
}
export const ProductCard = (props: PROPS) => {
  const { addItem, removeItem, storage } = useProduct();

  const defineButton = useMemo(() => {
    if (storage.some((item) => item.id === props.product.id)) {
      return (
        <Button
          onClick={() => {
            removeItem(props.product.id);
          }}
          className='w-full'
          variant='destructive'
        >
          <ShoppingBasket />
          Remove from cart
        </Button>
      );
    }
    return (
      <Button
        onClick={() => {
          addItem(props.product);
        }}
        className='w-full'
        variant='secondary'
      >
        <ShoppingBasket />
        Add to cart
      </Button>
    );
  }, [addItem, props.product, removeItem, storage]);

  return (
    <Card>
      <section className='h-48 max-h-48'>
        <img
          src={props.product.image}
          alt={props.product.title}
          className='size-full rounded-lg object-contain'
        />
      </section>
      <section className='space-y-2'>
        <h2 className='truncate text-sm font-semibold text-foreground'>
          {props.product.title}
        </h2>
        <section className='text-muted-foreground'>
          <p className='text-sm font-medium'>Price: ${props.product.price}</p>
          <p className='text-sm font-medium'>
            Rating: {props.product.rating}/5
          </p>
        </section>
      </section>
      <section className='flex flex-row space-x-2'>
        <Button
          onClick={() => {
            if (props.onClick) {
              props.onClick(props.product);
            }
          }}
          variant='outline'
        >
          View Detail
        </Button>
        {defineButton}
      </section>
    </Card>
  );
};
