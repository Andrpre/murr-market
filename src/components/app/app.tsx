import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import CartPage from '../../pages/CartPage';
import ProductPage from '../../pages/ProductPage';
import { Layout } from 'antd';
import { AppHeader } from '../app-header';
import { Content, Footer } from 'antd/es/layout/layout';
import { WishlistPage } from '../../pages/WishlistPage';
import { useDispatch } from '../../services/hooks';
import { getProducts } from '../../slices/productsSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProducts());
  });

  return (
    <Router>
      <Layout>
        <AppHeader />
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Murr Market ©2024</Footer>
      </Layout>
    </Router>
  );
};

export default App;
