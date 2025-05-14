import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../Styles/StyleCad.css';

const Cadastro = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    const data = {
      name,
      email,
      password
    };

    fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      navigate(`/`)
    })
  };

 return (
    <div className="container">
      <div className="form-container">
        <h1>Cadastro</h1>
        <input type="text" placeholder="Nome de Usuário" value={name} onChange={e => setName(e.target.value)}/>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>
        <button className="btn-cadastrar" onClick={handleConfirm}>Cadastrar</button>
      </div>
    </div>
 );
};

export default Cadastro;
