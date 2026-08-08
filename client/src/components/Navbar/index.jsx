
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: "Home", path: "/" },
    { label: "Your Resumes", path: "/your-resumes" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        ✦ ResumeATS
      </div>

      <div className="navbar-links">
        {links.map((link) => (
          <button
            key={link.path}
            className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="navbar-actions">
        <button className="nav-btn-ghost" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="nav-btn-primary" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;