import { useContext } from "react";
import { AuthContext, AuthContextType } from "./";
import { useNavigate } from "react-router-dom";

const useAuth = (): AuthContextType => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const logout = () => {
    context.logout();
    navigate("/login");
  };

  return {
    ...context,
    logout,
  };
};

export default useAuth;
