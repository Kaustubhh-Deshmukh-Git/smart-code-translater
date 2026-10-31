import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import "./styles/components.css";

const WelcomePlaceholder = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="placeholder-container">
      <h1>Welcome, {user?.name || "User"}!</h1>
      <p>Welcome - translator coming in Part 2</p>
    </div>
  );
};

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <WelcomePlaceholder />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
