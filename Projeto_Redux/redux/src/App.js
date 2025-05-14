import React, { useState } from "react";
import './App.css'

import Desafio from "./components/Desafio";
import Numero from "./components/Numero";
import Propriedades from "./components/Propriedades";
import Sorteio from "./components/Sorteio";
import Recesso from "./components/Recesso";

function App(){

  return (
    <div className="App">
      <h1>PROJETO AVALIATIVO REACT-REDUX 2º BIMESTRE</h1>
      
      <div className="linha">
        <Desafio></Desafio>
      </div>

      <div className="linha">
        <Numero></Numero>
      </div>

      <div className="linha">
        <Propriedades
          titulo='QUAL SUA NOTA?'
          aluno='Camilli Ramos Dos Santos'>
        </Propriedades>
      </div>

      <div className="linha">
        <Sorteio></Sorteio>
      </div>

      <div className="linha">
        <Recesso></Recesso>
      </div>

    </div>
  )
}

export default App;
