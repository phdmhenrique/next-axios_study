import React from "react";
import { TodosProps } from "@/types/apiProps";
import TodoItem from "../TodoItem";

interface TodoList {
  todos: TodosProps[];
}

const TodoList: React.FC<TodoList> = ({ todos }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </div>
  );
};

export default TodoList;
