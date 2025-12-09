import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
      <div className="container-fluid px-4">
        {/* Logo y nombre */}
        <Link className="navbar-brand fw-semibold text-dark" to={user ? "/dashboard" : "/login"} style={{ fontSize: "1.1rem" }}>
          <i className="bi bi-hospital me-2" style={{ color: "#2c5282" }}></i>
          Consultorio Médico
        </Link>

        {/* Botón hamburguesa para móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido colapsable */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Links cuando NO hay usuario logueado */}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-secondary" to="/login">
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary" to="/registro">
                    <i className="bi bi-person-plus me-1"></i>
                    Registrarse
                  </Link>
                </li>
              </>
            )}

            {/* Links cuando hay usuario logueado */}
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-secondary" to="/dashboard">
                    <i className="bi bi-speedometer2 me-1"></i>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary" to="/citas">
                    <i className="bi bi-calendar-check me-1"></i>
                    Mis Citas
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Información del usuario y botón de logout */}
          {user && (
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-person-circle text-secondary" style={{ fontSize: "1.5rem" }}></i>
                <span className="text-secondary small d-none d-md-inline">
                  {user.nombre} {user.apellido}
                </span>
              </div>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
