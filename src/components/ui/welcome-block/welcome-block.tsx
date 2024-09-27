import React from "react";
import { Button, Flex, Typography } from "antd";
import styles from "./style.module.scss";
import ScrollToSection from "../../../hooks/ScrollToSection";
import welcomeImg from "../../../assets/welcome.png";
import useDeviceType from "../../../hooks/useDeviceType";

export const WelcomeBlock: React.FC = () => {
  const device = useDeviceType();
  const isMobile = device === "mobile";

  return (
    <Flex component="section" className={styles.welcome}>
      <Flex vertical gap={isMobile ? 20 : 50} className={styles["welcome__content"]}>
        {isMobile && <img src={welcomeImg} alt="welcome imgage" />}
        <Typography.Title style={{ margin: "0" }}>
          Добро пожаловать в Мурр-маркет — магазин, созданный хвостиками для
          хвостиков!
        </Typography.Title>
        <Typography.Title level={4} style={{ margin: "0" }}>
          Здесь все, что нужно для комфортной жизни и счастливого мурчания: от
          мягких подушек до удобных когтеточек!
        </Typography.Title>
        <Button
          type="primary"
          size="large"
          className={styles["welcome__content__button"]}
          onClick={() => ScrollToSection("products")}
        >
          К покупкам
        </Button>
      </Flex>
    </Flex>
  );
};
