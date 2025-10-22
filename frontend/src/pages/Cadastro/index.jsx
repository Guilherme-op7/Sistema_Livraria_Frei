import api from '../../api.js'

import { useState } from "react"
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const credenciais = {
        "nome": nome,
        "email": email,
        "senha": senha
    }

    async function CadastrarAdmin() {

        if (!nome || !email || !senha) {
            alert("Credenciais inválidas!") // vou adicionar um modal de erro aqui
            return;
        }

        try {
            await api.post('/admin', credenciais)
            alert("Admin Cadastrado com sucesso!")
            navigate('/');
        }

        catch (err) {
            console.log(err)
            return;
        }
    }

    return (
        <div className="flex items-center justify-center flex-col w-full h-screen gap-2">

            <label>Nome:</label>
            <input className="border-1" type="text" value={nome} onChange={e => setNome(e.target.value)} />
            <label>Email:</label>
            <input className="border-1" type="text" value={email} onChange={e => setEmail(e.target.value)} />
            <label>Senha:</label>
            <input className="border-1" type="text" value={senha} onChange={e => setSenha(e.target.value)} />

            <button className="border-1 cursor-pointer" onClick={CadastrarAdmin}>Login</button>

        </div>
    )
}
