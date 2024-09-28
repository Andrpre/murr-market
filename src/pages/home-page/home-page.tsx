import React from "react";
import { Row, Col, Spin, Flex, Typography } from "antd";
import { useSelector } from "../../services/hooks";
import { getStatusRequest, selectProducts } from "../../slices/productsSlice";
import { ProductCard } from "../../components/product-card";
import { RequestStatus } from "../../utils/types";
import { WelcomeBlock } from "../../components/ui/welcome-block";
import styles from "./style.module.scss";

const HomePage: React.FC = () => {
  const products = useSelector(selectProducts);
  const statusRequest = useSelector(getStatusRequest);

  if (!products.length || statusRequest === RequestStatus.Loading) {
    return <Spin size="large" />;
  }

  return (
    <Flex className={styles.main} component="main">
      <section id="products">
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} lg={8}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </section>
    </Flex>
  );
};

export default HomePage;
