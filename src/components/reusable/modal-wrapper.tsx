import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';

interface PROPS {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  setOpen?: (value: boolean) => void;
}
export const ModalWrapper = (props: PROPS) => {
  return (
    <Dialog onOpenChange={props.setOpen} open={props.isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <div>{props.children}</div>
      </DialogContent>
    </Dialog>
  );
};
