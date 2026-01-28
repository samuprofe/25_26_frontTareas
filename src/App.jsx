import { useEffect, useState } from "react";
import "./App.css";
import FormularioTarea from "./components/FormularioTarea";
import ListaTareas from "./components/ListaTareas";
//import { cargarTareas } from "./api/tareasAPI"; 


export default function App() {
  //Estado para guardar las tareas
  const [tareas, setTareas] = useState([]);
  //Estado para guardar el texto del input controlado
  const [texto, setTexto] = useState("");

  const API_URL = "http://localhost:8080/api/tareas";

  async function cargarTareas() {
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

  async function borrarTarea(id) {
    try {
      //Se conecta a la API y borra la tarea con el id proporcionado
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Error al borrar tarea");
      }
      //Elimina la tarea del estado "tareas" de React para que repinte el componente
      setTareas(tareas.filter((tarea) => tarea.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  async function agregarTarea(event) {
    //Evita que se envíe el formulario y se recargue la página
    event.preventDefault();

    //Envía la nueva tarea a la API
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({texto: texto, finalizada: false}),
      });
      
      if (!response.ok) {
        console.error("Error al crear tarea");
      } 

      const data = await response.json();
      //Añade una nueva tarea al array de tareas para que React lo repinte
      setTareas([...tareas, { id: data.id, texto: data.texto }]);
      //Limpia el input
      setTexto("");

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function obtenerTareas() {
      const tareasDesdeAPI = await cargarTareas();
      setTareas(tareasDesdeAPI);
    }
    obtenerTareas();
  }, []);





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
