import { useEffect, useState } from "react";
import "./App.css";
import FormularioTarea from "./components/FormularioTarea";
import ListaTareas from "./components/ListaTareas";
import { cargarTareas, crearTarea, borrarTareaAPI, toggleFinalizadaAPI } from "./api/tareasAPI";

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Se va a ejecutar una vez al montar el componente
  useEffect(() => {
    async function obtenerTareas() {
      try {
        setLoading(true);
        setError(null);
        //Cargar las tareas desde la API
        const tareasDesdeAPI = await cargarTareas();
        //Actualizar el estado con las tareas de React
        setTareas(tareasDesdeAPI);
      } catch (error) {
        console.error(error);
        setError("Error al cargar las tareas. Verifica que el servidor esté activo.");
      } finally {
        setLoading(false);
      }
    }
    obtenerTareas();
  }, []);

  async function agregarTarea(event) {
    //Prevenir el comportamiento por defecto del formulario (enviar y recargar)
    event.preventDefault();

    //Validar que el texto no esté vacío
    if (!texto.trim()) {
      setError("El nombre de la tarea no puede estar vacío");
      return;
    }

    try {
      setError(null);
      //Crear la nueva tarea en el backend
      const nueva = await crearTarea(texto.trim());
      //Actualizar el estado de tareas en React para que lo repinte
      setTareas((prev) => [...prev, nueva]);
      //Limpiar el texto del formulario
      setTexto("");
    } catch (error) {
      console.error(error);
      setError("Error al crear la tarea");
    }
  }

  async function borrarTarea(id) {
    try {
      setError(null);
      //Borrar la tarea en el backend
      await borrarTareaAPI(id);
      //Borramos la tarea del array tareas que maneja React para que lo repinte
      setTareas((prev) => prev.filter((tarea) => tarea.id !== id));
    } catch (error) {
      console.error(error);
      setError("Error al borrar la tarea");
    }
  }

  async function toggleFinalizada(id) {
    try {
      setError(null);
      //Cambiar el estado de finalizada en el backend
      const tareaActualizada = await toggleFinalizadaAPI(id);
      //Actualizar la tarea en el estado de React
      setTareas((prev) =>
        prev.map((tarea) => (tarea.id === id ? tareaActualizada : tarea))
      );
    } catch (error) {
      console.error(error);
      setError("Error al actualizar la tarea");
    }
  }

  return (
    <div className="App">
      <h1>Mis Tareas</h1>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="loading">Cargando tareas...</p>
      ) : (
        <ListaTareas
          tareas={tareas}
          borrarTarea={borrarTarea}
          toggleFinalizada={toggleFinalizada}
        />
      )}

      <FormularioTarea
        onEnvioFormulario={agregarTarea}
        texto={texto}
        setTexto={setTexto}
      />
    </div>
  );
}
