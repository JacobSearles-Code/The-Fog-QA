
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('http://localhost:3000/check-auth', { withCredentials: true });

                setAuthenticated(true);

            } catch (error) {
                setAuthenticated(false);
                console.log(error);
            }
        };

        checkAuth();
    }, []);

    if (authenticated === null) {
        return <p>Checking authentication...</p>;
    }

    if (!authenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
