import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import React from 'react'
import StaffMain from "./screens/staff/main";
import Login from "./screens/login";
import AdminMain from "./screens/admin/main";
import ThreadDetails from "./screens/idea/threadDetails";
import "./styles/main.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./styles/index.css";
<<<<<<< HEAD


=======
import Thread from "./screens/idea/threads";
import IdeaDetail from "./screens/idea/ideaDetails";
>>>>>>> 9aebab8a69f899c25183dbaebc828357a6ba67e2

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
            path: "/thread/:id",
            element: <ThreadDetails />,
        },
        {
            path: "/idea/:id",
            element: <IdeaDetail />,
        },
        {
            path: "/",
            element: <Login />,
        },
        {
<<<<<<< HEAD
            path: "/idea",
            element: <IdeaMain />,
        },
        
       
=======
            path: '/threads',
            element: <Thread />
        }
>>>>>>> 9aebab8a69f899c25183dbaebc828357a6ba67e2
    ]);
};

const AppWrapper = () => {
    return (
        <Router>

            <div className="mt-5">
                <App />
            </div>

        </Router>
    );
};

export default AppWrapper;
