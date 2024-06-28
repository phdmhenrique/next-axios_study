import React from "react";
import styles from "./TitlePage.module.css";

interface TitleProps {
  children: React.ReactNode;
}

const TitlePage = ({ children }: TitleProps) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export default TitlePage;
