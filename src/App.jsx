import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Dashboard from "./pages/Dashboard";
import CitasMedicas from "./pages/CitasMedicas";
import EditarCita from "./pages/EditarCita";

// Componentes
import Navbar from "./components/Navbar";

// Ruta privada
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* RUTAS PÚBLICAS (compañero) */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

            <Route
            path="/citas"
            element={
              <PrivateRoute>
                <CitasMedicas />
              </PrivateRoute>
            }
          />

          <Route
            path="/citas/:id/editar"
            element={
              <PrivateRoute>
                <EditarCita />
              </PrivateRoute>
            }
          />

          {/* Ruta raíz: si está logueado, lo mandamos al dashboard */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Cualquier ruta desconocida → login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
