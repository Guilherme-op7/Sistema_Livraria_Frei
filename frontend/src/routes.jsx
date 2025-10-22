import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import TrocasPage from './pages/Emprestimos/TrocasPage';
import RotaPrivada from './RotaPrivada';

export default function Navegacao() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />

                <Route 
                    path='/home' 
                    element={
                        <RotaPrivada>
                            <HomePage />
                        </RotaPrivada>
                    } 
                />

                <Route 
                    path='/emprestimos' 
                    element={
                        <RotaPrivada>
                            <TrocasPage />
                        </RotaPrivada>
                    } 
                />
            </Routes>
        </BrowserRouter>
    )
}
