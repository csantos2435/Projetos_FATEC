import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './Pages/Home';
import Funcionario from './Pages/Funcionario';

function RoutesApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/Funcionario/:id' element={<Funcionario/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;