import Tarea from "./Tarea";

export default function ListaTareas({ tareas, borrarTarea }) {
  return (
    <ul>
      {tareas.map((tarea) => (
        <Tarea key={tarea.id} tarea={tarea} borrarTarea={borrarTarea} />
      ))}
    </ul>
  );
}
