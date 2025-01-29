import { cn } from '@/lib/utils';

interface PROPS {
  children?: React.ReactNode;
  className?: string;
}
export const Card = (props: PROPS) => {
  return (
    <div
      className={cn(
        'space-y-4 rounded-lg border bg-card p-3 text-card-foreground shadow-sm',
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
