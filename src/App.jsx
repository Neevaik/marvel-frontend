import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import CharacterDetails from "./pages/CharacterDetails";
import Comics from "./pages/Comics";

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/character-details/:id" element={<CharacterDetails />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
