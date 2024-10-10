import React from "react";
import { useSelector } from "../../services/hooks";
import { selectWishlistItems } from "../../slices/wishlistSlice";
import { ProductCard } from "../../components/product-card";
import { BreadCrumb } from "../../components/ui/bread-crumb";
import { HighlighterProductAdded } from "../../components/ui/highlighter-product-added";
import styles from "./style.module.scss";
import { EmptyView } from "../../components/ui/empty-view";

export const WishlistPage: React.FC = () => {
  const wishlistItems = useSelector(selectWishlistItems);

  return (
    <>
      <BreadCrumb titles={[{ name: "Список желаемого" }]} />
      {wishlistItems.length === 0 ? (
        <EmptyView
          title="Ваш список желаемого пуст"
          button={{ display: true, text: "На главную" }}
        />
      ) : (
        <section className={styles.products}>
          {wishlistItems.map((product) => (
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
