import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getUserProfile } from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    if (!token) {
      setProfile(null);
      return;
    }
    const loadProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadProfile();
  }, [token]);
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  const user = token ? jwtDecode(token) : null;
  return (
    <AuthContext.Provider
      value={{ token, user, profile, setProfile, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
