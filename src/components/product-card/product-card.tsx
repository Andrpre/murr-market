import React from "react";
import { BASE_URL } from "../../config";
import { Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { ProductCardProps } from "./type";
import { CartCounter } from "../ui/cart-counter";
import { WishlistButton } from "../ui/wishlist-button";
import { ProductDescription } from "../ui/product-description";
import styles from "./style.module.scss";
import clsx from "clsx";
import { ProductPrice } from "../ui/product-price";
import { ProductTags } from "../ui/product-tags";

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  rowDirection = false,
}) => {
  const hasTags =
    (product.tags.length !== 0 ||
      product.price.current !== product.price.old) &&
    rowDirection === false;

  return (
    <Link to={`/products/${product.id}`}>
      <article
        className={clsx(styles.product, rowDirection && styles.product_row)}
      >
        {!rowDirection && (
          <div className={styles.product__wish}>
            <WishlistButton product={product} />
          </div>
        )}
        {hasTags && (
          <div className={styles.product__tags}>
            <ProductTags product={product} />
          </div>
        )}
        <img
          className={styles.product__image}
          alt={product.name}
          src={`${BASE_URL}${product.image.url.catalog}`}
        />
        <div className={styles.product__description}>
          <h4>{product.name}</h4>
          <Typography.Paragraph
            className={styles["product__description-text"]}
            style={{ margin: "0" }}
            ellipsis={{
              rows: 2,
              expandable: false,
            }}
          >
            <ProductDescription description={product.description.main} />
          </Typography.Paragraph>
        </div>
        <Flex
          className={styles["product__trade-offer"]}
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
