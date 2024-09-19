import React from 'react';
import { Button } from 'antd';
import { useDispatch } from '../../services/hooks';
import { removeItemFromCart } from '../../slices/cartSlice';
import { CartItemProps } from './type';

export const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h3>{item.name}</h3>
      <p>Количество: {item.quantity}</p>
      <p>Цена: {item.price * item.quantity} руб.</p>
      <Button onClick={() => dispatch(removeItemFromCart(item.id))}>
        Удалить
      </Button>
    </div>
  );
};
