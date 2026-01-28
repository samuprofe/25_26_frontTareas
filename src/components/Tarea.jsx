export default function Tarea({ tarea, borrarTarea }) {
  return (
    <li>
      {tarea.texto + " "}
      <button onClick={() => borrarTarea(tarea.id)}>❌</button>
    </li>
  );
}
