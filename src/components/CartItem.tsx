import React from 'react';
import { Button } from 'antd';
import { CartItem } from '../features/cart/cartSlice';
import { useAppDispatch } from '../app/hooks';
import { removeItemFromCart } from '../features/cart/cartSlice';

interface CartItemProps {
  item: CartItem;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

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

export default CartItemComponent;
