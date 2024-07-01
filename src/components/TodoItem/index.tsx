import React from "react";

// Utils
import { TodosProps } from "@/types/apiProps";

// Styles
import styles from "./TodoItem.module.css";

const TodoItem: React.FC<TodosProps> = ({ id, title, completed }) => {
  return (
    <div className={styles.todoItetm}>
      <h3>{title}</h3>
      <p>Status: {completed ? "Completo" : "Pedente"}</p>
    </div>
  );
};

export default TodoItem;
