import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectProductById } from '../features/products/productsSlice';
import { addItemToCart } from '../features/cart/cartSlice';
import { Button } from 'antd';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const product = useAppSelector(state => selectProductById(state, productId));
  const dispatch = useAppDispatch();

  if (!product) {
    return <p>Товар не найден</p>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ maxWidth: '300px' }} />
      <p>{product.description}</p>
      <p>Цена: {product.price} руб.</p>
      <Button type="primary" onClick={() => dispatch(addItemToCart(product))}>
        Добавить в корзину
      </Button>
      <Link to="/cart">To cart</Link>
    </div>
  );
};

export default ProductPage;
