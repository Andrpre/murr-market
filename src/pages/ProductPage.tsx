import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import { selectProductById } from '../slices/productsSlice';
import { addItemToCart } from '../slices/cartSlice';
import { Breadcrumb, Button } from 'antd';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const product = useSelector(state => selectProductById(state, productId));
  const dispatch = useDispatch();

  if (!product) {
    return <p>Товар не найден</p>;
  }

  return (
    <div>
    <Breadcrumb
      items={[
        {
          title: <Link to="/">Главная</Link>,
        },
        {
          title: product.name,
        },
      ]}
    />
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ maxWidth: '300px' }} />
      <p>{product.description}</p>
      <p>Цена: {product.price} руб.</p>
      <Button type="primary" onClick={() => dispatch(addItemToCart(product))}>
        Добавить в корзину
      </Button>
    </div>
  );
};

export default ProductPage;
