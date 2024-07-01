import api from "@/api/axios";
import UserList from "@/components/UserList";
import { UsersProps } from "@/types/apiProps";
import { GetServerSideProps } from "next";
import React from "react";

interface UserPageProps {
  users: UsersProps[];
}

const UsersPage = ({ users }: UserPageProps) => {
  return (
    <div>
      <h1>Usuários</h1>
      <UserList users={users} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await api.get<UsersProps[]>("/users");

    return {
      props: {
        users: response.data,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar usuários", error);

    return {
      props: {
        users: [],
      },
    };
  }
};

export default UsersPage;
