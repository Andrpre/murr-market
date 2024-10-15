import React from "react";
import { Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { BASE_URL } from "../../config";
import { ProductCardProps } from "./type";

import { CartCounter } from "../ui/cart-counter";
import { WishlistButton } from "../ui/wishlist-button";
import { ProductDescription } from "../ui/product-description";
import { ProductPrice } from "../ui/product-price";
import { ProductTags } from "../ui/product-tags";
import styles from "./style.module.scss";

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  rowDirection = false,
}) => {
  const hasTags =
    product.tags.length !== 0 ||
    product.price.current !== product.price.old;

  return (
    <Link
      to={`/products/${product.id}`}
      className={styles.product}
    >
      <article
        className={clsx(
          styles.product__card,
          rowDirection && styles.product__card_row
        )}
      >
        {!rowDirection && (
          <div className={styles.product__card__wish}>
            <WishlistButton product={product} />
          </div>
        )}
        {hasTags && !rowDirection && (
          <div className={styles.product__card__tags}>
            <ProductTags product={product} />
          </div>
        )}
        <img
          className={styles.product__card__image}
          alt={product.name || "Product image"}
          src={`${BASE_URL}${product.image.url.catalog}`}
        />
        <div className={styles.product__card__description}>
          <h4>{product.name}</h4>
          <Typography.Paragraph
            className={
              styles["product__card__description-text"]
            }
            style={{ margin: "0" }}
            ellipsis={{
              rows: 2,
              expandable: false,
            }}
          >
            <ProductDescription
              description={product.description.main}
            />
          </Typography.Paragraph>
        </div>
        <Flex
          className={styles["product__card__trade-offer"]}
          justify="space-between"
          align="center"
        >
          <ProductPrice price={product.price} />
          <CartCounter product={product} />
        </Flex>
      </article>
    </Link>
  );
};
