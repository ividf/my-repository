import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../fotos/logout1.png";
import perfil from "../fotos/perfil.svg";

function Auth() {
  const { user, logout } = useContext(AuthContext);

  return user ? (
    <section className="userLoged">
      <NavLink className="navToDetailUser" to={`/user/${user.id}`}>
        <img
          className="perfil"
          src={perfil}
          alt="Página no encontrada, haz click aquí para volver a la página principal"
        />{" "}
      </NavLink>
      <br></br>
      <button className="logout" onClick={() => logout()}>
        {" "}
        <img
          src={logo}
          alt="Página no encontrada, haz click aquí para volver a la página principal"
        />
      </button>
    </section>
  ) : (
    <section className="userLoged">
      <NavLink to="/login" className="init">
        Login
      </NavLink>
    </section>
  );
}
export default Auth;
