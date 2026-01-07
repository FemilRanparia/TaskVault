import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/auth/me")
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser({
      id: res.data.id,
      name: res.data.name,
      email: res.data.email
    });
  };

  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", {
      name,
      email,
      password
    });
    localStorage.setItem("token", res.data.token);
    setUser({
      id: res.data.id,
      name: res.data.name,
      email: res.data.email
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

 return (
  <AuthContext.Provider value={{ user, login, register, logout, loading }}>
    {children}
  </AuthContext.Provider>
);

};

export const useAuth = () => useContext(AuthContext);
