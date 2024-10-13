import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { BreadCrumbProps } from "./type";

export const BreadCrumb: React.FC<BreadCrumbProps> = ({
  titles,
}) => {
  const crumbs = titles.map(({ link, name }, index) => ({
    key: index,
    title: link ? <Link to={link}>{name}</Link> : name,
  }));

  return (
    <Breadcrumb
      items={[
        {
          key: "home",
          title: <Link to="/">Главная</Link>,
        },
        ...crumbs,
      ]}
    />
  );
};
