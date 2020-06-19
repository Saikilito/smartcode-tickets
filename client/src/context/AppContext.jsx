import React, { useState, createContext } from "react";

const AppContext = createContext();
const { Provider, Consumer } = AppContext;

const AppProvider = ({ children }) => {
  const [navbarItemActive, setNavbarItemActive] = useState(0);

  const updateNavbarItemActive = (item) => {
    setNavbarItemActive(item);
  };

  return <Provider value={{ navbarItemActive, updateNavbarItemActive }}>{children}</Provider>;
};

export { AppProvider, Consumer as AppConsumer, AppContext };
