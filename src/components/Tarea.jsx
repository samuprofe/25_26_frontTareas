export default function Tarea({ tarea, borrarTarea, toggleFinalizada }) {
  return (
    <li className={`tarea ${tarea.finalizada ? "completada" : ""}`}>
      <input
        type="checkbox"
        checked={tarea.finalizada}
        onChange={() => toggleFinalizada(tarea.id)}
      />
      <span className="tarea-texto">{tarea.texto}</span>
      <button className="btn-borrar" onClick={() => borrarTarea(tarea.id)}>
        ❌
      </button>
    </li>
  );
}
