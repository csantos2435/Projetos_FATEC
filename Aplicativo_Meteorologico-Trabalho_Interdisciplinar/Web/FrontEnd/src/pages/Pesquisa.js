import React, { useState } from 'react';
import '../Styles/Pesquisa.css';
import lupa from '../lupa.svg';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [cities, setCity] = useState('');

  const handleGetCity = async ()=> {
    if (cities !== ''){
      navigate(`/Home/3/${cities}`);
    }else {
      alert('Informe sua cidade atual!');
    }
  };

  return (
    
    <div class="pesqui">
      <h1 className='title'>Informe a sua localização atual</h1>
        <div class="search-box">
            <input type="text" class="search-txt" placeholder="Pesquisar" value={cities} onChange={e => setCity(e.target.value)}/>
            <img src={lupa} alt="Descrição da Imagem" height={20} width={20} class="search-bnt" onClick={handleGetCity}/>
        </div>
    </div>
  );
};

export default SearchBar;
