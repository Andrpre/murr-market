import React from 'react';
import { Row, Col } from 'antd';
import { useSelector } from '../services/hooks';
import { selectProducts } from '../slices/productsSlice';
import { ProductCard } from '../components/product-card';

const HomePage: React.FC = () => {
  const products = useSelector(selectProducts);

  return (
    <div>
      <h2>Товары для котиков</h2>
      <Row gutter={[16, 16]}>
        {products.map(product => (
          <Col key={product.id} xs={24} sm={12} lg={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
