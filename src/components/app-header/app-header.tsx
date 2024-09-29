import React, { useEffect, useState } from "react";
import { Badge, Button, Flex, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { selectTotalQuantity } from "../../slices/cartSlice";
import { selectWishlistItems } from "../../slices/wishlistSlice";
import { ReactComponent as FavoriteIcon } from "../../assets/heart.svg";
import { ReactComponent as LocalMallRoundedIcon } from "../../assets/cart.svg";
import styles from "./style.module.scss";
import clsx from "clsx";

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const totalQuantityCartItem = useSelector(
    selectTotalQuantity
  );
  const totalQuantityWishItem = useSelector(
    selectWishlistItems
  );

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Header
      className={clsx(styles.header, {
        [styles.header_scrolled]: isScrolled,
        [styles.header_top]: !isScrolled,
      })}
    >
      <Flex
        gap="middle"
        align="center"
        justify="space-between"
      >
        <Link to="/">
          <h2 className={styles.logo}>Мурр Маркет</h2>
        </Link>
        <Flex gap="middle">
          <Button
            onClick={() => navigate("/wishlist")}
            type="text"
            shape="circle"
            size="large"
            icon={
              <Badge count={totalQuantityWishItem.length}>
                <FavoriteIcon
                  className={clsx("icon_size_medium", "icon_hover")}
                  fill={
                    isScrolled
                      ? "var(--main-color)"
                      : "var(--alternative-text-color)"
                  }
                />
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
                <LocalMallRoundedIcon
                  className={clsx("icon_size_medium", "icon_hover")}
                  fill={
                    isScrolled
                      ? "var(--main-color)"
                      : "var(--alternative-text-color)"
                  } />
              </Badge>
            }
          />
        </Flex>
      </Flex>
    </Header>
  );
};
