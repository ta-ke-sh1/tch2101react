import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import React from 'react'
import StaffMain from "./screens/staff/main";
import Login from "./screens/login";
import AdminMain from "./screens/admin/main";
import IdeaMain from "./screens/idea/ideaMain";
import "./styles/main.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./styles/index.css";
import Navbar from "./screens/login"
import Thread from "./screens/test";

const App = () => {

    return useRoutes([
        {
            path: "/staff",
            element: <StaffMain />,
        },
        {
            path: "/admin",
            element: <AdminMain />,
        },
        {
            path: "/idea/:id",
            element: <IdeaMain />,
        },
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/test",
            element: <Test />,
        },
        {
            path: '/thread',
            element: <Thread />
        }
    ]);
};

const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default AppWrapper;
