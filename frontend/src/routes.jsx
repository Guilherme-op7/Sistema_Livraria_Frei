import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'
import Emprestimos from './pages/Emprestimos'
import NotFound from './pages/NaoEncontrado'

export default function Navegacao() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Login' element={<Cadastro />} />
                <Route path='/Emprestimos' element={<Emprestimos />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}