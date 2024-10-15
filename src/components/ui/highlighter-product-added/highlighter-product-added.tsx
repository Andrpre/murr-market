import React, { useMemo } from "react";
import clsx from "clsx";

import { selectCartItems } from "../../../slices/cartSlice";
import { useSelector } from "../../../services/hooks";
import { HighlighterProductAddedProps } from "./type";
import styles from "./style.module.scss";

export const HighlighterProductAdded: React.FC<
  HighlighterProductAddedProps
> = ({ productId, children, hover }) => {
  const cartItems = useSelector(selectCartItems);
  const inCart = useMemo(
    () => cartItems.some((item) => item.id === productId),
    [cartItems, productId]
  );

  return (
    <div
      className={clsx(styles.highlighter, {
        [styles.highlighter__added]: inCart,
        [styles.highlighter__notadded]: !inCart,
        [styles.highlighter__notadded_hover]:
          !inCart && hover,
      })}
    >
      {children}
    </div>
  );
};
