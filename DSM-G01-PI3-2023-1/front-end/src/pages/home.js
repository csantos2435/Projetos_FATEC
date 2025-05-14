import React from "react";
import '../Styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="corFundo">
      <nav id="Nav" className="navbar">
          <div className="navbar-container">
            <button id="item0" type="button" className="btn btn-outline-light">
              <Link to="/Home/6" className="nav-link">Home</Link>
            </button>
            <button id="item1" type="button" className="btn btn-outline-light">
              <Link to="/CadastroFuncionario/2" className="nav-link">Funcionário</Link>
            </button>
            <button id="item2" type="button" className="btn btn-outline-light">
              <Link to="/CadastroCliente/3" className="nav-link">Cliente</Link>
            </button>
            <button id="item3" type="button" className="btn btn-outline-light">
              <Link to="/CadastroServico/4" className="nav-link">Serviços</Link>
            </button>
            <button id="item4" type="button" className="btn btn-outline-light">
              <Link to="/AgendarHorario/5" className="nav-link">Agendar</Link>
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
