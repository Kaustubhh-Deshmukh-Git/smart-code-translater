import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext.jsx";
import { logout as logoutAPI } from "../services/authService.js";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutAPI();
    } catch {
      // ignore failure
    }
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Smart Code Translator
      </Link>

      <ul className="navbar-links">
        <li>
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
            Editor
          </Link>
        </li>
        <li>
          <Link
            to="/history"
            className={`nav-link ${location.pathname === "/history" ? "active" : ""}`}
          >
            History
          </Link>
        </li>
      </ul>

      {user && (
        <div className="navbar-user">
          <div className="user-profile">
            {user.picture ? (
              <img src={user.picture} alt={user.name || "Avatar"} className="user-avatar" />
            ) : (
              <div className="user-avatar-placeholder">{getInitial(user.name)}</div>
            )}
            <span className="user-name">{user.name}</span>
          </div>
          <button type="button" onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
