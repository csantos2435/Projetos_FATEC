import React, { useState } from 'react';
import '../Styles/Style.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${email}`);
      const data = await response.json();

      if (response.ok) {
        if (data.password === password) {
          navigate(`Pesquisa/2`);
        } else {
          alert('Senha incorreta');
        }
      } else {
        alert('Usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  return (
    <div className="App">
      <div className="LoginScreen">
        <h1>Login</h1>
        <form>
          <input
            type="email"placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/><input
            type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleConfirm}>Entrar</button>
        </form>
        <button>
          <Link to="Cadastro/1" className="LinkWithoutUnderline">Novo Cadastro</Link>
        </button>
      </div>
    </div>
  );
}

export default App;
