import './styles.css'
import { BrowserRouter, Routes, Route } from "react-router/ react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <h1>The Fog QA</h1>
      <Routes>
        <Route path="/" component={App} />
      </Routes>
    </BrowserRouter>
  )
}

export default App