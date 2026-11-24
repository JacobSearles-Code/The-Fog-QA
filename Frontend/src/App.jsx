import './styles.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Dashboard from "./Pages/Dashboard.jsx";
import Layout from "./Components/Layout.jsx";
import Report from "./Pages/Report.jsx";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />} >
                <Route path="/" element={<Dashboard />} />
                <Route path="/report" element={<Report />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App