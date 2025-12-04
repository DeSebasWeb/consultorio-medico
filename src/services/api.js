import axios from "axios";

const BASE_URL = "https://6930d78c11a8738467cc5e66.mockapi.io/api/v1";

// ==================== USUARIOS ====================

export async function loginUser(correo, password) {
  const { data } = await axios.get(`${BASE_URL}/usuarios`, {
    params: { correo, password },
  });

  if (data.length === 0) {
    throw new Error("Credenciales incorrectas.");
  }

  return data[0]; // retorna el usuario encontrado
}

export async function getUsuarios() {
  const { data } = await axios.get(`${BASE_URL}/usuarios`);
  return data;
}

export async function getUsuarioById(id) {
  const { data } = await axios.get(`${BASE_URL}/usuarios/${id}`);
  return data;
}

export async function crearUsuario(usuario) {
  const { data } = await axios.post(`${BASE_URL}/usuarios`, usuario);
  return data;
}

export async function actualizarUsuario(id, usuario) {
  const { data } = await axios.put(`${BASE_URL}/usuarios/${id}`, usuario);
  return data;
}

export async function eliminarUsuario(id) {
  const { data } = await axios.delete(`${BASE_URL}/usuarios/${id}`);
  return data;
}

// ==================== CITAS MÉDICAS ====================

export async function getCitasMedicas(idUsuario) {
  if (idUsuario) {
    const { data } = await axios.get(`${BASE_URL}/citas-medicas`, {
      params: { id_usuario: idUsuario },
    });
    return data;
  }
  const { data } = await axios.get(`${BASE_URL}/citas-medicas`);
  return data;
}

export async function getCitaMedicaById(id) {
  const { data } = await axios.get(`${BASE_URL}/citas-medicas/${id}`);
  return data;
}

export async function crearCitaMedica(cita) {
  const { data } = await axios.post(`${BASE_URL}/citas-medicas`, cita);
  return data;
}

export async function actualizarCitaMedica(id, cita) {
  const { data } = await axios.put(`${BASE_URL}/citas-medicas/${id}`, cita);
  return data;
}

export async function eliminarCitaMedica(id) {
  const { data } = await axios.delete(`${BASE_URL}/citas-medicas/${id}`);
  return data;
}
