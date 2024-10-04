import React from "react";
import { useSelector } from "../../services/hooks";
import { selectCartItems, selectTotalAmount } from "../../slices/cartSlice";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "../../components/ui/bread-crumb";
import { ProductCard } from "../../components/product-card";
import styles from "./style.module.scss";
import { EmptyView } from "../../components/ui/empty-view";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);

  return (
    <div>
      <BreadCrumb titles={[{ name: "Корзина" }]} />
      {cartItems.length === 0 ? (
        <EmptyView
          title="Ваша корзина пуста"
          button={{ display: true, text: "За покупками" }}
        />
      ) : (
        <div className={styles.cart}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles["cart__product-shell"]}>
              <ProductCard product={item} rowDirection />
            </div>
          ))}
          <h3>Итого: {totalAmount}€</h3>
          <Button type="primary" onClick={() => navigate("/checkout")}>
            Оформить заказ
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
