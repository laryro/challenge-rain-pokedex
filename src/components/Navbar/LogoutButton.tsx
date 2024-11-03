import React from "react";
import styles from "./Navbar.module.css";

interface LogoutButtonProps {
  logout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ logout }) => {
  return (
    <button onClick={logout} className={styles.button}>
      Logout
    </button>
  );
};
