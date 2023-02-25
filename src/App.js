import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import StaffMain from "./screens/staff/main";
import Login from "./screens/login";
import AdminMain from "./screens/admin/main";
import IdeaMain from "./screens/idea/ideaMain";
import "./styles/main.scss";

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
            path: "/idea",
            element: <IdeaMain />,
        },
        {
            path: "/",
            element: <Login />,
        },
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
