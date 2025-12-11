import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Funciones para manejar localStorage
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

export default function EditarCita() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    paciente: "",
    motivo: "",
    fecha: "",
    hora: "",
    estado: "Pendiente",
  });

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const citas = cargarCitasDesdeStorage();
    const cita = citas.find((c) => c.id === id);

    if (!cita) {
      alert("No se encontró la cita seleccionada.");
      navigate("/citas");
      return;
    }

    setForm({
      paciente: cita.paciente || "",
      motivo: cita.motivo || "",
      fecha: cita.fecha || "",
      hora: cita.hora || "",
      estado: cita.estado || "Pendiente",
    });

    setCargando(false);
  }, [id, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const citas = cargarCitasDesdeStorage();

    const actualizadas = citas.map((cita) =>
      cita.id === id ? { ...cita, ...form } : cita
    );

    guardarCitasEnStorage(actualizadas);

    alert("Cita actualizada correctamente.");
    navigate("/citas");
  }

  function handleCancelar() {
    navigate("/citas");
  }

  if (cargando) {
    return <p className="container mt-4">Cargando cita...</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Editar cita</h1>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Paciente</label>
          <input
            type="text"
            name="paciente"
            className="form-control"
            value={form.paciente}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Motivo</label>
          <input
            type="text"
            name="motivo"
            className="form-control"
            value={form.motivo}
            onChange={handleChange}
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

        <div className="col-12 mt-3">
          <button type="submit" className="btn btn-primary me-2">
            Guardar cambios
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}