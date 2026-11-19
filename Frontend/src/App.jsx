import './styles.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserContainer from "./Components/UserContainer.jsx";

function App() {

  return (
    <BrowserRouter>
      <h1>The Fog QA</h1>
        <UserContainer />
    </BrowserRouter>
  )
}

export default App