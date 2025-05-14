import React from "react";
import '../Styles/funcionario.css';
import { Link } from 'react-router-dom';

const CadastroFuncionario = () => {
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
        <div className="rectangle14">
          <h1 className="titulo">Cadastrar Funcionário</h1>
          <div className="mb-3" id="nome">
            <label htmlFor="formGroupExampleInput" className="form-label" id="letra">Nome:</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="nome" />
          </div>
          <div className="mb-3" id="telefone">
            <label htmlFor="formGroupExampleInput" className="form-label" id="letra">Telefone:</label>
            <input type="tel" className="form-control" id="formGroupExampleInput" placeholder="(00)00000-0000" />
          </div>
          <div className="mb-3" id="Salario">
            <label htmlFor="formGroupExampleInput" className="form-label" id="letra">Salário:</label>
            <input type="number" className="form-control" id="formGroupExampleInput" placeholder="Salário" />
          </div>
          <div className="col-12" id="Endereco">
            <label htmlFor="inputAddress" className="form-label" id="letra">Endereço</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
          </div>
          <button id="Cadastrar2" type="button" className="btn btn-light">Cadastrar</button>
        </div>
      </div>

      <div className="line2"></div>
      <footer className="Footer">
        <p>Nome da empresa</p>
        <p>Telefone</p>
        <p>Email de Contato</p>
      </footer>
    </>
  );
}

export default CadastroFuncionario;
