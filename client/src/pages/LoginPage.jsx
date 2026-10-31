import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext.jsx";
import { register, emailLogin, googleLogin } from "../services/authService.js";
import "../styles/login.css";

const LoginPage = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (isSignUp && !name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!email.trim() || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const result = await register(name.trim(), email.trim(), password);
        login(result.token, result.user);
        toast.success(`Welcome, ${result.user.name}!`);
        navigate("/");
      } else {
        const result = await emailLogin(email.trim(), password);
        login(result.token, result.user);
        toast.success(`Welcome, ${result.user.name}!`);
        navigate("/");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Authentication failed.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const result = await googleLogin(credentialResponse.credential);
      login(result.token, result.user);
      toast.success(`Welcome, ${result.user.name}!`);
      navigate("/");
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    toast.error("Login failed. Please try again.");
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Smart Code Translator</h1>
        <p>AI-powered translation, analysis, optimization, and explanation</p>
      </div>

      <div className="login-content">
        <div className="login-card">
          <h2>{isSignUp ? "Create an Account" : "Welcome Back"}</h2>

          <form onSubmit={handleSubmit} className="login-form">
            {isSignUp && (
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isSignUp ? "new-password" : "current-password"}
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="google-btn-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              shape="rectangular"
              size="large"
              text="continue_with"
              width="300"
            />
          </div>

          <div className="toggle-mode">
            <span>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </span>
            <button
              type="button"
              className="btn-toggle"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Translate</h3>
            <p>Convert code across C, C++, C#, Java, and Python with accuracy.</p>
          </div>
          <div className="feature-card">
            <h3>Analyze</h3>
            <p>Compute precise Big-O time and space complexity with clear breakdowns.</p>
          </div>
          <div className="feature-card">
            <h3>Optimize</h3>
            <p>Refactor code for performance, readability, and modern idioms.</p>
          </div>
          <div className="feature-card">
            <h3>Explain</h3>
            <p>Step-by-step beginner-friendly explanations of complex algorithms.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
