import React, { ReactNode } from "react";
import { selectCartItems } from "../../../slices/cartSlice";
import { useSelector } from "../../../services/hooks";
import styles from "./style.module.scss";
import clsx from "clsx";

export const HighlighterProductAdded: React.FC<{
  productId: string;
  children: ReactNode;
  hover: boolean;
}> = ({ productId, children, hover }) => {
  const cartItems = useSelector(selectCartItems);
  const inCart = cartItems.some(
    (item) => item.id === productId
  );
  return (
    <div
      className={clsx(
        styles.highlighter,
        inCart
          ? styles.highlighter__added
          : [
              styles.highlighter__notadded,
              hover && styles.highlighter__notadded_hover,
            ]
      )}
    >
      {children}
    </div>
  );
};
