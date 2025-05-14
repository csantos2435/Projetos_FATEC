import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Pesquisa from './pages/Pesquisa';
import Home from './pages/Home';



function RoutesApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/Cadastro/:id' element={<Cadastro/>}/>
                <Route path='/Pesquisa/:id' element={<Pesquisa/>}/>
                <Route path='/Home/:id/:nome' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
    
}

export default RoutesApp;
