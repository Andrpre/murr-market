import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home-page/home-page";
import CartPage from "../../pages/cart-page/cart-page";
import ProductPage from "../../pages/product-page/product-page";
import { ConfigProvider, Layout } from "antd";
import { AppHeader } from "../app-header";
import { Content, Footer } from "antd/es/layout/layout";
import { WishlistPage } from "../../pages/wishlist-page/wishlist-page";
import { useDispatch } from "../../services/hooks";
import { getProducts } from "../../slices/productsSlice";
import CheckoutPage from "../../pages/checkout-page/checkout-page";
import { ProtectedRoute } from "../protected-route";
import styles from "./style.module.scss";
import { myTheme } from "../../styles/my-theme";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  });

  return (
    <Router>
      <ConfigProvider theme={myTheme}>
      <Layout className={styles.layout}>
        <AppHeader />
        <Content className={styles.content}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Content>
        <Footer className={styles.footer}>Murr Market ©2024</Footer>
      </Layout>
      </ConfigProvider>
    </Router>
  );
};

export default App;
