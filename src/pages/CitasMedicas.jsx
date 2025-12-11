// src/pages/CitasMedicas.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Helpers para manejar localStorage
function cargarCitasDesdeStorage() {
  const raw = localStorage.getItem("citasMedicas");
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function guardarCitasEnStorage(citas) {
  localStorage.setItem("citasMedicas", JSON.stringify(citas));
}

// 🔥 Helper para obtener usuario actual
function obtenerUsuarioActual() {
  const raw = localStorage.getItem("currentUser");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function CitasMedicas() {
  const [citas, setCitas] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // 🔥 Usuario actual
  const [form, setForm] = useState({
    paciente: "",
    motivo: "",
    fecha: "",
    hora: "",
    estado: "Pendiente",
  });

  const navigate = useNavigate();

  // 🔥 Cargar usuario y citas al entrar a la página
  useEffect(() => {
    // Obtener usuario actual
    const usuario = obtenerUsuarioActual();
    setCurrentUser(usuario);

    // Pre-llenar el nombre del paciente
    if (usuario) {
      setForm((prev) => ({
        ...prev,
        paciente: usuario.name || usuario.username || "",
      }));
    }

    // Cargar citas existentes
    const data = cargarCitasDesdeStorage();
    setCitas(data);
  }, []);

  // Manejo del formulario NUEVA CITA
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCrearCita(e) {
    e.preventDefault();

    const nuevaCita = {
      id: crypto.randomUUID(), // identificador único
      ...form,
    };

    const nuevasCitas = [...citas, nuevaCita];
    setCitas(nuevasCitas);
    guardarCitasEnStorage(nuevasCitas);

    // 🔥 Limpiar formulario pero mantener el nombre del paciente
    setForm({
      paciente: currentUser?.name || currentUser?.username || "",
      motivo: "",
      fecha: "",
      hora: "",
      estado: "Pendiente",
    });

    alert("Cita creada correctamente");
  }

  // Eliminar cita
  function handleEliminar(id) {
    if (!confirm("¿Seguro que deseas eliminar esta cita?")) return;

    const nuevas = citas.filter((cita) => cita.id !== id);
    setCitas(nuevas);
    guardarCitasEnStorage(nuevas);
  }

  // Navegar a Editar
  function handleEditar(id) {
    navigate(`/citas/${id}/editar`);
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Citas Médicas</h1>

      {/* 🔥 Mostrar bienvenida con nombre de usuario */}
      {currentUser && (
        <div className="alert alert-info mb-4">
          <strong>Bienvenido/a:</strong> {currentUser.name || currentUser.username}
        </div>
      )}

      {/* FORMULARIO PARA CREAR CITA */}
      <div className="card mb-4">
        <div className="card-header">Crear nueva cita</div>
        <div className="card-body">
          <form onSubmit={handleCrearCita} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Paciente</label>
              <input
                type="text"
                name="paciente"
                className="form-control"
                value={form.paciente}
                onChange={handleChange}
                required
                disabled // 🔥 Campo deshabilitado (se usa el usuario actual)
                style={{ backgroundColor: '#f8f9fa' }}
              />
              <small className="text-muted">
                Se usa automáticamente tu nombre de usuario
              </small>
            </div>

            <div className="col-md-6">
              <label className="form-label">Motivo</label>
              <input
                type="text"
                name="motivo"
                className="form-control"
                value={form.motivo}
                onChange={handleChange}
                placeholder="Ej: Consulta general, Odontología..."
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Fecha</label>
              <input
                type="date"
                name="fecha"
                className="form-control"
                value={form.fecha}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Hora</label>
              <input
                type="time"
                name="hora"
                className="form-control"
                value={form.hora}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Estado</label>
              <select
                name="estado"
                className="form-select"
                value={form.estado}
                onChange={handleChange}
                required
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                + Crear cita
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* LISTADO DE CITAS */}
      {citas.length === 0 ? (
        <div className="alert alert-warning">
          No hay citas registradas. Crea tu primera cita usando el formulario.
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <strong>Mis Citas</strong> ({citas.length})
          </div>
          <div className="card-body p-0">
            <table className="table table-striped mb-0">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Motivo</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((cita) => (
                  <tr key={cita.id}>
                    <td>{cita.paciente}</td>
                    <td>{cita.motivo}</td>
                    <td>{cita.fecha}</td>
                    <td>{cita.hora}</td>
                    <td>
                      <span 
                        className={`badge ${
                          cita.estado === 'Confirmada' 
                            ? 'bg-success' 
                            : cita.estado === 'Cancelada' 
                            ? 'bg-danger' 
                            : 'bg-warning'
                        }`}
                      >
                        {cita.estado}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditar(cita.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleEliminar(cita.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}