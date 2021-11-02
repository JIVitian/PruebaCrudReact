import React from "react";

// Si hay un mensaje de error, lo manejo mediante este componente
export default function Message({ message, bgColor }) {
  let styles = {
    padding: "1rem",
    marginBottom: "1rem",
    textAlgin: "center",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: bgColor,
  };
  return (
    <div style={styles}>
      <p>{message}</p>
    </div>
  );
}
