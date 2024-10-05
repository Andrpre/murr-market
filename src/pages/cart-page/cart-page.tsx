import React from "react";
import { useSelector } from "../../services/hooks";
import {
  selectCartItems,
  selectTotalAmount,
  selectTotalDiscount,
} from "../../slices/cartSlice";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "../../components/ui/bread-crumb";
import { ProductCard } from "../../components/product-card";
import styles from "./style.module.scss";
import { EmptyView } from "../../components/ui/empty-view";

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalDiscount = useSelector(selectTotalDiscount);

  const hasTotalSale = totalDiscount > 0;

  return (
    <>
      <BreadCrumb titles={[{ name: "Корзина" }]} />
      {cartItems.length === 0 ? (
        <EmptyView
          title="Ваша корзина пуста"
          button={{ display: true, text: "За покупками" }}
        />
      ) : (
        <div className={styles.cart}>
          <div className={styles.cart__item}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles["cart__item-shell"]}>
                <ProductCard product={item} rowDirection />
              </div>
            ))}
          </div>
          <div className={styles["cart__trade-offer"]}>
            <div className={styles["cart__trade-offer__price"]}>
              {hasTotalSale && (
                <h4 style={{ color: "var(--important-color)" }}>
                  Скидка: {totalDiscount}€
                </h4>
              )}
              <h3>Итого: {totalAmount}€</h3>
            </div>
            <Button
              type="primary"
              onClick={() => navigate("/checkout")}
              className={styles["cart__trade-offer__button"]}
            >
              Перейти к оформлению
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
