import React from "react";
import { Badge, Button, Flex, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useWindowScroll } from "react-use";
import clsx from "clsx";

import { useSelector } from "../../services/hooks";
import { selectTotalQuantity } from "../../slices/cartSlice";
import { selectWishlistItems } from "../../slices/wishlistSlice";

import { ReactComponent as FavoriteIcon } from "../../assets/heart.svg";
import { ReactComponent as LocalMallRoundedIcon } from "../../assets/cart.svg";
import styles from "./style.module.scss";

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const totalQuantityCartItem = useSelector(
    selectTotalQuantity
  );
  const totalQuantityWishItem = useSelector(
    selectWishlistItems
  );

  const { y } = useWindowScroll();
  const isScrolled = y > 50;

  return (
    <Header
      className={clsx(
        styles.header,
        isScrolled
          ? styles.header_scrolled
          : styles.header_top
      )}
    >
      <Flex
        gap="middle"
        align="center"
        justify="space-between"
      >
        <Link to="/" className={styles.logo}>
          <h2>Мурр Маркет</h2>
        </Link>
        <Flex gap="middle">
          <Button
            className={styles.header__button}
            onClick={() => navigate("/wishlist")}
            type="text"
            shape="circle"
            size="large"
            icon={
              <Badge count={totalQuantityWishItem.length}>
                <FavoriteIcon
                  className={clsx(
                    "icon_size_medium",
                    "icon_hover",
                    isScrolled
                      ? styles.header__icon_scrolled
                      : styles.header__icon_top
                  )}
                />
              </Badge>
            }
          />
          <Button
            className={styles.header__button}
            onClick={() => navigate("/cart")}
            type="text"
            shape="circle"
            size="large"
            icon={
              <Badge count={totalQuantityCartItem}>
                <LocalMallRoundedIcon
                  className={clsx(
                    "icon_size_medium",
                    "icon_hover",
                    isScrolled
                      ? styles.header__icon_scrolled
                      : styles.header__icon_top
                  )}
                />
              </Badge>
            }
          />
        </Flex>
      </Flex>
    </Header>
  );
};
