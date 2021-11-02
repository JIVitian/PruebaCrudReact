import React, { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import Message from "./Message";

export default function CrudApi() {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = helpHttp();
  let url = "http://localhost:5000/santos";

  useEffect(() => {
    setLoading(true);

    api.get(url).then((res) => {
      console.log(res);

      setDb(!res.err ? res : null);
      setError(!res.err ? null : res);

      setLoading(false);
    });
  }, [url]);
  // Si pusiera la constante api en la dependencia, se produciría un loop infinito llamando a la funcion que guarda la constante

  // Necesito consultar el metodo POST de mi helper
  const createData = (data) => {
    data.id = Date.now();

    // En este caso, debo agregar en el body el tipo de contenido que va a enviar la petición
    // sino me guardará solo el id en el servidor. Esto dependerá de la API que consultemos.
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      if (!res.err) setDb([...db, res]);
      else setError(res);
    });
    setDb([...db, data]);
  };

  // Para actualizar los datos en el servidor, necesito hacer una petición del tipo PUT
  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      if (!res.err) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
      } else setError(res);
    });
  };

  const deleteData = (id) => {
    let endpoint = `${url}/${id}`;

    let isDelete = window.confirm(
      `¿Está seguro de eliminar el registro con el id = ${id}?`
    );

    if (isDelete) {
      let options = {
        headers: { "content-type": "application/json" },
      };

      api.del(endpoint, options).then((res) => {
        if (!res.err) {
          let newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else setError(res);
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>CRUD API</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading && <Loader />}
        {error && (
          <Message
            message={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        {db && (
          <CrudTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
      </article>
    </div>
  );
}
