import React, { useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true";
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
