import { useEffect, useState } from "react";
import "./App.css";
import FormularioTarea from "./components/FormularioTarea";
import ListaTareas from "./components/ListaTareas";
import { cargarTareas, crearTarea, borrarTareaAPI } from "./api/tareasAPI";

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState("");

  //Se va a ejecutar una vez al montar el componente
  useEffect(() => {
    async function obtenerTareas() {
      try {
        //Cargar las tareas desde la API
        const tareasDesdeAPI = await cargarTareas();
        //Actualizar el estado con las tareas de React
        setTareas(tareasDesdeAPI);
      } catch (error) {
        console.error(error);
      }
    }
    obtenerTareas();
  }, []);

  async function agregarTarea(event) {
    //Prevenir el comportamiento por defecto del formulario (enviar y recargar)
    event.preventDefault();

    try {
      //Crear la nueva tarea en el backend
      const nueva = await crearTarea(texto);
      //Actualizar el estado de tareas en React para que lo repinte
      setTareas((prev) => [...prev, nueva]); 
      //Limpiar el texto del formulario
      setTexto("");
    } catch (error) {
      console.error(error);
    }
  }

  async function borrarTarea(id) {
    try {
      //Borrar la tarea en el backend
      await borrarTareaAPI(id);
      //Borramos la tarea del array tareas que maneja React para que lo repinte
      setTareas((prev) => prev.filter((tarea) => tarea.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <ListaTareas tareas={tareas} borrarTarea={borrarTarea} />
      <FormularioTarea
        onEnvioFormulario={agregarTarea}
        texto={texto}
        setTexto={setTexto}
      />
    </div>
  );
}
