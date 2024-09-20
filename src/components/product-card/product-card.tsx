import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { ProductCardProps } from "./type";
import { CartCounter } from "../cart-counter";
import { WishlistButton } from "../wishlist-button";

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <Card
        hoverable
        cover={<img alt={product.name} src={product.image} />}
        extra={<WishlistButton product={product} />}
      >
        <Card.Meta
          title={product.name}
          description={`Цена: ${product.price} руб.`}
        />
        <CartCounter product={product} />
      </Card>
    </Link>
  );
};
