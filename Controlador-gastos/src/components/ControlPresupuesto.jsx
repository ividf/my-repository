import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  setIsValidPresupuesto,
  presupuesto,
  gastos,
  setPresupuesto,
  setGastos,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  const [porcentaje, setPorcentaje] = useState();

  useEffect(() => {
    console.log(presupuesto);

    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    ); //el redux lo que hace es acumular,te pide un parametro donde se acumulan las cosas y otra que es lo que va a acumular, y por ultimo donde empieza la acumulacion,y como es un efeect se va a ejecutar,por lo tanto acumular cada vez que cambien los gastos
    const totalDisponible = presupuesto - totalGastado;

    // calcular el porcentaje gastado
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2); //el toFixed hace que solo salgan 2 decimales
    setPorcentaje(nuevoPorcentaje);
    setDisponible(totalDisponible);
    setGastado(totalGastado);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  const handleResetApp = () => {
    const resultado = confirm("¿Deseas reiniciar presupuesto y gastos?");

    if (resultado) {
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        ></CircularProgressbar>
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app " type="burron" onClick={handleResetApp}>
          Resetear app
        </button>
        <p>
          <span>Disponible</span> {formatearCantidad(Number(presupuesto))}
        </p>
        <p>
          <span className={`${disponible < 0 ? "negativo" : ""}`}>
            Disponible
          </span>{" "}
          {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
