import { IoBookOutline } from "react-icons/io5";
import { FaExchangeAlt } from "react-icons/fa";

import Header from '../../components/Header'
import Navegacao from '../../components/Navegacao'

function App() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className='flex w-full flex-col gap-15 h-screen p-15'>
                <Navegacao />
                <div className="flex w-all h-20 shadow-2xl gap-10 bg-white items-center p-5 rounded-xl">
                    <div className="flex w-3/4">
                        <input type="text" placeholder='Buscar por título, autor ou gênero...' className="border p-4 placeholder:text-gray-500 border-black/20 w-full outline-none h-10 rounded-md" />
                    </div>
                    <div className="flex w-1/4 justify-end gap-5">
                        <button className="flex cursor-pointer w-1/2 gap-2 text-black border border-black/20 transition-all bg-white justify-center items-center h-10 rounded-md">Todos os Status</button>
                        <button className="flex cursor-pointer w-1/2 gap-2 text-white hover:bg-blue-500 transition-all bg-blue-600 justify-center items-center h-10 rounded-md">Adicionar Livro</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
