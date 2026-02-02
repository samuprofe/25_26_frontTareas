import Tarea from "./Tarea";

export default function ListaTareas({ tareas, borrarTarea, toggleFinalizada }) {
  if (tareas.length === 0) {
    return <p className="sin-tareas">No hay tareas. ¡Añade una!</p>;
  }

  return (
    <ul className="lista-tareas">
      {tareas.map((tarea) => (
        <Tarea
          key={tarea.id}
          tarea={tarea}
          borrarTarea={borrarTarea}
          toggleFinalizada={toggleFinalizada}
        />
      ))}
    </ul>
  );
}
