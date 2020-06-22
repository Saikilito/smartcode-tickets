import React, { useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import { fetcher } from "../helpers";

const AuthContext = createContext();
const { Provider, Consumer } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState(null);

  async function login(user) {
    const response = await fetcher("/user/signin", "POST", user, false);

    if (!response || !response.ok) {
      if (!response) return "An unexpected error has occurred";
      return response.message;
    }

    window.localStorage.setItem("__jw__", response.token);
    const { user: userResponse } = response;
    const {
      id_tipouser: { nombre },
    } = userResponse;
    setUser({ ...userResponse, rol: nombre });
    history.push("/home");
  }

  function loginToken(user) {
    const validUser = gooUser(user);

    if (validUser) {
      setUser(user);
      return true;
    }
    window.localStorage.clear();
    throw new Error("Not Valid User");
  }

  function logout() {
    setUser(null);
    window.localStorage.clear();
    return history.push("/signin");
  }

  async function register(user) {
    user.rol = "user";

    const response = await fetcher("/user/add", "POST", user, false);

    if (!response || !response.ok) {
      if (!response || !response.message) return "An unexpected error has occurred";
      return response.message;
    }

    window.localStorage.setItem("__jw__", response.token);
    const { user: userResponse } = response;
    const {
      id_tipouser: { nombre },
    } = userResponse;

    setUser({ ...userResponse, rol: nombre });

    return history.push("/home");
  }

  function gooUser(user) {
    const { id, nombre, mail, rol } = user;

    if (id && nombre && mail && rol) {
      if ((typeof id === "number", typeof mail === "string")) {
        if (rol === "user" || rol === "admin") {
          return true;
        }
      }
      return false;
    }
  }

  return <Provider value={{ user, login, logout, register, loginToken }}>{children}</Provider>;
};

export { AuthProvider, Consumer as AuthConsumer, AuthContext };
