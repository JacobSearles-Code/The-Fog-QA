import './styles.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard.jsx";
import Layout from "./Components/Layout.jsx";
import Report from "./Pages/Report.jsx";
import LoginPage from "./Pages/Login.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import ReportBoard from "./Pages/ReportBoard.jsx";
import ReportComment from "./Pages/ReportComment.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/home" element={<Dashboard />} />
                        <Route path="/report" element={<Report />} />
                        <Route path="/board" element={<ReportBoard />} />
                        <Route path="/report/:id" element={<ReportComment />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
