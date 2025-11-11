import { useState, useEffect } from 'react';
import api from '../../api';
import Header from '../../components/Header';
import Navegacao from '../../components/Navegacao';
import Bloco from '../../components/EmprestimoBloco';
import ModalRegistrarEmprestimo from '../../components/EmprestimoModal';

export default function TrocasPage() {
    const [array, setArray] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [ModalAberto, setModalAberto] = useState(false);

    async function FiltrarEmprestimos(valor = filtro) {
        try {
            const response = await api.get('/emprestimos', { params: { filtro: valor } });
            setArray(response.data.resposta);
        } 
        
        catch (err) {
            console.error('Erro ao listar empréstimos:', err);
        }
    }

    async function RegistrarEmprestimo(novoEmprestimo) {
        try {
            await api.post('/emprestimos', novoEmprestimo);

            await FiltrarEmprestimos();

            alert('Empréstimo registrado com sucesso!');
        } 
        
        catch (err) {
            alert('Erro ao registrar empréstimo: ' + err.message);
        }
    }

    async function AtualizarStatus(id) {
        try {
            await api.put(`/emprestimos/${id}/devolvido`);

            await FiltrarEmprestimos();

            alert('Livro marcado como devolvido!');
        } 

        catch (err) {
            alert(err.message);
        }
    }

    async function DeletarTodosEmprestimos() {
        if (!window.confirm("Tem certeza que deseja excluir todos os empréstimos? Essa ação não pode ser desfeita!"))
            return;

        try {
            await api.delete('/emprestimos');

            await FiltrarEmprestimos();

            alert('Todos os empréstimos foram excluídos com sucesso!');
        } 
        
        catch (err) {
            alert('Erro ao excluir empréstimos: ' +err.message);
        }
    }

    useEffect(() => {
        FiltrarEmprestimos();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            FiltrarEmprestimos(filtro);
        }, 400);
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

                <div className="flex gap-4">
                    <button
                        onClick={() => setModalAberto(true)}
                        className="px-5 bg-blue-600 hover:bg-blue-500 transition-all rounded-lg w-48 h-12 text-white font-medium shadow-md"
                    >
                        Novo Empréstimo
                    </button>

                    <button
                        onClick={DeletarTodosEmprestimos}
                        className="px-5 bg-red-500 hover:bg-red-400 transition-all rounded-lg w-40 h-12 text-white font-medium shadow-md"
                    >
                        Excluir Todos
                    </button>
                </div>
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

            <div>
                {array.map((dados) => (
                    <Bloco
                        key={dados.id}
                        id={dados.id}
                        titulo={dados.titulo}
                        autor={dados.autor}
                        ano={dados.ano}
                        genero={dados.genero}
                        status={dados.status}
                        nome_aluno={dados.nome_aluno}
                        turma={dados.turma}
                        data_emprestimo={dados.data_emprestimo}
                        data_prevista_devolucao={dados.data_prevista_devolucao}
                        StatusClick={AtualizarStatus}
                    />
                ))}
            </div>

            <ModalRegistrarEmprestimo
                aberto={ModalAberto}
                fechado={() => setModalAberto(false)}
                salvar={RegistrarEmprestimo}
            />
        </div>
    );
}
