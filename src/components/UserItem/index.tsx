import React from "react";
import styles from "./UserItem.module.css";
import { UsersProps } from "@/types/apiProps";

const userItem = ({ id, name, email, username }: UsersProps) => {
  return (
    <div className={styles.userItem}>
      <h4>{name}</h4>
      <p>Email: {email}</p>
      <p>Username: {username}</p>
    </div>
  );
};

export default userItem;
