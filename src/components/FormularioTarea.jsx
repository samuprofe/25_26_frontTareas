import { useState } from "react";

export default function FormularioTarea({
  onEnvioFormulario,
  texto,
  setTexto,
}) {
  const [visible, setVisible] = useState(false);

  function interruptorAyuda() {
    setVisible(!visible);
  }
  return (
    <div>
      <form onSubmit={onEnvioFormulario}>
        <label htmlFor="nuevaTarea">Nueva tarea: </label>
        <input
          placeholder="Introduce el nombre..."
          id="nuevaTarea"
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button>Añadir</button>
      </form>
      <p style={{ color: "blue" }}>
        <button onClick={interruptorAyuda}>Ayuda</button>
        {visible && (
          <span> Debes introducir el nombre de la tarea que vas a añadir</span>
        )}
      </p>
    </div>
  );
}
