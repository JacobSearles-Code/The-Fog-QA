import HeaderBar from "./HeaderBar.jsx";
import {Outlet} from "react-router-dom";

const Layout = () => {

    return (
        <div>
            <HeaderBar />

            <Outlet />
        </div>
    )
}

export default Layout;