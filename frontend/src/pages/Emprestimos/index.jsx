import Header from '../../components/Header'
import Navegacao from '../../components/Navegacao'

export default function index() {
    return (
        <div className='flex flex-col'>
                <Header />
            <div className='flex p-15'>
                <Navegacao 
                Livros='bg-white'
                LivrosTexto='text-black'
                LivrosHover='hover:bg-gray-300'
                EmprestimosTexto='text-white'
                Emprestimos='bg-blue-600'
                EmprestimosHover='hover:bg-blue-500'
                />
            </div>

            <div>
                <div >

                </div>
            </div>
        </div>
    )
}
