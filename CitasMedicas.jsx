// src/pages/CitasMedicas.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getCitasMedicas,
  eliminarCitaMedica,
} from "../services/api";

export default function CitasMedicas() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarCitas() {
      try {
        setCargando(true);
        setError("");

        // 👇 Trae las citas del usuario logueado
        const data = await getCitasMedicas(user.id);
        setCitas(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las citas médicas.");
      } finally {
        setCargando(false);
      }
    }

    if (user) {
      cargarCitas();
    }
  }, [user]);

  // 👇 Eliminar
  async function handleEliminar(id) {
    const confirmar = window.confirm(
      "¿Estás segura(o) de eliminar esta cita? Esta acción no se puede deshacer."
    );
    if (!confirmar) return;

    try {
      await eliminarCitaMedica(id);
      // Quitarla del estado
      setCitas((prev) => prev.filter((cita) => cita.id !== id));
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al eliminar la cita.");
    }
  }

  // 👇 Ir a la página de edición
  function handleEditar(id) {
    navigate(`/citas/${id}/editar`);
  }

  if (cargando) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-secondary">Cargando citas médicas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="d-flex align-items-center mb-4">
            <i
              className="bi bi-calendar-check me-2"
              style={{ fontSize: "2rem", color: "#2c5282" }}
            ></i>
            <div>
              <h3 className="fw-bold text-dark mb-0">Citas Médicas</h3>
              <p className="text-secondary small mb-0">
                Gestiona tus citas: visualiza, edita o elimina.
              </p>
            </div>
          </div>

          <div className="card shadow-sm border">
            <div className="card-body">
              {citas.length === 0 ? (
                <p className="text-center text-secondary mb-0">
                  No tienes citas registradas.
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Paciente</th>
                        <th>Motivo</th>
                        <th className="text-end">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {citas.map((cita) => (
                        <tr key={cita.id}>
                          {/* 👇 Ajusta estos campos si tu API usa otros nombres */}
                          <td>{cita.fecha}</td>
                          <td>{cita.hora}</td>
                          <td>{cita.paciente}</td>
                          <td>{cita.motivo}</td>
                          <td className="text-end">
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => handleEditar(cita.id)}
                            >
                              <i className="bi bi-pencil-square me-1"></i>
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleEliminar(cita.id)}
                            >
                              <i className="bi bi-trash me-1"></i>
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
