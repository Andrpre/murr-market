import React from "react";
import { Skeleton } from "antd";
import { Helmet } from "react-helmet-async";

import { useSelector } from "../../services/hooks";
import { getStatusRequest, selectProducts } from "../../slices/productsSlice";
import { RequestStatus } from "../../utils/types";

import { ProductCard } from "../../components/product-card";
import { HighlighterProductAdded } from "../../components/ui/highlighter-product-added";
import { WelcomeBlock } from "../../components/welcome-block";
import { EmptyView } from "../../components/ui/empty-view";
import styles from "./style.module.scss";

export const HomePage: React.FC = () => {
  const products = useSelector(selectProducts);
  const statusRequest = useSelector(getStatusRequest);

  return (
    <>
      <Helmet>
        <title>Murr Market</title>
      </Helmet>
      <WelcomeBlock />

      {statusRequest === RequestStatus.Loading ? (
        <Skeleton active />
      ) : products.length === 0 ? (
        <EmptyView title="Товары отсутствуют" />
      ) : (
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
      )}
    </>
  );
};
