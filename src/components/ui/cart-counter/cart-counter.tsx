import React, { useCallback, useMemo } from "react";
import { Button } from "antd";
import clsx from "clsx";

import {
  useDispatch,
  useSelector,
} from "../../../services/hooks";
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
import styles from "./style.module.scss";

export const CartCounter: React.FC<{
  product: Product;
}> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const quantity = useMemo(() => {
    const cartItem = cartItems.find(
      (item) => item.id === product.id
    );
    return cartItem ? cartItem.quantity : 0;
  }, [cartItems, product.id]);

  const blockDefault = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
    },
    []
  );

  const handleClickAdd = useCallback(
    (e: React.MouseEvent) => {
      blockDefault(e);
      dispatch(addItemToCart(product));
    },
    [blockDefault, dispatch, product]
  );

  const handleClickRemove = useCallback(
    (e: React.MouseEvent) => {
      blockDefault(e);
      dispatch(removeItemFromCart(product.id));
    },
    [blockDefault, dispatch, product.id]
  );
  
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
          <div className={styles.count__quantity}>
            {quantity}
          </div>
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
