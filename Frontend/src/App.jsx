import './styles.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Dashboard from "./Pages/Dashboard.jsx";
import Layout from "./Components/Layout.jsx";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />} >
                <Route path="/" element={<Dashboard />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App