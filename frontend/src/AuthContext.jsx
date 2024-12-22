import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const login = (userData) => {
        setUser({ ...userData, role: "user" });
    };

    const logout = () => {
        setUser(null);
    };
    useEffect(() => { navigate("/") }, [user]);
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);