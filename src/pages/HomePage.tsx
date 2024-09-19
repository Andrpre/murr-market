import React from 'react';
import { Row, Col } from 'antd';
import { useAppSelector } from '../app/hooks';
import { selectProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const products = useAppSelector(selectProducts);

  return (
    <div>
      <h2>Товары для котиков</h2>
      <Row gutter={[16, 16]}>
        {products.map(product => (
          <Col key={product.id} xs={24} sm={12} lg={8}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
