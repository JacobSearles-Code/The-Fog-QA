import {Link} from "react-router-dom";

const HeaderBar = () => {
    return (
        <header>
            <h1>The Fog: QA</h1>
            <nav>
                <Link className="navLink" to="/">Dashboard</Link>
                <Link className="navLink" to="/report">Submit a Report</Link>
            </nav>
        </header>
    )
}

export default HeaderBar