import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <p className={styles.header}>Dynamic Resume Creator</p>
    </div>
  );
};

export default Header;
