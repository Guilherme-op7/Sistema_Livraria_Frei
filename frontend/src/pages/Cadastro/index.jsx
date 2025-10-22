import api from '../../api.js'

import frei from '../../assets/images/frei.png'

import { useState } from "react"
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [desabilitado, setDesabilitado] = useState(false);
    const navigate = useNavigate();

    const credenciais = {
        "nome": nome,
        "email": email,
        "senha": senha
    }

    function Enter(e) {
        if (e.key === 'Enter')
            CadastrarAdmin();
    }

    async function CadastrarAdmin() {
        if (!nome || !email || !senha) {
            alert("Credenciais inválidas!") // vou adicionar um modal de erro aqui
            setDesabilitado(false)
            return;
        }

        try {
            await api.post('/admin', credenciais)
            alert("Admin Cadastrado com sucesso!")
            setDesabilitado(true)
            navigate('/Login');
        }

        catch (err) {
            console.log(err)
            setDesabilitado(false)
            return;
        }
    }

    return (
        <div className="flex items-center justify-center flex-col w-full h-screen gap-2 bg-blue-500">

            <div className='flex bg-white p-6 flex-col w-100 h-120 justify-center rounded-2xl'>
                <img className='flex self-center' src={frei} width={100} height={30} alt="" />
                <label className='flex font-medium text-gray-700'>Nome:</label>
                <input className="border-1 outline-none p-2 border-blue-200 w-full rounded-md h-10" onKeyUp={Enter} type="text" value={nome} onChange={e => setNome(e.target.value)} />
                <label className='flex font-medium text-gray-700'>Email de acesso:</label>
                <input className="border-1 w-full p-2 outline-none border-blue-200 rounded-md h-10" onKeyUp={Enter} type="text" value={email} onChange={e => setEmail(e.target.value)} />
                <label className='flex font-medium text-gray-700'>Senha:</label>
                <input className="border-1 w-full p-2 outline-none border-blue-200 rounded-md h-10" onKeyUp={Enter} type="text" value={senha} onChange={e => setSenha(e.target.value)} />

                <button disabled={desabilitado} className="border-1 border-none bg-blue-700 text-white h-10 cursor-pointer w-full rounded-md mt-3 hover:bg-blue-600 transition-all" onClick={CadastrarAdmin}>Login</button>
            </div>

        </div>
    )
}
