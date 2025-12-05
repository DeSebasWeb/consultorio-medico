import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Páginas
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CitasMedicas from "./pages/CitasMedicas";
import EditarCita from "./pages/EditarCita";

// Componentes
import Navbar from "./components/Navbar";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Citas */}
          <Route
            path="/citas"
            element={
              <PrivateRoute>
                <CitasMedicas />
              </PrivateRoute>
            }
          />

          {/* Editar Cita */}
          <Route
            path="/citas/:id/editar"
            element={
              <PrivateRoute>
                <EditarCita />
              </PrivateRoute>
            }
          />

          {/* Redirección a login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
