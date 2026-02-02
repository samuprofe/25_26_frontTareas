// src/api/tareasAPI.js
const API_URL = "http://localhost:8080/api/tareas";

// Función para obtener las tareas desde la API
export async function cargarTareas() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al cargar tareas");
  return await response.json();
}

// Función para crear una nueva tarea en la API
export async function crearTarea(texto) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto, finalizada: false }),
  });

  if (!response.ok) throw new Error("Error al crear tarea");
  return await response.json(); // devuelve la tarea creada (con id)
}

// Función para borrar una tarea en la API
export async function borrarTareaAPI(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Error al borrar tarea");
  return true;
}

// Función para marcar una tarea como finalizada/no finalizada
export async function toggleFinalizadaAPI(id) {
  const response = await fetch(`${API_URL}/${id}/finalizar`, {
    method: "PATCH",
  });
  if (!response.ok) throw new Error("Error al actualizar tarea");
  return await response.json();
}

// Función para actualizar una tarea completa
export async function actualizarTareaAPI(id, datos) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!response.ok) throw new Error("Error al actualizar tarea");
  return await response.json();
}
