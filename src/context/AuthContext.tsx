import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "@/api/axios";

interface AuthContextProps {
  user: { id: number; username: string } | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: number; username: string } | null>(
    null
  );

  const login = async (username: string) => {
    try {
      const response = await axios.get(`/users?username=${username}`);
      if (response.data.length > 0) {
        setUser({
          id: response.data[0].id,
          username: response.data[0].username,
        });
      } else {
        console.error("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
