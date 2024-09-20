import React from "react";
import { useSelector } from "../services/hooks";
import { selectWishlistItems } from "../slices/wishlistSlice";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/product-card";

export const WishlistPage: React.FC = () => {
  const wishlistItems = useSelector(selectWishlistItems);

  if (wishlistItems.length === 0) {
    return <h2>Ваш список желаемого пуст</h2>;
  }

  return (
    <div>
      <h2>Ваш список желаемого</h2>
      <Row gutter={[16, 16]}>
        {wishlistItems.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Link to={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};
