// src/components/LoginForm.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.get(`users?username=${username}`);
      const user = response.data[0];

      if (user) {
        setUser(user); // Verifique se isso não causa um loop de atualização no contexto
        router.push("/");
      } else {
        setError("Invalid username");
      }
    } catch (err) {
      setError("Failed to fetch user data");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
