import { Button, Empty, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Player from "lottie-react";
import animationData from "../../../assets/lotties/sad_cat.json";
import { EmptyViewProps } from "./type";

export const EmptyView: React.FC<EmptyViewProps> = ({
  title,
  button = { display: false },
}) => {
  const navigate = useNavigate();

  return (
    <Empty
      image={
        <Player
          autoplay
          loop
          animationData={animationData}
          style={{ height: "200px" }}
        />
      }
      imageStyle={{ height: "170px" }}
      description={<Typography.Text>{title}</Typography.Text>}
    >
      {button.display && (
        <Button type="primary" onClick={() => navigate("/")}>
          {button.text}
        </Button>
      )}
    </Empty>
  );
};
