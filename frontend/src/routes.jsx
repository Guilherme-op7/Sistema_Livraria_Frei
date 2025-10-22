import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login'
import Home from './pages/Home'
import Emprestimos from './pages/Emprestimos'

export default function Navegacao() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Emprestimos' element={<Emprestimos />} />
            </Routes>
        </BrowserRouter>
    )
}