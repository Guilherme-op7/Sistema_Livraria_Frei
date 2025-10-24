import api from '../../api.js'

import Header from '../../components/Header'
import Navegacao from '../../components/Navegacao'
import Bloco from '../../components/LivroBloco'
import ModalRegistrarLivro from '../../components/LivroModal/index.jsx'
import { useState } from 'react'
import { useEffect } from 'react'

function HomePage() {
    const [arr, setArr] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [modal, setModal] = useState(false);

    async function CarregarLivros() {
        const resp = await api.get('/livros')
        console.log(resp.data.Lista)
        setArr(resp.data.Lista);
    }

    useEffect(() => {
        CarregarLivros()
    }, [])

    async function FiltrarLivros() {
        const resp = await api.get('/filtrar/livros', { params: { filtro } })
        const resultados = [...resp.data.Lista]

        setArr(resultados);
    }

    useEffect(() => {
        FiltrarLivros()
    }, [filtro])

    async function AdicionarLivro(novoLivro) {
        const resp = await api.post('/livros', novoLivro)
        await CarregarLivros()
    }

    async function ExcluirLivro(id) {
        try {
            await api.delete(`/livros/${id}`)
            CarregarLivros()
        } catch (err) {
            console.log(err)
            return
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className='flex w-full flex-col gap-15 h-screen p-15'>
                <Navegacao />
                <div className="flex w-full h-20 shadow-2xl gap-10 bg-white items-center p-5 rounded-xl">
                    <div className="flex w-3/4">
                        <input value={filtro} onChange={e => setFiltro(e.target.value)} type="text" placeholder='Buscar por título, autor ou gênero...' className="border p-4 placeholder:text-gray-500 border-black/20 w-full outline-none h-10 rounded-md" />
                    </div>
                    <div className="flex w-1/4 justify-end gap-5">
                        <button className="flex cursor-pointer w-1/2 gap-2 text-black border border-black/20 transition-all bg-white justify-center items-center h-10 rounded-md">Todos os Status</button>
                        <button
                            onClick={() => setModal(true)}
                            className="flex cursor-pointer w-1/2 gap-2 text-white hover:bg-blue-500 transition-all bg-blue-600 justify-center items-center h-10 rounded-md">Adicionar Livro</button>
                    </div>
                </div>

                <div className='flex flex-row gap-5'>
                    {
                        arr.map((dados) => (
                            <Bloco
                                key={dados.id}
                                id={dados.id}
                                titulo={dados.titulo}
                                genero={dados.genero}
                                ano={dados.ano_publicacao.split('T')[0]}
                                autor={dados.autor}
                                status={dados.status}
                                deletar={ExcluirLivro}
                            />
                        ))
                    }
                </div>
            </div>

            <ModalRegistrarLivro
                aberto={modal}
                salvar={AdicionarLivro}
                fechado={() => setModal(false)
                } />
        </div>
    )
}

export default HomePage
