// src/components/withAuth.tsx
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingScreen from "./Loading";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { user, setUser } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const isAuthPage =
      router.pathname === "/login" || router.pathname === "/register";

    useEffect(() => {
      if (!user && !isAuthPage) {
        setIsLoading(true);
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    }, [user, isAuthPage, router]);

    if (isLoading) {
      return <LoadingScreen>Redirecionando...</LoadingScreen>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
