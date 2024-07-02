// src/pages/profile.tsx
import withAuth from "@/components/withAuth";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";
import styles from "./Profile.module.css";
import LoadingScreen from "@/components/Loading";

const ProfilePage = () => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <LoadingScreen>Deslogando...</LoadingScreen>;
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className={styles.container_profile}>
        <h1>Profile Page</h1>
        {user && (
          <div className={styles.profile}>
            <div className={styles.profile_input}>
              <label htmlFor="name">Nome</label>
              <input type="text" value={user.name} name="name" disabled />
            </div>
            <div className={styles.profile_input}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                value={user.username}
                name="username"
                disabled
              />
            </div>
            <div className={styles.profile_input}>
              <label htmlFor="email">E-mail</label>
              <input type="email" value={user.email} name="email" disabled />
            </div>
            <div className={styles.profile_input}>
              <label htmlFor="tel">Telefone</label>
              <input type="tel" value={user.phone} name="tel" disabled />
            </div>
            <div className={styles.profile_input}>
              <label htmlFor="website">Website</label>
              <input type="text" value={user.website} name="website" disabled />
            </div>
            {user.address && (
              <div className={styles.profile_input}>
                <span>Endereço</span>
                {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
              </div>
            )}
            <div className={styles.profile_input}>
              <strong>Company:</strong> {user.company.name}
            </div>
          </div>
        )}

        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default withAuth(ProfilePage);
