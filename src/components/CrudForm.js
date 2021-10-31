import React, { useState, useEffect } from "react";

// Las instancias de nuestra bd no forma parte del componente
// Por lo tanto, las pongo por fuera del componente.

const initialForm = {
  name: "",
  constellation: "",
  id: null,
};

export default function CrudForm({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}) {
  const [form, setForm] = useState(initialForm);

  // Si cambia dataToEdit, cambiamos el contenido de los inputs
  useEffect(() => {
    setForm(dataToEdit ?? initialForm);
  }, [dataToEdit]);

  const handleChange = (e) => {
    // Se agregan los estados mediante el usuario vaya activando los inputs
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.constellation) {
      alert("Datos incompletos");
      return;
    }

    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div>
      <h3>{dataToEdit ? "Editar Caballero" : "Agregar Nuevo Caballero"}</h3>
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
