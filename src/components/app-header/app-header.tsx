import React from "react";
import { Badge, Button, Flex, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { selectTotalQuantity } from "../../slices/cartSlice";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { selectWishlistItems } from "../../slices/wishlistSlice";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { HeaderNavigation } from "../ui/header-navigation";
import styles from "./style.module.scss";

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const totalQuantityCartItem = useSelector(selectTotalQuantity);
  const totalQuantityWishItem = useSelector(selectWishlistItems);

  return (
    <Header className={styles.header}>
      <Flex gap="middle" align="center" justify="space-between">
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <HeaderNavigation />
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
