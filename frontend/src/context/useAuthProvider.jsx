/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const initialToken = localStorage.getItem("token");

  const [token, setToken] = useState(initialToken ? initialToken : null);

  return (
    <AuthContext.Provider value={[token, setToken]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
