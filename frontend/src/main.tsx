import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth"; // adjust path if needed
import "./index.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Studio from "./pages/Studio";

function AppContent() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-4">
      <nav className="mb-4 flex items-center gap-4">
        {!token ? (
          <>
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
        <Link to="/studio" className="text-blue-600">
          Studio
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Studio />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studio" element={<Studio />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
