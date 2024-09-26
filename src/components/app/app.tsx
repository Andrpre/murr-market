import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import CartPage from "../../pages/CartPage";
import ProductPage from "../../pages/product-page/product-page";
import { Layout } from "antd";
import { AppHeader } from "../app-header";
import { Content, Footer } from "antd/es/layout/layout";
import { WishlistPage } from "../../pages/WishlistPage";
import { useDispatch } from "../../services/hooks";
import { getProducts } from "../../slices/productsSlice";
import CheckoutPage from "../../pages/CheckoutPage";
import { ProtectedRoute } from "../ProtectedRoute";
import styles from "./style.module.scss";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  });

  return (
    <Router>
      <Layout className={styles.layout}>
        <AppHeader />
        <Content className={styles.main}>
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
    </Router>
  );
};

export default App;
