
import './App.css';

import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" exact element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
