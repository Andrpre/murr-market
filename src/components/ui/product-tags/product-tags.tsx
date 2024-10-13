import React from "react";
import styles from "./style.module.scss";
import { ProductTagsProps } from "./type";
import { v4 as uuidv4 } from "uuid";

export const ProductTags: React.FC<ProductTagsProps> = ({
  product,
  fontSize = 14,
  direction = "column",
}) => {
  const isDiscount =
    product.price.current !== product.price.old &&
    product.price.old > product.price.current;

  let discount: number = 0;
  if (isDiscount) {
    discount = Math.trunc(
      ((product.price.old - product.price.current) / product.price.old) * 100
    );
  }

  return (
    <ul className={styles.tags} style={{ flexDirection: direction }}>
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
          style={{ backgroundColor: tag.color, fontSize: fontSize }}
          className={styles.tags__item}
        >
          {tag.name}
        </li>
      ))}
    </ul>
  );
};
