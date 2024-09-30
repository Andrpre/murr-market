import React from "react";
import { useSelector } from "../../services/hooks";
import { selectWishlistItems } from "../../slices/wishlistSlice";
import { Row, Col } from "antd";
import { ProductCard } from "../../components/product-card";
import { BreadCrumb } from "../../components/ui/bread-crumb";
import { HighlighterProductAdded } from "../../components/ui/highlighter-product-added";

export const WishlistPage: React.FC = () => {
  const wishlistItems = useSelector(selectWishlistItems);

  if (wishlistItems.length === 0) {
    return <h2>Ваш список желаемого пуст</h2>;
  }

  return (
    <div>
      <BreadCrumb titles={[{ name: "Список желаемого" }]} />
      <Row gutter={[16, 16]}>
        {wishlistItems.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <HighlighterProductAdded productId={product.id} hover={true}>
              <ProductCard product={product} />
            </HighlighterProductAdded>
          </Col>
        ))}
      </Row>
    </div>
  );
};
