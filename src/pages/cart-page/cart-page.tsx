import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useSelector } from "../../services/hooks";
import {
  selectCartItems,
  selectTotalAmount,
  selectTotalDiscount,
} from "../../slices/cartSlice";

import { BreadCrumb } from "../../components/ui/bread-crumb";
import { ProductCard } from "../../components/product-card";
import { EmptyView } from "../../components/ui/empty-view";
import styles from "./style.module.scss";

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalDiscount = useSelector(selectTotalDiscount);

  const renderEmptyView = () => (
    <EmptyView
      title="Ваша корзина пуста"
      button={{ display: true, text: "За покупками" }}
    />
  );

  const renderCartItems = () => (
    <section className={styles.cart}>
      <ul className={styles.cart__item}>
        {cartItems.map((item) => (
          <li
            key={item.id}
            className={styles["cart__item-shell"]}
          >
            <ProductCard product={item} rowDirection />
          </li>
        ))}
      </ul>
      <aside className={styles["cart__trade-offer"]}>
        <div className={styles["cart__trade-offer__price"]}>
          {totalDiscount > 0 && (
            <h4
              className={
                styles["cart__trade-offer__price_discount"]
              }
            >
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
      </aside>
    </section>
  );

  return (
    <>
      <Helmet>
        <title>Корзина | Murr Market</title>
      </Helmet>
      <BreadCrumb titles={[{ name: "Корзина" }]} />
      {cartItems.length === 0
        ? renderEmptyView()
        : renderCartItems()}
    </>
  );
};
