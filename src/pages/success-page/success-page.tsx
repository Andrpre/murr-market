import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { useSelector } from "../../services/hooks";
import { selectOrderStatus } from "../../slices/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Player from "lottie-react";
import animationSuccess from "../../assets/lotties/success.json";
import animationConfetti from "../../assets/lotties/confetti.json";
import { OrderData, RequestStatus } from "../../utils/types";
import styles from "./style.module.scss";
import { Avatar, Button, Tooltip } from "antd";

export const SuccessPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const location = useLocation();
  const orderStatus = useSelector(selectOrderStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (orderStatus !== RequestStatus.Success || !orderData) {
      navigate("/");
    }

    const delay = setTimeout(() => {
      setIsPlaying(true);
    }, 3000);

    return () => clearTimeout(delay);
  });

  const { orderData } = (location.state as { orderData: OrderData }) || {};

  return (
    <section className={styles.success}>
      <div>
        {isPlaying && (
          <div className={styles.success__confetti}>
            <Player
              autoplay
              loop={false}
              animationData={animationConfetti}
              style={{ height: "calc(100vh - 5px)" }}
            />
          </div>
        )}
        <div className={styles.success__check}>
          <Player
            autoplay
            loop={false}
            animationData={animationSuccess}
            initialSegment={[10, animationSuccess.op]}
            style={{ height: "250px" }}
          />
        </div>
        <h3 className={styles.success__title}>
          {orderData.name}, твой заказ успешно оформлен!
        </h3>
      </div>
      <div className={styles.success__info}>
        <Avatar.Group
          size="large"
          max={{
            count: 3,
            style: {
              backgroundColor: "var(--secondary-text-color)",
              boxShadow: "var(--box-shadow-hover)",
              cursor: "pointer",
            },
            popover: { trigger: "click" },
          }}
        >
          {orderData.items.map((item) => (
            <Tooltip
              key={item.id}
              title={
                <p style={{ textAlign: "center" }}>
                  {item.name} × {item.quantity} шт
                </p>
              }
              placement="top"
            >
              <Avatar
                style={{
                  backgroundColor: "var(--background-color)",
                  boxShadow: "var(--box-shadow-hover)",
                }}
                src={`${BASE_URL}${item.image.url.main}`}
              />
            </Tooltip>
          ))}
        </Avatar.Group>
        <b>Заказ на сумму {orderData.totalAmount} мурркоинов</b>
        <p style={{ color: "var(--secondary-text-color)" }}>
          Привезем по адресу: {orderData.address}
          <br />
          Кожанный все получит, можешь спать спокойно и не париться
        </p>
      </div>
      <Button
        type="primary"
        onClick={() => navigate("/")}
        className={styles.success__button}
      >
        Вернуться на главную
      </Button>
    </section>
  );
};
