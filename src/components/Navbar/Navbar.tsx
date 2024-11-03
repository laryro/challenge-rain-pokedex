import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../contexts/auth";
import { LogoutButton } from "./LogoutButton";
import { LoginButton } from "./LoginButton";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className={styles.nav}>
      <h1 className={styles.title}>Pokédex</h1>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/favorites" className={styles.link}>
          Favorites
        </Link>
        {isAuthenticated ? (
          <LogoutButton logout={logout} />
        ) : (
          <LoginButton location={location} />
        )}
      </div>
    </nav>
  );
};
