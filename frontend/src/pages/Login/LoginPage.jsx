import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import frei from "../../assets/images/frei.png";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const usuario = localStorage.getItem("usuario");

        if (usuario) {
            navigate('/home')
        }
    }, [])

    async function Entrar() {
        try {
            const body = {
                email: email,
                senha: senha
            }

            const response = await api.post('/admin/login', body);

            const token = response.data.token;

            localStorage.setItem("token", token);
            localStorage.setItem("email", email);

            navigate('/Home')
        }

        catch (err) {
            alert(err)
        }
    }

    return (
        <div className="bg-blue-800 h-dvh flex justify-center items-center w-full">

            <div className="bg-white rounded-2xl shadow-lg p-12 w-md flex flex-col items-center justify-center">

                <img src={frei} alt="" height={20} width={120} className="m-12" />

                <div className="w-full mb-4 items-center">
                    <label className="text-gray-600 font-medium">Digite seu Email de Acesso</label>
                    <input
                        type="text"
                        placeholder="Digite seu Email de acesso"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                    />
                </div>

                <div className="w-full mb-2 items-center">
                    <label className="text-gray-600 font-medium">Digite sua senha de acesso</label>
                    <input type="text"
                        placeholder="Digite sua senha de acesso"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 mb-5"
                    />
                </div>

                <button onClick={Entrar} className="bg-blue-700 text-white p-3 rounded-md w-full ">Acessar o Sistema</button>

            </div>

        </div>
    )
}
