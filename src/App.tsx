import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider, useAuth } from "./contexts/auth";
import { LoginPage } from "./pages/Login";
import { FavoritesPage } from "./pages/Favorites";
import { NotFound } from "./pages/NotFound";
import { Pokedex } from "./pages/Pokedex";
import { FiltersProvider } from "./contexts/filters";

interface PrivateRouteProps {
  redirectPath?: string;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectPath = "/login",
  children,
}) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return children;
  }

  return (
    <Navigate to={redirectPath} replace state={{ redirectTo: location }} />
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <FiltersProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Pokedex />} />
            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </FiltersProvider>
    </AuthProvider>
  );
};

export default App;
