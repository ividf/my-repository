import { useEffect, useState } from "react";
import Filtros from "./components/Filtros";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGasto";
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );

  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos")) //parse para que lo vuelva a poner en array,porque en el local es string siempre
      : []
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false); //inicia en false porque al principio no sabemos si el valor es valido o no hasta que se valide
  const [modal, setModal] = useState(false);

  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []); //stringifyporque en local no puede haber arrays
  }, [gastos]);
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []); //esto lo que hace es que mira si en localStorage hay un presupuesto mayor de 0,si es asi directamente pasa el presupuesto a valido por lo que la proxima vez que entrar ya entrar a la otra pagina directamente(la de la grafica)

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
      setGastosFiltrados(gastosFiltrados); //metemos los datos filtrados en un state nuevo para no perder los demas
    }
  }, [filtro]);

  const handleNuevoGasto = () => {
    setGastoEditar({});
    console.log("hola");
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
    console.log(gastos);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //acrtualizamos
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      ); //si el id coincide con un gasto , lo modifica
      setGastos(gastosActualizados);
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
      setGastoEditar({});
      //nuevo
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gastos) => gastos.id !== id); //esto lo que hace es que me devuelve un objeto de todos los gastos MENOS el que tiene esa id,que en ese caso es el que queremos eliminar
    setGastos(gastosActualizados); //seteamos el state con los nuevos gastos para que no salgan los viejos
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        setGastos={setGastos}
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      ></Header>
      {isValidPresupuesto ? (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro}></Filtros>
            <ListadoGastos
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
              eliminarGasto={eliminarGasto}
              setGastoEditar={setGastoEditar}
              gastos={gastos}
            ></ListadoGastos>
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      ) : null}
      {modal && (
        <Modal
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
        ></Modal>
      )}
    </div>
  );
}

export default App;
