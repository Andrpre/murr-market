import { Radio } from "antd";
import React, { ReactNode } from "react";
import styles from "./style.module.scss";

export const RadioButton: React.FC<{
  value: string;
  children: ReactNode;
}> = ({ value, children }) => {
  return (
    <Radio
      value={value}
      className={styles.radio}
    >
      {children}
    </Radio>
  );
};
