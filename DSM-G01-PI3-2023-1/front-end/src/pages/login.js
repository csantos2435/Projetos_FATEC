import React from 'react';
import '../Styles/login.css';
import { Link } from 'react-router-dom';



function Login() {
    return (
    <div className="cor-login">
        <div className="rectangle2"></div>
        <div className="rectangle7"></div>
        <div className="rectangle3">
          <h1 className="login">LOGIN</h1>
          <div className="mb-3" id="email">
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
          <div className="mb-3" id="password">
            <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Senha" />
          </div>
          <button id="entrar" type="button" class="btn btn-light">
            <Link to='Home/6' className='nav-link'>ENTRAR</Link></button>
          <Link to='cadastro/1' className='nav-link'id="new-registration">Novo Cadastro</Link>
        </div>
      </div>
    );
  }
  
  export default Login;
  