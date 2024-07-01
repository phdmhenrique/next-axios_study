import React from "react";
import UserItem from "../UserItem";
import { UsersProps } from "@/types/apiProps";

interface UserListProps {
  users: UsersProps[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div>
      {users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          email={user.email}
          username={user.username}
        />
      ))}
    </div>
  );
};

export default UserList;
