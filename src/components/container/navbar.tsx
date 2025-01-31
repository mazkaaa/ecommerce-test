import { ShoppingBasket } from 'lucide-react';
import { useProduct } from '../context/product-provider';
import { useMemo } from 'react';

export const Navbar = () => {
  const { storage } = useProduct();

  const defineTotalPrice = useMemo(() => {
    return storage.reduce((acc, item) => acc + parseFloat(item.price), 0);
  }, [storage]);

  return (
    <header className='fixed top-0 flex w-full items-center justify-between border-b bg-background px-6 py-4 drop-shadow-sm'>
      <section>
        <h1 className='text-2xl font-bold'>Ecom.</h1>
      </section>
      <section>
        <div className='flex items-center space-x-2'>
          <div className='relative'>
            <ShoppingBasket size={26} />
            <div className='absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-xs text-background'>
              {storage.length}
            </div>
          </div>
          <span className='tabular-nums text-foreground'>
            ${defineTotalPrice.toFixed(2)}
          </span>
        </div>
      </section>
    </header>
  );
};
