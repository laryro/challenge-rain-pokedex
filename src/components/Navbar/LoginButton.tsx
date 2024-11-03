import React from "react";
import { Link, Location } from "react-router-dom";
import styles from "./Navbar.module.css";

interface LoginButtonProps {
  location: Location;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ location }) => {
  return (
    <Link to="/login" className={styles.link} state={{ redirectTo: location }}>
      Login
    </Link>
  );
};
