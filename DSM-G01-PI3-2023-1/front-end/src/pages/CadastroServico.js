import React, { useState } from "react";
import '../Styles/CadastroSer.css';
import { Link } from 'react-router-dom';

const CadastroServico = () => {
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [observacao, setObservacao] = useState('');

  const [data, setData] = useState("");
  const [hora, setHorario, ] = useState(""); // Estado para armazenar o horário selecionado
  // const [local, setLocal] = useState('');

  const handleConfirm = () => {
    const dataServico = {
      descricao,
      preco,
      observacao,
      disponivel: "6493a52af65ce38414cd2d58"
    };

    fetch('http://localhost:3000/servicos', {
      method: 'POST',
      body: JSON.stringify(dataServico),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      document.location.reload()
    })
  };

  // const handleConfirmDisponivel = () => {
  //   const dataDisponivel = {
  //     data,
  //     hora,
  //     local
  //   };

  //   fetch('http://localhost:3000/servicos', {
  //     method: 'POST',
  //     body: JSON.stringify(dataDisponivel),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then((response) => {
  //     closeModal()
  //   })
  // };
  
  const horarios = [];

  for (let hora = 0; hora <= 23; hora++) {
    const horarioFormatado = hora.toString().padStart(2, "0") + ":00";
    horarios.push(<option value={horarioFormatado}>{horarioFormatado}</option>);
  }

  const datas = [];
  const hoje = new Date();
  for (let i = 0; i < 7; i++) {
    const dataAtual = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + i);
    const dataFormatada = dataAtual.toLocaleDateString("pt-BR");
    datas.push(<option value={dataFormatada}>{dataFormatada}</option>);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          <h1 className="titulo3">Cadastrar Serviços</h1>
          <div className="mb-3" id="Descricao">
            <label htmlFor="formGroupExampleInput" className="form-label" id="letra">Descrição</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)}/>
          </div>
          <div className="mb-3" id="Observacao">
            <label htmlFor="formGroupExampleInput" className="form-label" id="letra">Observação</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Obseração" value={observacao} onChange={e => setObservacao(e.target.value)}/>
          </div>
          <div className="mb-3" id="preco">
            <label htmlFor="formGroupExampleInput" className="form-label" id="letra">Preço</label>
            <input type="number" className="form-control" id="formGroupExampleInput" placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)}/>
          </div>
          <button type="button" className="btn btn-light" id="botaoC" onClick={openModal}>Marca Horários</button>

          <button id="Cadastrar4" type="button" className="btn btn-light" onClick={handleConfirm}>Cadastrar</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
            <h1 id="titulo4">Agendar Horários Disponíveis</h1>
            <select id="horario" value={hora} onChange={e => setHorario(e.target.value)} class="form-select" aria-label="Default select example">
               <option value="">Selecione um horário</option>
                 {horarios}
            </select>
            <select id="data" value={data} onChange={e => setData(e.target.value)} class="form-select" aria-label="Default select example" >
              <option value="">Selecione uma data</option>
                 {datas}
            </select>
            <div id="Endereco2">
            <input type="text" className="form-control" id="inputAddress" placeholder="Local" />
            </div>
            <button id="Cadastrar5" type="button" className="btn btn-light" onClick={closeModal}>Cadastrar</button>
            <button type="button" className="btn btn-light" onClick={closeModal} id="fechar">Fechar</button>
          </div>
      )}

      <div className="line2"></div>
      <footer className="Footer">
        <p>Nome da empresa</p>
        <p>Telefone</p>
        <p>Email de Contato</p>
      </footer>
    </>
  );
}

export default CadastroServico;
