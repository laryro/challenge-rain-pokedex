import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import useAuth from "../../contexts/auth/useAuth";

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login();
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      {!isLoading && (
        <button
          onClick={() => void handleLogin()}
          className={styles.loginButton}
        >
          Login
        </button>
      )}
      {isLoading && <p>Logging in...</p>}
    </div>
  );
};
