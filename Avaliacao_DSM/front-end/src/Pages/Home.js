import React from "react";
import '../Styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="corFundo">
      <nav className="navbar">
          <div className="navbar-container">
            <button id="item1" type="button" className="btn btn-outline-light">
              <Link to="/" className="nav-link">Home</Link>
            </button>
            <button id="item2" type="button" className="btn btn-outline-light">
              <Link to="/Funcionario/2" className="nav-link">Funcionario</Link>
            </button>
          </div>
        </nav>
        <div className="container">
          <div className="square">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" />
            <p className="welcome">Welcome</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;