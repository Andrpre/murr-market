import React from "react";
import { Skeleton } from "antd";
import { useSelector } from "../../services/hooks";
import { getStatusRequest, selectProducts } from "../../slices/productsSlice";
import { ProductCard } from "../../components/product-card";
import { RequestStatus } from "../../utils/types";
import { HighlighterProductAdded } from "../../components/ui/highlighter-product-added";
import styles from "./style.module.scss";
import { WelcomeBlock } from "../../components/welcome-block";
import { Helmet } from "react-helmet-async";

const HomePage: React.FC = () => {
  const products = useSelector(selectProducts);
  const statusRequest = useSelector(getStatusRequest);

  if (!products.length || statusRequest === RequestStatus.Loading) {
    return <Skeleton active />;
  }

  return (
    <>
      <Helmet>
        <title>Murr Market</title>
      </Helmet>
      <WelcomeBlock />
      <section className={styles.products}>
        {products.map((product) => (
          <HighlighterProductAdded
            key={product.id}
            productId={product.id}
            hover={true}
          >
            <ProductCard product={product} />
          </HighlighterProductAdded>
        ))}
      </section>
    </>
  );
};

export default HomePage;
