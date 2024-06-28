import React from "react";
import styles from "./GridContent.module.css";

interface GridContentProps {
  children: React.ReactNode;
}

const GridContentContainer = ({ children }: GridContentProps) => {
  return <section className={styles.grid_content}>{children}</section>;
};

export default GridContentContainer;
