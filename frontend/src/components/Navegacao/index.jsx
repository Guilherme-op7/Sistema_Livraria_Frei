import { IoBookOutline } from "react-icons/io5";
import { FaExchangeAlt } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function index({ Livros = "bg-blue-600", LivrosTexto = "text-white", LivrosHover = "hover:bg-blue-500", Emprestimos = "bg-white", EmprestimosTexto = "text-black", EmprestimosHover = "hover:bg-gray-300" }) {
    return (
        <div className='flex items-center justify-center shadow-2xl gap-5 p-5 w-110 h-20 rounded-xl'>
            <Link to={'/Home'}>
                <button className={`flex cursor-pointer transition-all gap-2 ${LivrosTexto} ${LivrosHover} transition-all ${Livros} justify-center items-center w-30 h-10 rounded-md`}><IoBookOutline className="" /><h1 className="flex font-medium">Livros</h1></button>
            </Link>
            <Link to={'/Emprestimos'}>
                <h1 className={`flex items-center ${EmprestimosTexto} transition-all ${EmprestimosHover} cursor-pointer justify-center gap-2 font-medium w-60 rounded-md h-10 ${Emprestimos}`}><FaExchangeAlt className="mt-1" />Trocas e Empréstimos</h1>
            </Link>
        </div>
    )
}
