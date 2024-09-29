import React from "react";
import { useSelector } from "../../services/hooks";
import {
  selectCartItems,
  selectTotalAmount,
} from "../../slices/cartSlice";
import { Button, Empty, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { BreadCrumb } from "../../components/ui/bread-crumb";
import { ProductCard } from "../../components/product-card";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);

  return (
    <div>
      <BreadCrumb titles={[{ name: "Корзина" }]} />
      {cartItems.length === 0 ? (
        <Empty
          description={
            <Typography.Text>
              Корзина пуста,{" "}
              <Link to="/">вернуться на главную</Link>
            </Typography.Text>
          }
        />
      ) : (
        <div>
          {cartItems.map((item) => (
            <ProductCard key={item.id} product={item} rowDirection />
          ))}
          <h3>Итого: {totalAmount} руб.</h3>
          <Button
            type="primary"
            onClick={() => navigate("/checkout")}
          >
            Оформить заказ
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
