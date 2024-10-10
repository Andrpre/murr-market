import React from "react";
import WelcomeImg from "../../assets/welcome.png";
import styles from "./style.module.scss";

export const WelcomeBlock: React.FC = () => {
  return (
    <section className={styles.welcome}>
      <div className={styles.welcome__text}>
        <h2>
          Добро пожаловать в Мурр-маркет — магазин, созданный хвостиками для
          хвостиков!
        </h2>
        <h4 className={styles.welcome__text__subtext}>
          Здесь все, что нужно для комфортной жизни и счастливого мурчания: от
          мягких подушек до удобных когтеточек!
        </h4>
      </div>
      <img
        className={styles.welcome__img}
        src={WelcomeImg}
        alt="Аксессуары для кошки"
      />
    </section>
  );
};
