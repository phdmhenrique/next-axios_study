// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/router";
import api from "@/api/axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (username: string) => {
    setLoading(true);
    try {
      const response = await api.get(`users?username=${username}`);
      const user = response.data[0];
      if (user) {
        setUser(user);
        router.push("/");
      } else {
        throw new Error("Usuário inválido, tente: 'Bret'");
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setTimeout(() => {
      setUser(null);
      router.push("/login");
      setLoading(false);
    }, 2000); // Simula um logout com delay de 2 segundos
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
