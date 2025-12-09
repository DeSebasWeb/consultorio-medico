import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { crearUsuario } from "../services/api";

export default function Registro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    confirmPassword: "",
  });

  const [errores, setErrores] = useState({});
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // Validar formato de correo electrónico
  const validarCorreo = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  // Validar formulario completo
  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    // Validar apellido
    if (!formData.apellido.trim()) {
      nuevosErrores.apellido = "El apellido es obligatorio";
    }

    // Validar correo
    if (!formData.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio";
    } else if (!validarCorreo(formData.correo)) {
      nuevosErrores.correo = "El correo no tiene un formato válido";
    }

    // Validar password
    if (!formData.password) {
      nuevosErrores.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      nuevosErrores.password = "La contraseña debe tener mínimo 6 caracteres";
    }

    // Validar confirmación de password
    if (!formData.confirmPassword) {
      nuevosErrores.confirmPassword = "Debe confirmar la contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      nuevosErrores.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo al escribir
    if (errores[name]) {
      setErrores((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validar formulario
    if (!validarFormulario()) {
      return;
    }

    setCargando(true);

    try {
      // Crear usuario sin el campo confirmPassword
      const nuevoUsuario = {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        correo: formData.correo.trim().toLowerCase(),
        password: formData.password,
      };

      await crearUsuario(nuevoUsuario);

      // Mostrar mensaje de éxito y redirigir
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (err) {
      console.error("Error al registrar:", err);
      setError("Error al crear la cuenta. Por favor, intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#f5f7fa" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="bi bi-person-plus-fill" style={{ fontSize: "3rem", color: "#2c5282" }}></i>
                  </div>
                  <h3 className="fw-bold text-dark mb-2">Crear Cuenta</h3>
                  <p className="text-secondary small mb-0">Complete el formulario para registrarse</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Nombre */}
                  <div className="mb-3">
                    <label className="form-label text-dark fw-normal small">
                      Nombre <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ingrese su nombre"
                    />
                    {errores.nombre && (
                      <div className="invalid-feedback">{errores.nombre}</div>
                    )}
                  </div>

                  {/* Apellido */}
                  <div className="mb-3">
                    <label className="form-label text-dark fw-normal small">
                      Apellido <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errores.apellido ? "is-invalid" : ""}`}
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      placeholder="Ingrese su apellido"
                    />
                    {errores.apellido && (
                      <div className="invalid-feedback">{errores.apellido}</div>
                    )}
                  </div>

                  {/* Correo */}
                  <div className="mb-3">
                    <label className="form-label text-dark fw-normal small">
                      Correo Electrónico <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errores.correo ? "is-invalid" : ""}`}
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      placeholder="ejemplo@correo.com"
                    />
                    {errores.correo && (
                      <div className="invalid-feedback">{errores.correo}</div>
                    )}
                  </div>

                  {/* Contraseña */}
                  <div className="mb-3">
                    <label className="form-label text-dark fw-normal small">
                      Contraseña <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errores.password ? "is-invalid" : ""}`}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Mínimo 6 caracteres"
                    />
                    {errores.password && (
                      <div className="invalid-feedback">{errores.password}</div>
                    )}
                  </div>

                  {/* Confirmar Contraseña */}
                  <div className="mb-4">
                    <label className="form-label text-dark fw-normal small">
                      Confirmar Contraseña <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errores.confirmPassword ? "is-invalid" : ""}`}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repita su contraseña"
                    />
                    {errores.confirmPassword && (
                      <div className="invalid-feedback">{errores.confirmPassword}</div>
                    )}
                  </div>

                  {/* Error general */}
                  {error && (
                    <div className="alert alert-danger py-2 small" role="alert">
                      <i className="bi bi-exclamation-circle me-2"></i>
                      {error}
                    </div>
                  )}

                  {/* Botón de registro */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-semibold"
                    disabled={cargando}
                    style={{ backgroundColor: "#2c5282", borderColor: "#2c5282" }}
                  >
                    {cargando ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Registrando...
                      </>
                    ) : (
                      "Crear Cuenta"
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <small className="text-secondary">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-decoration-none" style={{ color: "#2c5282" }}>
                      Inicia sesión aquí
                    </Link>
                  </small>
                </div>
              </div>

              <div className="card-footer bg-white border-top text-center py-3">
                <small className="text-secondary">
                  <i className="bi bi-shield-check me-1"></i>
                  Tus datos están protegidos
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
