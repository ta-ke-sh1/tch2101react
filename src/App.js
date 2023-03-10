import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import React, { useContext, createContext, useState, useMemo } from 'react'
import StaffMain from "./screens/staff/main";
import Login from "./screens/login";
import AdminMain from "./screens/admin/main";
import ThreadDetails from "./screens/idea/threadDetails";
import "./styles/main.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./styles/index.css";
import Thread from "./screens/idea/threads";
import IdeaDetail from "./screens/idea/ideaDetails";
import Navbar from "./screens/navbar";
import ErrorPage from './screens/error'
import { decodeToken } from "./utils/utils";

const AuthContext = createContext();

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" errorElement={<ErrorPage />} element={<Login />} />
                <Route path="/threads/:id" errorElement={<ErrorPage />} element={<><Navbar /><ThreadDetails /></>} />
                <Route path="/idea/:id" errorElement={<ErrorPage />} element={<><Navbar /><IdeaDetail /></>} />
                <Route path="/threads" errorElement={<ErrorPage />} element={<>
                    <Navbar />
                    <Thread />
                </>} />
                <Route element={<RequireAuth />}>
                    <Route path="/user/:params" errorElement={<ErrorPage />} element={<>
                        <Navbar />
                        <StaffMain />
                    </>} />
                    <Route element={<RequireAuth props={{ role: 'Admin' }} />}>
                        <Route path="/admin" errorElement={<ErrorPage />} element={<AdminMain />} />
                        <Route path="/user/:params" errorElement={<ErrorPage />} element={<>
                            <Navbar />
                            <StaffMain />
                        </>} />
                    </Route>
                    <Route element={<RequireAuth props={{ role: 'Staff' }} />}>
                        <Route path="/staff" errorElement={<ErrorPage />} element={<StaffMain />} />
                        <Route path="/user/:params" errorElement={<ErrorPage />} element={<>
                            <Navbar />
                            <StaffMain />
                        </>} />
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem('access_token'));

    const login = async (data) => {
        setToken(data)
    }

    const logout = () => {
        setToken(null);
        navigate("/", { replace: true });
    }
    let value = useMemo(() => ({ token, login, logout }), [token]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function RequireAuth({ props }) {
    let auth = useAuth();

    if (!auth.token) {
        return <Navigate to='/' />
    }

    if (props) {
        var decoded = decodeToken(auth.token);
        var roles = decoded.role;
        if (decoded && !roles.includes(props.role)) {
            console.log('Does not include role: ' + props.role);
            return <Navigate to='/' />
        }
    }

    return <Outlet />
}

export default App;
