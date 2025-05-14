import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Home from './pages/home';
import CadastroFuncionario from './pages/CadastroFuncionario'
import CadastroCliente from './pages/CadastroCliente';
import CadastroServico from './pages/CadastroServico';
import AgendarHorarios from './pages/AgendarHorarios';


function RoutesApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/cadastro/:id' element={<Cadastro/>}/>
                <Route path='/CadastroFuncionario/:id' element={<CadastroFuncionario/>}/>
                <Route path='/CadastroCliente/:id' element={<CadastroCliente/>}/>
                <Route path='/CadastroServico/:id' element={<CadastroServico/>}/>
                <Route path='/AgendarHorario/:id' element={<AgendarHorarios/>}/>
                <Route path='/Home/:id' element={<Home/>}/>

            </Routes>
        </BrowserRouter>
    )
    
}

export default RoutesApp;