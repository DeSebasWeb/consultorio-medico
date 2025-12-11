import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getCitasMedicas, eliminarCitaMedica } from "../services/api";

export default function Dashboard() {
  const { user } = useAuth();
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Cargar citas del usuario al montar el componente
  useEffect(() => {
    cargarCitas();
  }, [user]);

  const cargarCitas = async () => {
    try {
      setCargando(true);
      setError("");

      // Obtener todas las citas y filtrar por id_usuario
      const todasLasCitas = await getCitasMedicas();
      const citasDelUsuario = todasLasCitas.filter(
        (cita) => cita.id_usuario === user.id
      );

      setCitas(citasDelUsuario);
    } catch (err) {
      console.error("Error al cargar citas:", err);
      setError("Error al cargar las citas médicas");
    } finally {
      setCargando(false);
    }
  };

  const handleCancelarCita = async (idCita) => {
    if (!window.confirm("¿Estás seguro de que deseas cancelar esta cita?")) {
      return;
    }

    try {
      await eliminarCitaMedica(idCita);
      // Actualizar la lista de citas después de eliminar
      setCitas((prevCitas) => prevCitas.filter((cita) => cita.id !== idCita));
      alert("Cita cancelada exitosamente");
    } catch (err) {
      console.error("Error al cancelar cita:", err);
      alert("Error al cancelar la cita. Por favor, intenta nuevamente.");
    }
  };

  // Calcular estadísticas
  const totalCitas = citas.length;
  const proximaCita = citas.length > 0 ? citas[0] : null;

  return (
    <div className="container mt-4 mb-5">
      {/* Encabezado de bienvenida */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="fw-bold text-dark">
            <i className="bi bi-speedometer2 me-2" style={{ color: "#2c5282" }}></i>
            Bienvenido, {user?.nombre} {user?.apellido}
          </h2>
          <p className="text-secondary">Panel de control de tu cuenta médica</p>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="row mb-4">
        {/* Total de citas */}
        <div className="col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="rounded-circle p-3" style={{ backgroundColor: "#e3f2fd" }}>
                    <i className="bi bi-calendar2-check" style={{ fontSize: "2rem", color: "#2c5282" }}></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-secondary small mb-1">Total de Citas</h6>
                  <h2 className="fw-bold text-dark mb-0">{totalCitas}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Próxima cita */}
        <div className="col-md-6 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="rounded-circle p-3" style={{ backgroundColor: "#fff3e0" }}>
                    <i className="bi bi-clock-history" style={{ fontSize: "2rem", color: "#f57c00" }}></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-secondary small mb-1">Próxima Cita</h6>
                  {proximaCita ? (
                    <>
                      <h5 className="fw-bold text-dark mb-0">Dr. {proximaCita.nombre_medico}</h5>
                      <small className="text-secondary">{proximaCita.eps}</small>
                    </>
                  ) : (
                    <p className="text-secondary mb-0">No hay citas programadas</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de citas médicas */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom py-3">
              <h5 className="mb-0 fw-bold text-dark">
                <i className="bi bi-list-ul me-2"></i>
                Mis Citas Médicas
              </h5>
            </div>
            <div className="card-body p-0">
              {cargando ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="text-secondary mt-3">Cargando citas...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger m-4" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              ) : citas.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox" style={{ fontSize: "3rem", color: "#6c757d" }}></i>
                  <p className="text-secondary mt-3">No tienes citas médicas registradas</p>
                  <small className="text-secondary">Las citas que agendes aparecerán aquí</small>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" className="px-4">#</th>
                        <th scope="col">Médico</th>
                        <th scope="col">EPS</th>
                        <th scope="col" className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {citas.map((cita, index) => (
                        <tr key={cita.id}>
                          <td className="px-4 align-middle">
                            <span className="badge bg-secondary">{index + 1}</span>
                          </td>
                          <td className="align-middle">
                            <div className="d-flex align-items-center">
                              <i className="bi bi-person-badge me-2 text-primary"></i>
                              <strong>Dr. {cita.nombre_medico}</strong>
                            </div>
                          </td>
                          <td className="align-middle">
                            <span className="badge bg-info text-dark">{cita.eps}</span>
                          </td>
                          <td className="align-middle text-center">
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              title="Ver detalle"
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleCancelarCita(cita.id)}
                              title="Cancelar cita"
                            >
                              <i className="bi bi-trash"></i>
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