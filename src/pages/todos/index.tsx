import { GetServerSideProps } from "next";
import TodoList from "@/components/TodoList";
import { TodosProps } from "@/types/apiProps";
import api from "@/api/axios";

interface TodosPageProps {
  todos: TodosProps[];
}

const TodosPage = ({ todos }: TodosPageProps) => {
  return (
    <div>
      <h1>Tarefas</h1>
      <TodoList todos={todos} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await api.get<TodosProps[]>("/todos");

    return {
      props: {
        todos: response.data,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar tarefas", error);
    return {
      props: {
        todos: [],
      },
    };
  }
};

export default TodosPage;
