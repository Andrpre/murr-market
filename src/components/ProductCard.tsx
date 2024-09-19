import React from 'react';
import { Card, Button } from 'antd';
import { Product } from '../features/products/Product';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      hoverable
      cover={<img alt={product.name} src={product.image} />}
    >
      <Card.Meta title={product.name} description={`Цена: ${product.price} руб.`} />
      <Link to={`/products/${product.id}`}>
        <Button type="primary">Подробнее</Button>
      </Link>
    </Card>
  );
};

export default ProductCard;
