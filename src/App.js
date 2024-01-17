import React, {  } from "react";
import "./App.css";
 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import List from "./components/List";
import Edit from "./components/Edit";
import Add from "./components/Add";
import SaidaProduto from "./components/SaidaProduto";
import EntradaProduto from "./components/EntradaProduto";
import Gerencia from "./components/Gerencia";
 
function App() {
  return (
    <Router>
      <div className="App">

        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">Cadastrar produto</Link>
            </li>
            <li className="nav-item">
              <Link to="/entradaProduto" className="nav-link">Entrada produto</Link>
            </li>
            <li className="nav-item">
              <Link to="/saidaProduto" className="nav-link">Baixa produto</Link>
            </li>
            <li className="nav-item">
              <Link to="/gerencia" className="nav-link">Gerência</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<List />} />
          <Route exact path="/add" element={<Add />} />
          <Route exact path="/edit/:id" element={<Edit />} />
          <Route exact path="/entradaProduto" element={<EntradaProduto />} />
          <Route exact path="/saidaProduto" element={<SaidaProduto />} />
          <Route exact path="/gerencia" element={<Gerencia />} />
        </Routes>
      </div>
    </Router>
  );
}
 
export default App;
