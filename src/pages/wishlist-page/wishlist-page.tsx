import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";

import { useSelector } from "../../services/hooks";
import { selectWishlistItems } from "../../slices/wishlistSlice";

import { ProductCard } from "../../components/product-card";
import { BreadCrumb } from "../../components/ui/bread-crumb";
import { HighlighterProductAdded } from "../../components/ui/highlighter-product-added";
import { EmptyView } from "../../components/ui/empty-view";
import styles from "./style.module.scss";

export const WishlistPage: React.FC = () => {
  const wishlistItems = useSelector(selectWishlistItems);

  const renderedWishlistItems = useMemo(() => {
    return wishlistItems.map((product) => (
      <HighlighterProductAdded
        key={product.id}
        productId={product.id}
        hover={true}
      >
        <ProductCard product={product} />
      </HighlighterProductAdded>
    ));
  }, [wishlistItems]);

  return (
    <>
      <Helmet>
        <title>Список желаемого | Murr Market</title>
      </Helmet>
      <BreadCrumb titles={[{ name: "Список желаемого" }]} />
      {wishlistItems.length === 0 ? (
        <EmptyView
          title="Ваш список желаемого пуст"
          button={{ display: true, text: "На главную" }}
        />
      ) : (
        <section className={styles.products}>{renderedWishlistItems}</section>
      )}
    </>
  );
};
