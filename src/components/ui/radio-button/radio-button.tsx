import React from "react";
import { Radio } from "antd";
import { RadioButtonProps } from "./type";
import styles from "./style.module.scss";

export const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  children,
}) => {
  return (
    <Radio
      value={value}
      className={styles.radio}
      aria-label={value}
    >
      {children}
    </Radio>
  );
};
