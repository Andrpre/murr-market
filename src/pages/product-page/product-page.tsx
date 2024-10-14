import React from "react";
import { useParams } from "react-router-dom";
import { Skeleton, Tabs, TabsProps } from "antd";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

import { BASE_URL } from "../../config";
import { useSelector } from "../../services/hooks";
import {
  getStatusRequest,
  selectProductById,
} from "../../slices/productsSlice";
import { RequestStatus } from "../../utils/types";

import { CartCounter } from "../../components/ui/cart-counter";
import { WishlistButton } from "../../components/ui/wishlist-button";
import { ProductDescription } from "../../components/ui/product-description";
import { BreadCrumb } from "../../components/ui/bread-crumb";
import { HighlighterProductAdded } from "../../components/ui/highlighter-product-added";
import { EmptyView } from "../../components/ui/empty-view";
import { ProductPrice } from "../../components/ui/product-price";
import { ProductTags } from "../../components/ui/product-tags";
import styles from "./style.module.scss";

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = String(id);
  const product = useSelector((state) => selectProductById(state, productId));
  const statusRequest = useSelector(getStatusRequest);

  if (statusRequest === RequestStatus.Loading) return <Skeleton active />;
  if (!product) {
    return (
      <EmptyView
        title="Не можем найти такой товар :("
        button={{ display: true, text: "На главную" }}
      />
    );
  }
  const hasTags =
    product.tags.length !== 0 || product.price.current !== product.price.old;

  const descriptionItems: TabsProps["items"] = [
      {
        key: "1",
        label: "Описание",
        children: <ProductDescription description={product.description.main} />,
      },
      {
        key: "2",
        label: "Преимущества",
        children: (
          <ProductDescription description={product.description.advantages} />
        ),
      },
      {
        key: "3",
        label: "Эксплуатация",
        children: (
          <ProductDescription description={product.description.usage} />
        ),
      },
    ];

  return (
    <>
      <Helmet>
        <title>{product.name} | Murr Market</title>
      </Helmet>
      <BreadCrumb titles={[{ name: product.name }]} />
      <section className={styles.card}>
        <div
          className={styles.card__image}
          style={{
            backgroundColor: product.image.bgColor,
          }}
        >
          <div className={styles.card__wish}>
            <WishlistButton product={product} />
          </div>
          {product.image.url.main && (
            <Swiper
              slidesPerView={1}
              loop={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
            >
              <SwiperSlide key={`main-${product.image.url.main}`}>
                <img
                  src={`${BASE_URL}${product.image.url.main}`}
                  alt={product.name}
                />
              </SwiperSlide>
              {product.image.url.additional.length > 0 &&
                product.image.url.additional.map((url, index) => (
                  <SwiperSlide key={`additional-${index}-${url}`}>
                    <img src={`${BASE_URL}${url}`} alt={product.name} />
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
        <HighlighterProductAdded productId={product.id} hover={false}>
          <div className={styles.card__info}>
            <h2 className={styles["card__info-title"]}>{product.name}</h2>
            <div className={styles["card__info-body"]}>
              {hasTags && (
                <ProductTags product={product} fontSize={16} direction="row" />
              )}
              <Tabs
                animated={{ inkBar: true, tabPane: true }}
                className={styles["card__info-description"]}
                defaultActiveKey="1"
                items={descriptionItems}
              />
            </div>
            <div className={styles["card__trade-offer"]}>
              <ProductPrice price={product.price} fontSize={24} />
              <CartCounter product={product} />
            </div>
          </div>
        </HighlighterProductAdded>
      </section>
    </>
  );
};
