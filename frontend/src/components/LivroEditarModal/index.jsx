import { useEffect, useState } from "react"

export default function EditarLivroModal({ aberto, fechado, salvar, livro }) {
    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [genero, setGenero] = useState('')
    const [ano_publicacao, setAnoPublicacao] = useState('')
    const [urlcapa, setUrlCapa] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        if (livro) {
            setTitulo(livro.titulo || '')
            setAutor(livro.autor || '')
            setGenero(livro.genero || '')
            setAnoPublicacao(livro.ano_publicacao?.split('T')[0] || '')
            setUrlCapa(livro.url_capa || '')
            setStatus(livro.status || '')
        }
    }, [livro])

    async function Validacao() {
        if (!titulo || !autor || !genero || !ano_publicacao || !urlcapa || !status) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        const novoLivro = {
            titulo: titulo,
            autor: autor,
            genero: genero,
            ano_publicacao: ano_publicacao,
            url_capa: urlcapa,
            status: status
        }

        try {
            await salvar(novoLivro, livro.id)
            Cancelar()
        }

        catch (err) {
            alert('Erro ao alterar informações: ' + err.message)
        }
    }

    function Cancelar() {
        fechado()
    }

    if (!aberto) return null

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 transform transition-all scale-100 hover:scale-[1.01] duration-200">

                <div className="bg-blue-600 text-white px-6 py-4 rounded-t-2xl shadow-md">
                    <h2 className="text-xl font-semibold">Editar Livro</h2>
                </div>

                <div className="px-6 py-6 space-y-4">

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Título</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                            className='w-full border border-gray-300 rounded-md px-3 py-2'
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Autor</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            value={autor}
                            onChange={e => setAutor(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-row w-full gap-13'>
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">Gênero</label>
                            <select value={genero} onChange={e => setGenero(e.target.value)} className='w-51 border border-gray-300 rounded-md px-3 py-2' name="Escolha" id="escolha">
                                <option>Aventura</option>
                                <option>Biografia</option>
                                <option>Conto</option>
                                <option>Crônica</option>
                                <option>Fábula</option>
                                <option>Fantasia</option>
                                <option>Poesia</option>
                                <option>Romance</option>
                                <option>Outro</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-2">Ano de publicação</label>
                            <input
                                type="date"
                                className="flex w-52 border border-gray-300 rounded-md px-3 py-2"
                                value={ano_publicacao}
                                onChange={e => setAnoPublicacao(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">URL da Capa</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            value={urlcapa}
                            onChange={e => setUrlCapa(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Status</label>
                        <select value={status} onChange={e => setStatus(e.target.value)} className='w-full border border-gray-300 rounded-md px-3 py-2'>
                            <option>disponível</option>
                            <option>emprestado</option>
                            <option>indisponível</option>
                        </select>
                    </div>

                </div>

                <div className="px-6 py-4 flex gap-3 justify-end bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={Cancelar}
                        className="px-6 py-2 border cursor-pointer border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={Validacao}
                        className="px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-500 shadow-md hover:shadow-lg transition-all"
                    >
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    )
}
