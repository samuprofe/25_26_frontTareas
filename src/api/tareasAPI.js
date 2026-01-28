
const API_URL = "http://localhost:8080/api/tareas";

/**
 * GET /api/tareas
 * Obtiene todas las tareas desde la API
 */
export async function cargarTareas() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      console.error("Error al cargar tareas");
    }

    const data = await response.json();
    
    return data;

  } catch (error) {
    console.error(error);
  }
}