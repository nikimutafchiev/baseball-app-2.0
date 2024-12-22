import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("access_token") || "");
    const [user, setUser] = useState(token != "" ? jwtDecode(token).user : null);
    const navigate = useNavigate();
    const login = async (userData) => {

        try {
            const response = await fetch("http://localhost:6363/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const res = await response.json();
            if (response.status == 200) {
                console.log(response.status);
                setToken(res.access_token);
                setUser(jwtDecode(res.access_token).user);
                localStorage.setItem("access_token", res.access_token);
                navigate("/");
                return 0;
            }
            return -1;
        } catch (err) {
            console.error(err);
        }
    };

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("access_token");
        navigate("/");
    };

    const signup = async (userData) => {
        try {
            const response = await fetch("http://localhost:6363/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if (response.status == 200) {
                alert("Succefully signed up")
                navigate("/login");
                return 0;
            }
            return -1;
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => { navigate("/") }, [user]);
    return (
        <AuthContext.Provider value={{ token, user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);