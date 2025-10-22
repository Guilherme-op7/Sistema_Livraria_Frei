import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import frei from "../../assets/images/frei.png";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const usuario = localStorage.getItem("usuario");

        if (usuario) {
            navigate('/Home');
        }
    }, []);


    async function entrar() {
        try {
            const body = {
                email: email,
                senha: senha
            };

            const response = await api.post('/admin/login', body);

            const token = response.data.token;

            localStorage.setItem("token", token);
            localStorage.setItem("email", email);

            navigate('/Home');

        }

        catch (error) {
            alert(error)
        }
    }


    return (
        <div className="flex justify-center items-center w-screen h-screen bg-blue-700">
            <div className="bg-white rounded-2xl shadow-lg p-12 w-130 flex flex-col items-center">

                <img src={frei} alt="Logo Frei" width={140} height={20} className="m-10" />

                <form className="w-full">
                    <div className="w-full mb-8">
                        <label className="block font-semibold">E-mail de acesso</label>
                        <input
                            type="text"
                            placeholder="Seu e-mail de acesso"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                        />
                    </div>

                    <div className="w-full mb-6">
                        <label className="block font-semibold">Digite sua senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                        />
                    </div>

                    {erro && (
                        <p className="text-red-600 text-center mb-4">{erro}</p>
                    )}

                    <button
                        onClick={entrar}
                        type="button"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all"
                    >
                        Acessar Sistema
                    </button>

                </form>
            </div>
        </div>
    );
}
