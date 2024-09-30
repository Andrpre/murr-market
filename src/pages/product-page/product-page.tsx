import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { selectProductById } from "../../slices/productsSlice";
import { Carousel, Col, Row } from "antd";
import { CartCounter } from "../../components/ui/cart-counter";
import { WishlistButton } from "../../components/ui/wishlist-button";
import { ProductDescription } from "../../components/ui/product-description";
import { BreadCrumb } from "../../components/ui/bread-crumb";
import styles from "./style.module.scss";
import { HighlighterProductAdded } from "../../components/ui/highlighter-product-added";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = String(id);
  const product = useSelector((state) =>
    selectProductById(state, productId)
  );

  if (!product) {
    return <p>Товар не найден</p>;
  }

  return (
    <>
      <BreadCrumb titles={[{ name: product.name }]} />
      <section className={styles.card}>
        <Row gutter={[50, 0]}>
          <Col xs={24} sm={12} lg={12}>
            <div
              style={{
                backgroundColor: `${product.image.bgColor}`,
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  zIndex: "2",
                  right: "20px",
                  top: "20px",
                }}
              >
                <WishlistButton product={product} />
              </div>
              {product.image.url.additional.length > 0 ? (
                <Carousel arrows draggable infinite>
                  <img
                    src={product.image.url.main}
                    alt={product.name}
                  />
                  {product.image.url.additional.map(
                    (url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={product.name}
                      />
                    )
                  )}
                </Carousel>
              ) : (
                <img
                  src={product.image.url.main}
                  alt={product.name}
                />
              )}
            </div>
          </Col>
          <Col xs={24} sm={12} lg={12}>
            <HighlighterProductAdded
              productId={product.id}
              hover={false}
            >
              <div className={styles.card__info}>
                <h2>{product.name}</h2>
                <p>
                  <b>Описание:</b>
                </p>
                <ProductDescription
                  description={product.description.main}
                />
                <p>
                  <b>Преимущества:</b>
                </p>
                <ProductDescription
                  description={
                    product.description.advantages
                  }
                />
                <p>
                  <b>Эксплуатация:</b>
                </p>
                <ProductDescription
                  description={product.description.usage}
                />
                <p>
                  Цена: {product.price.current} мурркоинов
                </p>
                <CartCounter product={product} />
              </div>
            </HighlighterProductAdded>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default ProductPage;
