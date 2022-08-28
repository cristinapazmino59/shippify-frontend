import { useState, useEffect, createContext } from "react";

//Initial state
const initialState = {
  loggedUser: null,
  isAuthenticated: false,
  toggleAuth: () => null,
};

export const AuthContext = createContext(initialState);

//Component provider
const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState({
    loggedUser: null,
    isAuthenticated: false,
  });

  const toggleAuth = (user) =>
    setIsLoggedIn({
      loggedUser: user,
      isAuthenticated: !isLoggedIn.isAuthenticated,
    });


  useEffect(() => {
      const userStorage = JSON.parse(localStorage.getItem("newUser"));
      if(userStorage) {
        setIsLoggedIn({ loggedUser: userStorage, isAuthenticated: true })
      } 
    }, []);

  return (
    <AuthContext.Provider value={{ ...isLoggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;