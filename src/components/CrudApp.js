import React, { useState } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";

const initialDB = [
  {
    id: 1,
    name: "Seiya",
    constellation: "Pegaso",
  },
  {
    id: 2,
    name: "Shiryu",
    constellation: "Dragon",
  },
  {
    id: 3,
    name: "Hyoga",
    constellation: "Cisne",
  },
  {
    id: 4,
    name: "Shun",
    constellation: "Andrómeda",
  },
  {
    id: 5,
    name: "Ikki",
    constellation: "Fénix",
  },
];

const localDB = JSON.parse(localStorage.getItem("zodiaco")) ?? initialDB;

export default function CrudApp() {
  const [db, setDb] = useState(localDB);
  const [dataToEdit, setDataToEdit] = useState(null);

  const saveLocal = (data) => {
    localStorage.setItem("zodiaco", JSON.stringify(data));
  };

  // Crea un nuevo registro en la "Base de datos"
  const createData = (data) => {
    data.id = Date.now();
    const newData = [...db, data];
    setDb(newData);
    saveLocal(newData);
  };

  const updateData = (data) => {
    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
    saveLocal(newData);
  };

  const deleteData = (id) => {
    let isDelete = window.confirm(
      `Está seguro de eliminar el registro con el id = ${id}?`
    );

    if (isDelete) {
      let newData = db.filter((el) => el.id !== id);
      setDb(newData);
      saveLocal(newData);
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>CRUD App</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        <CrudTable
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
      </article>
    </div>
  );
}
