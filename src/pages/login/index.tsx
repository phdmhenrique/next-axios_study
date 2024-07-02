import LoginForm from "@/components/LoginForm";
import styles from "./Login.module.css";

const LoginPage = () => {
  return (
    <div className={styles.login_container}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
