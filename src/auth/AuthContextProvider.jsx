import React, { useState , createContext }  from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [Auth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");
  const handleLogin = (token) => {
    setIsAuth(!Auth);
    setToken(token);
  };
  const handleLogout = () => {
    setIsAuth(!Auth);
    setToken("");
  };
  const value = { Auth, handleLogin, handleLogout, token, setIsAuth };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };