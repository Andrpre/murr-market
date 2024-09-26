import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { BreadCrumbProps } from "./type";
import styles from "./style.module.scss";

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ titles }) => {
  const crumbs = titles.map((item) =>
    item.link
      ? { title: <Link to={item.link}>{item.name}</Link> }
      : { title: item.name }
  );
  return (
    <div className={styles.breadcrumb}>
      <Breadcrumb
        items={[
          {
            title: <Link to="/">Главная</Link>,
          },
          ...crumbs,
        ]}
      />
    </div>
  );
};
