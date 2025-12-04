import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-semibold text-dark" to="/" style={{ fontSize: "1.1rem" }}>
          <i className="bi bi-hospital me-2" style={{ color: "#2c5282" }}></i>
          Consultorio Médico
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!user && (
              <li className="nav-item">
                <Link className="nav-link text-secondary" to="/login">
                  Iniciar Sesión
                </Link>
              </li>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-secondary" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary" to="/citas">
                    Mis Citas
                  </Link>
                </li>
              </>
            )}
          </ul>

          {user && (
            <div className="d-flex align-items-center gap-3">
              <span className="text-secondary small">
                {user.nombre} {user.apellido}
              </span>

              <button className="btn btn-outline-secondary btn-sm" onClick={logout}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
