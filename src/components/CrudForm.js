import React, { useState, useEffect } from "react";

// Las instancias de nuestra bd no forma parte del componente
// Por lo tanto, las pongo por fuera del componente.

const intialForm = {
  name: "",
  constellation: "",
  id: null,
};

export default function CrudForm() {
  const [form, setForm] = useState({});

  const handleChange = (e) => {};

  const handleSubmit = (e) => {};

  const handleReset = (e) => {};

  return (
    <div>
      <h3>Agregar Nuevo Caballero</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={form.name}
        />
        <input
          type="text"
          name="constellation"
          placeholder="Constelación"
          onChange={handleChange}
          value={form.constellation}
        />
        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </div>
  );
}
