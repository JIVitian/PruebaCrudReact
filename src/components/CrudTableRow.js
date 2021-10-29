import React from "react";

export default function CrudTableRow({ el }) {
  return (
    <tr>
      <th>{el.name}</th>
      <th>{el.constellation}</th>
      <th>
        <button>Editar</button>
        <button>Eliminar</button>
      </th>
    </tr>
  );
}
