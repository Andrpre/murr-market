import React from "react";
import { Badge, Button, Flex, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { selectTotalQuantity } from "../../slices/cartSlice";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { selectWishlistItems } from "../../slices/wishlistSlice";

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const totalQuantityCartItem = useSelector(selectTotalQuantity);
  const totalQuantityWishItem = useSelector(selectWishlistItems);
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <Flex gap="middle" align="center" justify="space-between">
        <Link to="/">
          <div
            className="logo"
            style={{
              float: "left",
              color: "#000",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Murr Market
          </div>
        </Link>
        <Link to="/">Главная</Link>
        <Flex gap="middle">
            <Button
              onClick={() => navigate("/wishlist")}
              type="text"
              shape="circle"
              size="large"
              icon={
                <Badge count={totalQuantityWishItem.length}>
                  <FavoriteIcon fontSize="large" />
                </Badge>
              }
            />
            <Button
              onClick={() => navigate("/cart")}
              type="text"
              shape="circle"
              size="large"
              icon={
                <Badge count={totalQuantityCartItem}>
                  <LocalMallRoundedIcon fontSize="large" />
                </Badge>
              }
            />
        </Flex>
      </Flex>
    </Header>
  );
};
