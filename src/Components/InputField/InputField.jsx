import React from "react";
import styles from "./InputField.module.css";

const InputField = ({ label, type, ...props }) => {
  return (
    <div className={styles.container}>
      {label ? <label>{label}</label> : <></>}
      <input type={type} {...props} />
    </div>
  );
};

export default InputField;
