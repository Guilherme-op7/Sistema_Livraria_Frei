import { IoBookOutline } from "react-icons/io5";
import { FaExchangeAlt } from "react-icons/fa";

import Header from '../../components/Header'

function App() {
    return (
        <div className="flex flex-col bg-blue-800 h-screen">
            <Header />
            <div className='flex w-full h-screen p-10'>
                <div className='flex items-center justify-center gap-5 p-5 w-100 h-20 rounded-xl bg-white'>
                    <button className='flex cursor-pointer gap-2 text-white hover:bg-blue-500 transition-all bg-blue-600 justify-center items-center w-30 h-10 rounded-md'><IoBookOutline className="" /><h1 className="flex font-medium">Livros</h1></button>
                    <h1 className="flex cursor-pointer gap-2 font-medium"><FaExchangeAlt className="mt-1"/>Trocas e Empréstimos</h1>
                </div>
            </div>
        </div>
    )
}

export default App
