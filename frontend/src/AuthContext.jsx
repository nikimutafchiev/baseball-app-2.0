import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import useSWR from 'swr';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("access_token") || "");
    const [user, setUser] = useState(token != "" ? jwtDecode(token).user : null);
    const navigate = useNavigate();
    const location = useLocation();
    // const logged = useSWR(`http://localhost:6363/is_logged/?username=${user ? user.username : "''"}&password=${user ? user.password : "''"}`, (url) => fetch(url).then((res) => res.json()));
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
            if (response.ok) {
                setToken(res.access_token);
                setUser(jwtDecode(res.access_token).user);
                localStorage.setItem("access_token", res.access_token);
                if (location.pathname == "/login")
                    navigate("/");
                return 0;
            }
            else {
                if (user)
                    logout();
                return -1;
            }
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
                body: JSON.stringify({ ...userData, role: "USER" }),
            });
            if (response.ok) {
                alert("Successfully signed up")
                navigate("/login");
                return 0;
            }
            return -1;
        } catch (err) {
            console.error(err);
        }
    }

    // const is_logged = async () => {
    //     if (logged.error)
    //         logout();
    // }
    // useEffect(() => {
    //     if (user) {
    //         is_logged();
    //     }
    // }, [logged.data, location.pathname]);
    return (
        <AuthContext.Provider value={{ token, user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);