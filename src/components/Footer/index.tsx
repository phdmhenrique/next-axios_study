import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>To Study - @phdmhenrique | &copy; {year}</p>
    </footer>
  );
};

export default Footer;
