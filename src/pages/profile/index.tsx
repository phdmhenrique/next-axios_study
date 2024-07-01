import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return <p>Você precisa fazer login</p>;
  }

  return (
    <div>
      <h1>Perfil</h1>
      <p>Bem-vindo, {user.username}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
