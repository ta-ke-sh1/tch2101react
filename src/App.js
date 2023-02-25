import { BrowserRouter as Router, useRoutes } from "react-router-dom";

const App = () => {
    return useRoutes([{ path: "/gallery", element: <Gallery /> }]);
};

const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default AppWrapper;
