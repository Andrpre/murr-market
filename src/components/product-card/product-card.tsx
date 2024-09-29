import React from "react";
import { Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { ProductCardProps } from "./type";
import { CartCounter } from "../ui/cart-counter";
import { WishlistButton } from "../ui/wishlist-button";
import { ProductDescription } from "../ui/product-description";
import styles from "./style.module.scss";
import { HighlighterProductAdded } from "../ui/highlighter-product-added";

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  return (
    <Link to={`/products/${product.id}`}>
      <HighlighterProductAdded
        productId={product.id}
        hover={true}
      >
        <article className={styles.product}>
          <div className={styles.product__wish}>
            <WishlistButton product={product} />
          </div>

          <img
            className={styles.product__image}
            alt={product.name}
            src={product.image.url.catalog}
          />
          <div className={styles.product__description}>
            <h4>{product.name}</h4>
            <Typography.Paragraph
              className={
                styles["product__description-text"]
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
          <Flex justify="space-between" align="center">
            <span className={styles.product__price}>
              {product.price.current} МК
            </span>
            <CartCounter product={product} />
          </Flex>
        </article>
      </HighlighterProductAdded>
    </Link>
  );
};
