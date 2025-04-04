import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import refreshToken from "../utils/RefreshToken";
import instance from "../utils/axiosInstance";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    userRole: "",
    userId: null,
    isLoading: true,
  });
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken()
      .then((response) => {
        if (response) {
          const jwt = response.data;
          setToken(jwt);
          const decoded = jwtDecode(jwt);
          setAuthState({
            userRole: decoded.role,
            userId: decoded.id,
            isLoading: false,
          });
        } else {
          console.log("No token found");
          setAuthState({ userRole: "", userId: null, isLoading: false });
        }
      })
      .catch(() => {
        setAuthState({ userRole: "", userId: null, isLoading: false });
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      refreshToken()
        .then((response) => {
          if (response) {
            const jwt = response.data;
            setToken(jwt);
          } else {
            setToken(null);
          }
        })
        .catch((error) => {
          console.error("Failed to refresh token", error);
          setToken(null);
        });
    }, 15 * 60 * 1000); // Refresh token every 15 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  const login = (jwt) => {
    setToken(jwt);
    const decoded = jwtDecode(jwt);
    setAuthState({ userRole: decoded.role, isLoading: false });
  };

  const logout = async () => {
    // remove cookie
    await instance.get("api/auth/logout");
    setToken(null);
    setAuthState({ userRole: "", userId: null, isLoading: false });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
