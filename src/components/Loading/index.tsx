import React from "react";
import styles from "./Loading.module.css";

interface LooadingScreenProps {
  children: React.ReactNode;
}

const LoadingScreen = ({ children }: LooadingScreenProps) => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <div className={styles.messageLoading}>{children}</div>
    </div>
  );
};

export default LoadingScreen;
