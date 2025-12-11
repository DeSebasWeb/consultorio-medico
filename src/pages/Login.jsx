import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [correo, setCorreo] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setCargando(true);

    try {
      const usuario = await loginUser(correo, password);

      if (!usuario) {
        setError("Credenciales incorrectas");

        return;
      }

      login(usuario);

      navigate("/dashboard");
    } catch (err) {
      setError("Credenciales incorrectas o error en el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#f5f7fa" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="card shadow border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="bi bi-hospital" style={{ fontSize: "3rem", color: "#2c5282" }}></i>
                  </div>
                  <h3 className="fw-bold text-dark mb-2">Consultorio Médico</h3>
                  <p className="text-secondary small mb-0">Sistema de gestión de citas médicas</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-dark fw-normal small">
                      Correo Electrónico
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      value={correo}
                      placeholder="ejemplo@correo.com"
                      onChange={(e) => setCorreo(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-dark fw-normal small">
                      Contraseña
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      placeholder="Ingrese su contraseña"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger py-2 small" role="alert">
                      <i className="bi bi-exclamation-circle me-2"></i>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-semibold"
                    disabled={cargando}
                    style={{ backgroundColor: "#2c5282", borderColor: "#2c5282" }}
                  >
                    {cargando ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Ingresando...
                      </>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <small className="text-secondary">
                    ¿No tienes cuenta?{" "}
                    <Link to="/registro" className="text-decoration-none" style={{ color: "#2c5282" }}>
                      Regístrate aquí
                    </Link>
                  </small>
                </div>
              </div>

              <div className="card-footer bg-white border-top text-center py-3">
                <small className="text-secondary">
                  <i className="bi bi-shield-check me-1"></i>
                  Plataforma segura y confiable
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}