import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    if (!token) {
        // user is not authenticated
        return <Navigate to="/" />;
    }
    return children;
};