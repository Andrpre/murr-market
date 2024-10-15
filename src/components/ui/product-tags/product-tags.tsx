import React, { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProductTagsProps } from "./type";
import styles from "./style.module.scss";

export const ProductTags: React.FC<ProductTagsProps> = ({
  product,
  fontSize = 14,
  direction = "column",
}) => {
  const isDiscount = useMemo(
    () =>
      product.price.current !== product.price.old &&
      product.price.old > product.price.current,
    [product.price]
  );

  const discount = useMemo(() => {
    if (isDiscount) {
      return Math.trunc(
        ((product.price.old - product.price.current) /
          product.price.old) *
          100
      );
    }
    return 0;
  }, [isDiscount, product.price]);

  return (
    <ul
      className={styles.tags}
      style={{ flexDirection: direction }}
    >
      {isDiscount && (
        <li
          key={uuidv4()}
          style={{
            backgroundColor: "var(--site-color-1)",
            fontSize: fontSize,
          }}
          className={styles.tags__item}
        >
          Скидка -{discount}%
        </li>
      )}
      {product.tags.map((tag) => (
        <li
          key={uuidv4()}
          style={{
            backgroundColor: tag.color,
            fontSize: fontSize,
          }}
          className={styles.tags__item}
        >
          {tag.name}
        </li>
      ))}
    </ul>
  );
};
