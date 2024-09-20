import React from 'react';
import { CartItemProps } from './type';
import { CartCounter } from '../cart-counter';

export const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      <p>Количество: {item.quantity}</p>
      <p>Цена: {item.price * item.quantity} руб.</p>
      <CartCounter product={item} />
    </div>
  );
};
