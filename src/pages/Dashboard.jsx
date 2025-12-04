export default function Dashboard() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border">
            <div className="card-body text-center p-5">
              <div className="mb-4">
                <i className="bi bi-tools" style={{ fontSize: "4rem", color: "#6c757d" }}></i>
              </div>
              <h3 className="fw-bold text-dark mb-3">En Construcción</h3>
              <p className="text-secondary mb-4">
                Esta sección está siendo desarrollada por nuestro equipo.
              </p>
              <p className="text-secondary small">
                Pronto podrás acceder a todas las funcionalidades del dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
