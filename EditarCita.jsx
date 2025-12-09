// src/pages/EditarCita.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCitaMedicaById,
  actualizarCitaMedica,
} from "../services/api";

export default function EditarCita() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cita, setCita] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarCita() {
      try {
        setCargando(true);
        setError("");

        const data = await getCitaMedicaById(id);
        setCita(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la información de la cita.");
      } finally {
        setCargando(false);
      }
    }

    cargarCita();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setCita((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setGuardando(true);
      setError("");

      await actualizarCitaMedica(id, cita);

      alert("Cita actualizada correctamente.");
      navigate("/citas");
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al guardar los cambios.");
    } finally {
      setGuardando(false);
    }
  }

  if (cargando || !cita) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-secondary">Cargando información de la cita...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex align-items-center mb-4">
            <i
              className="bi bi-pencil-square me-2"
              style={{ fontSize: "2rem", color: "#2c5282" }}
            ></i>
            <div>
              <h3 className="fw-bold text-dark mb-0">Editar Cita Médica</h3>
              <p className="text-secondary small mb-0">
                Modifica la información necesaria y guarda los cambios.
              </p>
            </div>
          </div>

          <div className="card shadow-sm border">
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* 👇 Ajusta los campos según tu modelo en la API */}
                <div className="mb-3">
                  <label className="form-label small text-dark">Paciente</label>
                  <input
                    type="text"
                    name="paciente"
                    className="form-control"
                    value={cita.paciente || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label small text-dark">Fecha</label>
                    <input
                      type="date"
                      name="fecha"
                      className="form-control"
                      value={cita.fecha || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label small text-dark">Hora</label>
                    <input
                      type="time"
                      name="hora"
                      className="form-control"
                      value={cita.hora || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small text-dark">Motivo</label>
                  <textarea
                    name="motivo"
                    rows="3"
                    className="form-control"
                    value={cita.motivo || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Si tu API tiene estado, especialidad, etc., los agregas aquí */}

                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/citas")}
                    disabled={guardando}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={guardando}
                  >
                    {guardando ? "Guardando..." : "Guardar cambios"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
