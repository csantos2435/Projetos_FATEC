import React, { useState} from "react";
import '../Styles/CadastrarFun.css';
import { Link } from 'react-router-dom';

const CadastroFuncionario = () => {

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [salario, setSalario] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleConfirm = () => {
    const data = {
      nome,
      telefone,
      salario,
      endereco
    };

    fetch('http://localhost:3000/funcionarios', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      document.location.reload()
    })
  };

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
        <div className="rectangle14">
          <h1 className="titulo">Cadastrar Funcionário</h1>
          <div className="mb-3" id="nome">
            <label htmlFor="formGroupExampleInput" className="form-label" id="letra">Nome</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="nome" value={nome} onChange={e => setNome(e.target.value)}/>
          </div>
          <div className="mb-3" id="telefone">
            <label htmlFor="formGroupExampleInput" className="form-label" id="letra">Telefone</label>
            <input type="tel" className="form-control" id="formGroupExampleInput" placeholder="(00)00000-0000" value={telefone} onChange={e => setTelefone(e.target.value)}/>
          </div>
          <div className="mb-3" id="Salario">
            <label htmlFor="formGroupExampleInput" className="form-label" id="letra">Salário</label>
            <input type="number" className="form-control" id="formGroupExampleInput" placeholder="Salário" value={salario} onChange={e => setSalario(e.target.value)} />
          </div>
          <div className="col-12" id="Endereco">
            <label htmlFor="inputAddress" className="form-label" id="letra">Endereço</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={endereco} onChange={e => setEndereco(e.target.value)}/>
          </div>
          <button id="Cadastrar2" type="button" className="btn btn-light" onClick={handleConfirm}>Cadastrar</button>
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
