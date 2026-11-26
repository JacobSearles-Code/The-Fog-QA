import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const HeaderBar = () => {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            console.log("Checking authentication...");

            try {
                const response = await axios.get(
                    'http://localhost:3000/check-auth',
                    {withCredentials: true}
                );

                console.log("AUTH RESPONSE:", response.data);
                setUser(response.data);

            } catch (error) {
                console.log("AUTH ERROR:", error.message);
                console.log("ERROR RESPONSE:", error.response?.data);
                setUser(null);
            }

            console.log("Authentication request finished.");
        };

        checkAuth();
    }, [location.pathname]);

    const handleLogOut = async () => {
        try {
            const {data} = await axios.post(
                'http://localhost:3000/logout',
                {},
                {withCredentials: true}
            );

            console.log(data.message);

            setUser(null);
            navigate('/');

        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    return (
        <header>
            <h1>The Fog: QA</h1>
            <nav>
                <Link className="navLink" to="/home">Dashboard</Link>
                <Link className="navLink" to="/report">Submit a Report</Link>
                <Link className="navLink" to="/board">Report Board</Link>
            </nav>
            <div className="userDiv">
                {user ? (
                    <>
                        <p>Welcome, {user.username}!</p>
                        <button onClick={handleLogOut}>Logout</button>
                    </>
                ) : (
                    <>
                        <p>Please Log in!</p>
                        <button onClick={() => navigate("/")}>Log in</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default HeaderBar;