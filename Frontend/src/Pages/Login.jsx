import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import HeaderBar from "../Components/HeaderBar.jsx";

const LoginPage = () => {
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();


    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setLogin((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const validateLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                'http://localhost:3000/login',
                login,
                { withCredentials: true }
            );

            console.log(data.message);
            navigate('/home');

        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    return (
        <div className="loginDiv">
            <HeaderBar />
            <h1>Login</h1>
            <form className="loginForm" onSubmit={validateLogin}>
                <label>Email: </label><input required type="text" name="email" placeholder="Email" onChange={handleOnChange} value={login.email}/>
                <label>Password: </label><input required type="password" name="password" placeholder="Password" onChange={handleOnChange} value={login.password}/>
                <button>Log in</button>
            </form>
        </div>
    )
}

export default LoginPage;