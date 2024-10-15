import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../slices/cartSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const cartItems = useSelector(selectCartItems);

  if (cartItems.length === 0) {
    // Если корзина пуста, перенаправляем на главную
    return <Navigate to="/" />;
  }

  // Если товары есть, показываем дочерний компонент
  return <>{children}</>;
};
