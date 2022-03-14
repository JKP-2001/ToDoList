
import './App.css';
import NoteState from './context/notecontext/NoteState';
import {useState} from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Navbar from "./components/navbar";
import Alert from "./components/Alert"
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (type,message)=>
  setAlert({
    msg:message,
    type:type
  },
  setTimeout(()=>{
    setAlert(null);
  },2000));
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
