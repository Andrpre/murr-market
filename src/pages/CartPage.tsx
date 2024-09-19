import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectCartItems, selectTotalAmount } from '../features/cart/cartSlice';
import CartItemComponent from '../components/CartItem';

const CartPage: React.FC = () => {
  const cartItems = useAppSelector(selectCartItems);
  const totalAmount = useAppSelector(selectTotalAmount);

  return (
    <div>
      <h2>Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <CartItemComponent key={item.id} item={item} />
          ))}
          <h3>Итого: {totalAmount} руб.</h3>
        </div>
      )}
    </div>
  );
};

export default CartPage;
