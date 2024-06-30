import React from "react";
import styles from "./ShowNumContents.module.css";

interface CountContentProps {
  visibleCount: number;
  totalCount: number;
  componentName?: string;
}

const ShowNumContents = ({
  visibleCount,
  totalCount,
  componentName,
}: CountContentProps) => {
  return (
    <p className={styles.quantity}>
      Mostrando <span>{visibleCount}</span> de um total de{" "}
      <span>{totalCount}</span> {componentName}
    </p>
  );
};

export default ShowNumContents;
