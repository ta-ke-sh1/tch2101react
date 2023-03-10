import { Outlet, BrowserRouter as Router, useRoutes } from "react-router-dom";
import React from 'react'
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

const App = () => {

    return useRoutes([
        {
            path: "/staff",
            element: <StaffMain />,
        },
        {
            path: "/user/:params",
            element: <>
                <Navbar />
                <StaffMain />
            </>,
        },
        {
            path: "/admin",
            element: <AdminMain />,
        },
        {
            path: "/thread/:id",
            element: <><Navbar /><ThreadDetails /></>,
        },
        {
            path: "/idea/:id",
            element: <><Navbar /><IdeaDetail /></>,
        },
        {
            path: "/",
            element: <Login />,
        },
        {
            path: '/threads',
            element: <>
                <Navbar />
                <Thread />
            </>
        }
    ]);
};

const AppWrapper = () => {
    return (
        <Router>
            <App />
            <Outlet />
        </Router>
    );
};

export default AppWrapper;
