import React from "react";

export default function CrudTableRow({ el, setDataToEdit, deleteData }) {
  let { name, constellation, id } = el;

  return (
    <tr>
      <th>{name}</th>
      <th>{constellation}</th>
      <th>
        <button onClick={() => setDataToEdit(el)}>Editar</button>
        <button onClick={() => deleteData(id)}>Eliminar</button>
      </th>
    </tr>
  );
}
