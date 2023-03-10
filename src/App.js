import { Routes, Route } from "react-router-dom";
import React from "react";
import StaffMain from "./screens/staff/main";
import Login from "./screens/login";
import AdminMain from "./screens/admin/main";
import ThreadDetails from "./screens/idea/threadDetails";
import "./styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/index.css";
import Thread from "./screens/idea/threads";
import IdeaDetail from "./screens/idea/ideaDetails";
import Navbar from "./screens/navbar";
import ErrorPage from "./screens/error";
import { AuthProvider, RequireAuth } from "./hooks/useAuth";
import Dashboard from "./screens/chart";

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route
                    path="/chart"
                    errorElement={<ErrorPage />}
                    element={<Dashboard />}
                />
                <Route
                    path="/"
                    errorElement={<ErrorPage />}
                    element={<Login />}
                />
                <Route
                    path="/threads/:id"
                    errorElement={<ErrorPage />}
                    element={
                        <>
                            <Navbar />
                            <ThreadDetails />
                        </>
                    }
                />
                <Route
                    path="/idea/:id"
                    errorElement={<ErrorPage />}
                    element={
                        <>
                            <Navbar />
                            <IdeaDetail />
                        </>
                    }
                />
                <Route
                    path="/threads"
                    errorElement={<ErrorPage />}
                    element={
                        <>
                            <Navbar />
                            <Thread />
                        </>
                    }
                />
                <Route element={<RequireAuth props={{ clearance: 1 }} />}>
                    <Route
                        path="/user/:params"
                        errorElement={<ErrorPage />}
                        element={
                            <>
                                <Navbar />
                                <StaffMain />
                            </>
                        }
                    />
                    <Route element={<RequireAuth props={{ clearance: 4 }} />}>
                        <Route
                            path="/admin"
                            errorElement={<ErrorPage />}
                            element={<AdminMain />}
                        />
                        <Route
                            path="/user/:params"
                            errorElement={<ErrorPage />}
                            element={
                                <>
                                    <Navbar />
                                    <StaffMain />
                                </>
                            }
                        />
                    </Route>
                    <Route element={<RequireAuth props={{ clearance: 2 }} />}>
                        <Route
                            path="/staff"
                            errorElement={<ErrorPage />}
                            element={<StaffMain />}
                        />
                        <Route
                            path="/user/:params"
                            errorElement={<ErrorPage />}
                            element={
                                <>
                                    <Navbar />
                                    <StaffMain />
                                </>
                            }
                        />
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default App;
