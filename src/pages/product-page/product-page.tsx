import React from "react";
import { BASE_URL } from "../../config";
import { useParams } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import {
  getStatusRequest,
  selectProductById,
} from "../../slices/productsSlice";
import { CartCounter } from "../../components/ui/cart-counter";
import { WishlistButton } from "../../components/ui/wishlist-button";
import { ProductDescription } from "../../components/ui/product-description";
import { BreadCrumb } from "../../components/ui/bread-crumb";
import styles from "./style.module.scss";
import { HighlighterProductAdded } from "../../components/ui/highlighter-product-added";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Skeleton, Tabs, TabsProps } from "antd";
import { ProductPrice } from "../../components/ui/product-price";
import { ProductTags } from "../../components/ui/product-tags";
import { RequestStatus } from "../../utils/types";
import { v4 as uuidv4 } from "uuid";
import { EmptyView } from "../../components/ui/empty-view";

const ProductPage: React.FC = () => {
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
      children: <ProductDescription description={product.description.usage} />,
    },
  ];

  return (
    <>
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
          <Swiper
            slidesPerView={1}
            loop={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            <SwiperSlide key={uuidv4()}>
              <img src={`${BASE_URL}${product.image.url.main}`} alt={product.name} />
            </SwiperSlide>
            {product.image.url.additional.length > 0 &&
              product.image.url.additional.map((url) => (
                <SwiperSlide key={uuidv4()}>
                  <img src={`${BASE_URL}${url}`} alt={product.name} />
                </SwiperSlide>
              ))}
          </Swiper>
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

export default ProductPage;
