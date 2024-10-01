import React from "react";
import { useDispatch, useSelector } from "../../../services/hooks";
import { Button } from "antd";
import styles from "./style.module.scss";
import {
  addItemToCart,
  removeItemFromCart,
  selectCartItems,
} from "../../../slices/cartSlice";
import { Product } from "../../../utils/types";

import { ReactComponent as DeleteIcon } from "../../../assets/delete.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/minus.svg";
import { ReactComponent as AddIcon } from "../../../assets/plus.svg";
import { ReactComponent as CartAddIcon } from "../../../assets/cart.svg";
import clsx from "clsx";

export const CartCounter: React.FC<{
  product: Product;
}> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const getProductQuantity = () => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  };

  const quantity = getProductQuantity();

  const blockDefault = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleClickAdd = (e: React.MouseEvent) => {
    blockDefault(e);
    dispatch(addItemToCart(product));
  };
  const handleClickRemove = (e: React.MouseEvent) => {
    blockDefault(e);
    dispatch(removeItemFromCart(product.id));
  };
  return (
    <div className={styles.count}>
      {quantity > 0 && (
        <>
          <Button
            className={clsx(
              styles.count__button,
              styles["count__button-decrement"]
            )}
            onClick={handleClickRemove}
          >
            {quantity === 1 ? (
              <DeleteIcon
                fill="var(--main-text-color)"
                className={"icon_size_small"}
              />
            ) : (
              <RemoveIcon
                fill="var(--main-text-color)"
                className={"icon_size_small"}
              />
            )}
          </Button>
          <div className={styles.count__quantity}>{quantity}</div>
        </>
      )}
      <Button
        className={clsx(
          styles.count__button,
          styles["count__button-increment"]
        )}
        onClick={handleClickAdd}
      >
        {quantity === 0 ? (
          <CartAddIcon
            fill="var(--alternative-text-color)"
            className={"icon_size_small"}
          />
        ) : (
          <AddIcon
            fill="var(--alternative-text-color)"
            className={"icon_size_small"}
          />
        )}
      </Button>
    </div>
  );
};
