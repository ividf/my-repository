import React, { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [mensaje, setMensaje] = useState("");
  const handlePresupuesto = (e) => {
    //este handle lo que hace es validar los datos,que no sea un numero negativo y que sean numeros,ya que  de por si sale string, con el number lo transforma
    /*  if (!Number(presupuesto) || Number(presupuesto) < 0) {
       setMensaje("No es un presupuesto valido"); */
    e.preventDefault();
    if (!presupuesto || presupuesto < 0) {
      //le quito el number aqui ,porque en el imput yañpuse que solo podian ser numeros
      setMensaje("No es un presupuesto valido");

      return;
    }
    setMensaje(" ");
    setIsValidPresupuesto(true);
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label>Define tu presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu Presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)} //le vamos pasando al state el valor del formulario para tenerlo en el app
          ></input>
        </div>
        <input type="submit" value="Añadir"></input>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
