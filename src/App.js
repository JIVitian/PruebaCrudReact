// Pequeño CRUD de los caballeros del zodiaco
import React from "react";
import CrudApi from "./components/CrudApi";
import CrudApp from "./components/CrudApp";

function App() {
  return (
    <div className="App">
      <h1>Pruebas con React</h1>
      <CrudApi />
      <hr />
      <CrudApp />
      <hr />
    </div>
  );
}

export default App;
