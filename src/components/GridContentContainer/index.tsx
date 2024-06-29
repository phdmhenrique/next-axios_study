import React, { forwardRef } from "react";
import styles from "./GridContent.module.css";

interface GridContentProps {
  children: React.ReactNode;
}

const GridContentContainer = forwardRef<HTMLDivElement, GridContentProps>(
  function GridContentContainer({ children }, ref) {
    return (
      <section ref={ref} className={styles.grid_content}>
        {children}
      </section>
    );
  }
);

GridContentContainer.displayName = "GridContentContainer";

export default GridContentContainer;
