import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import refreshToken from '../utils/refreshToken'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ userRole:"", isLoading: true })
    const [token, setToken] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        refreshToken().then((response) => {
            if (response){
                const jwt = response.data
                setToken(jwt)
                const decoded = jwtDecode(jwt)
                setAuthState({ userRole: decoded.role, isLoading: false })
            } else {
                setAuthState({ userRole: "", isLoading: false })
            }
        }).catch(()=> {
            setAuthState({ userRole: "", isLoading: false })
            navigate('/login')
        })
    }, [navigate])

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

    // const logout = async () => {
    //     // remove cookie
    //     await instance.get("/api/auth/logout")
    //     setToken(null);
    //     setAuthState({ userRole: "", isLoading: false });
    //     navigate("/");
    // };

    return (
        <AuthContext.Provider value={{ ...authState, login, token }}>
            {children}
        </AuthContext.Provider>
    );


}