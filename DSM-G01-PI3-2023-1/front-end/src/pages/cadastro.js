import React from 'react';
import '../Styles/cadastro.css';


function Cadastro() {
    

    return(
        <div className="cor">
            <div className="rectangle12"></div>
            <div className="rectangle10"></div>
            <div className="rectangle11">
                <h1 className='cadastro'>CADASTRO</h1>
                <div className="input-group mb-3" id="nomeC">
                <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                <div class="mb-3" id="emaiC">
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                   </div>
               </div>
               <div class="mb-3" id="passwordC">
               <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Senha" />
               </div>
               <div class="mb-3" id="passwordC2">
               <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Confirma Senha" />
               </div>
                 <button id="Cadastrar"type="button" class="btn btn-light">Cadastrar</button>
            </div>
          
        </div>
    )
}

export default Cadastro;