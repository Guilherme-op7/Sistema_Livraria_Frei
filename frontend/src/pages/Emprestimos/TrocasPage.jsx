import { useState, useEffect } from 'react'
import api from '../../api'
import Header from '../../components/Header'
import Navegacao from '../../components/Navegacao'
import Bloco from '../../components/EmprestimoBloco/index'

export default function TrocasPage() {
    const [array, setArray] = useState([]);
    const [filtro, setFiltro] = useState('');

    async function FiltrarEmprestimos() {
        const response = await api.get('/emprestimos', { params: { filtro } });
        setArray(response.data.resposta);
    }

    useEffect(() => {
        FiltrarEmprestimos();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            FiltrarEmprestimos(filtro);
        }, 300);

        return () => clearTimeout(timeout);
    }, [filtro]);

    return (
        <div className='flex flex-col'>
            <Header />

            <div className='flex justify-between items-center p-14'>
                <Navegacao
                    Livros='bg-white'
                    LivrosTexto='text-black'
                    LivrosHover='hover:bg-gray-300'
                    EmprestimosTexto='text-white'
                    Emprestimos='bg-blue-600'
                    EmprestimosHover='hover:bg-blue-500'
                />

                <button className='px-4 bg-blue-500 rounded-md w-40 h-12 text-white hover:bg-blue-400 cursor-pointer '>
                    Novo Empréstimo
                </button>
            </div>

            <div className='bg-white rounded-2xl shadow-2xl px-6 py-6 mx-13 mb-6'>
                <h3 className='text-3xl font-medium p-3 text-left'>Buscar Empréstimos</h3>
                <input
                    type="text"
                    placeholder='Buscar por Título ou Nome de Usuário'
                    className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1'
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
            </div>

            <div className='' >
                {array.map((dados) => (
                    <Bloco
                        key={dados.id}
                        titulo={dados.titulo}
                        autor={dados.autor}
                        ano={dados.ano}
                        genero={dados.genero}
                        status={dados.status}
                        nome_aluno={dados.nome_aluno}
                        turma={dados.turma}
                        data_emprestimo={dados.data_emprestimo}
                        data_prevista_devolucao={dados.data_prevista_devolucao}
                    />
                ))}
            </div>
        </div>
    );
}
