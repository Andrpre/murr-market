import React, { useMemo } from "react";
import { ProductPriceProps } from "./type";
import styles from "./style.module.scss";

export const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  fontSize = 18,
}) => {
  const isDiscount = useMemo(
    () => price.current < price.old,
    [price]
  );

  const formatPrice = (value: number) => {
    return value.toFixed(0) + "€";
  };

  return (
    <div className={styles.price}>
      {isDiscount ? (
        <div className={styles.price__sale}>
          <span
            className={styles["price__sale-old"]}
            style={{ fontSize: fontSize - 4 }}
          >
            {formatPrice(price.old)}
          </span>
          <span
            className={styles["price__sale-current"]}
            style={{ fontSize: fontSize }}
          >
            {formatPrice(price.current)}
          </span>
        </div>
      ) : (
        <span
          className={styles["price__sale-current"]}
          style={{ fontSize: fontSize }}
        >
          {formatPrice(price.current)}
        </span>
      )}
    </div>
  );
};
