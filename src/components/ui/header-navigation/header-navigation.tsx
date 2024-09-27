import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.scss";
import clsx from "clsx";
import { Button, Drawer } from "antd";
import { NavLinksProps } from "./type";
import useDeviceType from "../../../hooks/useDeviceType";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const NavLinks: React.FC<NavLinksProps> = ({ onClose, direction = "row" }) => {
  const navItems = [
    { label: "Главная", path: "/" },
    { label: "Наши товары", path: "/#products" },
    { label: "Котакции", path: "/promo" },
    { label: "Контакты", path: "/contacts" },
  ];

  return (
    <nav>
      <ul
        className={styles["nav__list"]}
        style={{ flexDirection: `${direction}` }}
      >
        {navItems.map((item) => (
          <li className={styles["nav__list-item"]} key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  isActive && styles["nav__list-item-active-link"],
                  !isActive && styles["nav__list-item-inactive-link"],
                  styles["nav__list-item-link"]
                )
              }
              onClick={() => {
                if (onClose) onClose();
              }}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const HeaderNavigation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const device = useDeviceType();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {device === "mobile" ? (
        <>
          <Button
            onClick={showDrawer}
            type="text"
            shape="circle"
            size="large"
            icon={<MenuRoundedIcon fontSize="large" />}
          >
            Меню
          </Button>
          <Drawer
            title="Навигация"
            onClose={onClose}
            open={open}
            placement="top"
          >
            <NavLinks onClose={onClose} direction="column" />
          </Drawer>
        </>
      ) : (
        <NavLinks />
      )}
    </>
  );
};
