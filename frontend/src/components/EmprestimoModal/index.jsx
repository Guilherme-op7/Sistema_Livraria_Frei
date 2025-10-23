import { useState, useEffect } from 'react'
import api from '../../api'

function ModalRegistrarEmprestimo({ aberto, fechado, salvar }) {
    const [livros, setLivros] = useState([])
    const [idLivro, setIdLivro] = useState('')
    const [nomeAluno, setNomeAluno] = useState('')
    const [turma, setTurma] = useState('')
    const [dataEmprestimo, setDataEmprestimo] = useState('')
    const [dataDevolucao, setDataDevolucao] = useState('')

    async function CarregarLivrosDisponiveis() {
        try {
            const resp = await api.get('/livros')
            const disponiveis = resp.data.Lista.filter(l => l.status.toLowerCase() === 'disponível')
            setLivros(disponiveis)
        }

        catch (err) {
            console.error('Erro ao carregar livros:', err)
        }
    }

    useEffect(() => {
        if (aberto) {
            CarregarLivrosDisponiveis()
        }
    }, [aberto])


    function formatarData(data) {
        const [dia, mes, ano] = data.split('/')
        return `${ano}-${mes}-${dia}`
    }

    async function Validacao() {
        if (!idLivro || !nomeAluno || !turma || !dataEmprestimo || !dataDevolucao) {
            alert('Por favor, preencha todos os campos')
            return
        }

        const novoEmprestimo = {
            id_livro: Number(idLivro),
            nome_aluno: nomeAluno,
            turma,
            data_emprestimo: formatarData(dataEmprestimo),
            data_prevista_devolucao: formatarData(dataDevolucao)
        }

        try {
            await salvar(novoEmprestimo)
            await CarregarLivrosDisponiveis()
            Cancelar()
        }

        catch (err) {
            alert('Erro ao registrar empréstimo: ' + err.message)
        }
    }

    function Cancelar() {
        setIdLivro('')
        setNomeAluno('')
        setTurma('')
        setDataEmprestimo('')
        setDataDevolucao('')
        fechado()
    }

    if (!aberto) return null

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 transform transition-all scale-100 hover:scale-[1.01] duration-200">

                <div className="bg-blue-600 text-white px-6 py-4 rounded-t-2xl shadow-md">
                    <h2 className="text-xl font-semibold">Registrar Empréstimo</h2>
                </div>

                <div className="px-6 py-6 space-y-4">

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Livro</label>
                        <select
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            value={idLivro}
                            onChange={e => setIdLivro(e.target.value)}
                        >
                            <option value="">Selecione um livro</option>

                            {livros.map(dados => (
                                <option key={dados.id} value={dados.id}>
                                    {dados.titulo} - {dados.autor}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Nome do Aluno</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            value={nomeAluno}
                            onChange={e => setNomeAluno(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Turma</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            value={turma}
                            onChange={e => setTurma(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Data Empréstimo</label>
                        <input
                            type="date"
                            placeholder="dd/mm/aaaa"
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            value={dataEmprestimo}
                            onChange={e => setDataEmprestimo(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Data Devolução</label>
                        <input
                            type="date"
                            placeholder="dd/mm/aaaa"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 "
                            value={dataDevolucao}
                            onChange={e => setDataDevolucao(e.target.value)}
                        />
                    </div>

                </div>

                <div className="px-6 py-4 flex gap-3 justify-end bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={Cancelar}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={Validacao}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 shadow-md hover:shadow-lg transition-all"
                    >
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalRegistrarEmprestimo
