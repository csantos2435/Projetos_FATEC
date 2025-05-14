import React, { useEffect, useState } from 'react';
import "../Styles/Agendar.css";
import { Link } from "react-router-dom";

const AgendarHorarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [servico, setServico] = useState([]);
  const [observacao, setObservacao] = useState([]);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('');
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [servicoSelecionado, setServicoSelecionado] = useState('');

  useEffect(() => {

    fetch('http://localhost:3000/funcionarios')
      .then(response => response.json())
      .then(data => setFuncionarios(data));

    fetch('http://localhost:3000/clientes')
      .then(response => response.json())
      .then(data => setCliente(data));
    
    fetch('http://localhost:3000/servicos')
      .then(response => response.json())
      .then(data => setServico(data));
  }, []);

  const handleFuncionarioChange = (event) => {
    setFuncionarioSelecionado(event.target.value);
  };

  const handleClienteChange = (event) => {
    setClienteSelecionado(event.target.value);
  };

  const handleServicoChange = (event) => {
    setServicoSelecionado(event.target.value);
  };

  const handleCadastrarClick = () => {
    fetch('http://localhost:3000/agendamentos', {
      method: 'POST',
      body: JSON.stringify({
        funcionario: funcionarioSelecionado,
        cliente: clienteSelecionado,
        servico: servicoSelecionado,
        observacao: observacao
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
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
          <h1 className="titulo">Agendar Horários</h1>
          <div className="SeleF">
            <label htmlFor="funcionarioInput" className="form-label" id="letra">
                Selecione Funcionário
              <select className='form-control' list='funcionarioOptions' id='funcionarioInput' value={funcionarioSelecionado} onChange={handleFuncionarioChange}>
                <option value="">Selecione um funcionário</option>
                  {funcionarios.map(funcionario => (
                <option key={funcionario.id} value={funcionario.id}>
                  {funcionario.nome}
                </option>
                ))}
              </select>
            </label>
          </div>
          <div className="SeleC">
            <label htmlFor="clienteInput" className="form-label" id="letra">
              Selecione Cliente
              <select className='form-control' list='clienteOptions' id='clienteInput' value={clienteSelecionado} onChange={handleClienteChange}>
                <option value="">Selecione um Cliente</option>
                  {cliente.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.email}
                </option>
                ))}
              </select>
            </label>
          </div>
          <div className="SeleS">
            <label htmlFor="servicoInput" className="form-label" id="letra">
              Selecione o Serviço
              <select className='form-control' list='servicoOptions' id='servicoInput' value={servicoSelecionado} onChange={handleServicoChange}>
                <option value="">Selecione um Servico</option>
                  {servico.map(servico => (
                <option key={servico.id} value={servico.id}>
                  {servico.descricao}
                </option>
                ))}
              </select>
            </label>
          </div>

          <div className="SeleO">
            <label htmlFor="inputAddress" className="form-label" id="letra">Observação</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="Observação" value={observacao} onChange={e => setObservacao(e.target.value)}/>
          </div>
          <button id="Cadastrar4" type="button" className="btn btn-light" onClick={handleCadastrarClick}>
            Cadastrar
          </button>
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
};

export default AgendarHorarios;

