import React from "react";
import { Card, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { ProductCardProps } from "./type";
import { CartCounter } from "../ui/cart-counter";
import { WishlistButton } from "../ui/wishlist-button";
import { ProductDescription } from "../ui/product-description";

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <Card
        hoverable
        cover={<img alt={product.name} src={product.image.url.catalog} />}
        extra={<WishlistButton product={product} />}
      >
        <Card.Meta
          title={product.name}
          description={
            <Typography.Paragraph
              ellipsis={{
                rows: 2,
                expandable: false,
              }}
            >
              <ProductDescription description={product.description.main} />
            </Typography.Paragraph>
          }
        />
        <Flex justify="space-between" align="center">
          <div>{product.price.current} МК</div>
          <CartCounter product={product} />
        </Flex>
      </Card>
    </Link>
  );
};
