import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // Check existing login
  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);

  }, []);


  // Register
  const register = async (userData) => {

    const response = await api.post(
      "/auth/register",
      userData
    );

    return response.data;
  };


  // Login
  const login = async (userData) => {

    const response = await api.post(
      "/auth/login",
      userData
    );


    const { token, user } = response.data;


    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );


    setUser(user);

    return response.data;
  };


  // Logout
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>
  );

};


// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};