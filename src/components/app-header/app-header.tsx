import React from "react";
import { Badge, Button, Flex, Layout } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { selectTotalQuantity } from "../../slices/cartSlice";
import { ShoppingFilled } from "@ant-design/icons";

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  const totalQuantity = useSelector(selectTotalQuantity); // Получаем общее количество товаров в корзине
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <Flex gap="middle" align="center" justify="space-between">
        <Link to="/">
          <div
            className="logo"
            style={{
              float: "left",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Murr Market
          </div>
        </Link>
        <Link to="/">Главная</Link>
        <Badge count={totalQuantity}>
          <Link to="/cart">
            <Button type="primary" icon={<ShoppingFilled />} size="large" />
          </Link>
        </Badge>
      </Flex>
    </Header>
  );
};
