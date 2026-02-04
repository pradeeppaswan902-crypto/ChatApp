
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // user sirf frontend reference ke liye
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("ChatAppUser")) || null
  );

  const [isLogin, setIsLogin] = useState(!!user);

  useEffect(() => {
    setIsLogin(!!user);

    if (user) {
      sessionStorage.setItem("ChatAppUser", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("ChatAppUser");
    }
  }, [user]);

  const value = {
    user,
    setUser,
    isLogin,
    setIsLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
