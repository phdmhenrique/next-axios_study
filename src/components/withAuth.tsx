// src/components/withAuth.tsx
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { user, setUser } = useAuth();
    const router = useRouter();
    const isAuthPage =
      router.pathname === "/login" || router.pathname === "/register";

    useEffect(() => {
      if (!user && !isAuthPage) {
        router.push("/login");
      }
      // Certifique-se de incluir todas as dependências necessárias aqui
    }, [user, isAuthPage, router]); // Dependências corretas para evitar loops

    if (!user && !isAuthPage) {
      return <p>Redirecionando...</p>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
