import React from "react";
import styles from "./MainContent.module.css";

interface MainContentProps {
  children: React.ReactNode;
}

const MainContentContainer = ({ children }: MainContentProps) => {
  return <main className={styles.main_content}>{children}</main>;
};

export default MainContentContainer;
