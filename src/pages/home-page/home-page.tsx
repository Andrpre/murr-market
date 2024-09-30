import React from "react";
import { Spin } from "antd";
import { useSelector } from "../../services/hooks";
import { getStatusRequest, selectProducts } from "../../slices/productsSlice";
import { ProductCard } from "../../components/product-card";
import { RequestStatus } from "../../utils/types";
import styles from "./style.module.scss";
import { HighlighterProductAdded } from "../../components/ui/highlighter-product-added";

const HomePage: React.FC = () => {
  const products = useSelector(selectProducts);
  const statusRequest = useSelector(getStatusRequest);

  if (!products.length || statusRequest === RequestStatus.Loading) {
    return <Spin size="large" />;
  }

  return (
    <section className={styles.products}>
      {products.map((product) => (
        <HighlighterProductAdded key={product.id} productId={product.id} hover={true}>
          <ProductCard product={product} />
        </HighlighterProductAdded>
      ))}
    </section>
  );
};

export default HomePage;
