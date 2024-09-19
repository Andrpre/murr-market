import React from "react";
import { useSelector } from "../services/hooks";
import { selectCartItems, selectTotalAmount } from "../slices/cartSlice";
import { CartItemComponent } from "../components/cart-item";
import { Empty, Typography } from "antd";
import { Link } from "react-router-dom";

const CartPage: React.FC = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);

  return (
    <div>
      <h2>Корзина</h2>
      {cartItems.length === 0 ? (
        <Empty
          description={
            <Typography.Text>
              Корзина пуста, <Link to="/">вернуться на главную</Link>
            </Typography.Text>
          }
        />
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItemComponent key={item.id} item={item} />
          ))}
          <h3>Итого: {totalAmount} руб.</h3>
        </div>
      )}
    </div>
  );
};

export default CartPage;
