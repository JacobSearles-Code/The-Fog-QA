import './styles.css'
import { BrowserRouter } from "react-router-dom"
import Dashboard from "./Pages/Dashboard.jsx";

function App() {

  return (
    <BrowserRouter>
      <h1>The Fog QA</h1>
        <Dashboard />
    </BrowserRouter>
  )
}

export default App