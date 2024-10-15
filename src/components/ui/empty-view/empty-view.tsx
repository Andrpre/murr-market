import React, { useMemo } from "react";
import Player from "lottie-react";
import { useNavigate } from "react-router-dom";
import { Button, Empty, Typography } from "antd";
import { EmptyViewProps } from "./type";
import animationData from "../../../assets/lotties/sad_cat.json";

export const EmptyView: React.FC<EmptyViewProps> = ({
  title,
  button = { display: false },
}) => {
  const navigate = useNavigate();

  // Мемоизация кнопки для рендеринга только при изменении пропсов
  const buttonElement = useMemo(() => {
    if (!button.display) return null;
    return (
      <Button type="primary" onClick={() => navigate("/")}>
        {button.text || "На главную"}
      </Button>
    );
  }, [button, navigate]);

  // Мемоизация анимации
  const animationElement = useMemo(() => (
    <Player
      autoplay
      loop
      animationData={animationData}
      style={{ height: "200px" }}
    />
  ), []);

  return (
    <Empty
      image={animationElement}
      imageStyle={{ height: "170px" }}
      description={<Typography.Text>{title}</Typography.Text>}
    >
      {buttonElement}
    </Empty>
  );
};
