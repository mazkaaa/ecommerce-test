import { ModalWrapper } from '../reusable';
import { IProductResponse } from '../type';
import { Button } from '../ui/button';

interface PROPS {
  product: IProductResponse;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}
export const ProductDetailModal = (props: PROPS) => {
  return (
    <ModalWrapper
      title='Product Detail'
      isOpen={props.isOpen}
      setOpen={props.setOpen}
    >
      <div className='space-y-6'>
        <section className='h-48 max-h-48'>
          <img
            src={props.product.image}
            alt={props.product.title}
            className='size-full object-contain'
          />
        </section>
        <section className='space-y-4'>
          <h2 className='text-2xl font-medium text-foreground'>
            {props.product.title}
          </h2>
          <div className='space-y-2 text-sm font-medium text-muted-foreground'>
            <p>{props.product.description}</p>
            <p>Price: ${props.product.price}</p>
            <p>Rating: {props.product.rating}/5</p>
          </div>
        </section>
        <section className='md:flex md:justify-end'>
          <Button
            onClick={() => {
              props.setOpen(false);
            }}
            className='w-full md:w-auto'
          >
            Close
          </Button>
        </section>
      </div>
    </ModalWrapper>
  );
};
