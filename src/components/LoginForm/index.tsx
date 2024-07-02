// src/components/LoginForm.tsx
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./LoginForm.module.css";
import LoadingScreen from "../Loading";
import Head from "next/head";

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username);
    } catch (err) {
      setError("Usuário inválido, tente: 'Bret'");
    }
  };

  if (loading) {
    return <LoadingScreen>Carregando...</LoadingScreen>;
  }

  return (
    <>
      <Head>
        <title>Axios | Login</title>
      </Head>
      <div className={styles.login}>
        <h1>Login</h1>
        <form className={styles.form_login} onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </>
  );
}
