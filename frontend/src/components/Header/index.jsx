import frei from '../../assets/images/frei.png'
import { CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom';

export default function index() {
    return (
        <div className="flex bg-blue-500 h-30 w-full items-center">
            <div className="flex h-30 w-1/2 p-10 items-center">
                <img src={frei} width={100} height={20} alt="" />
                <div>
                    <h1 className='text-white font-(montserrat) font-medium text-3xl'>Biblioteca Do Frei</h1>
                    <h3 className='text-white font-(montserrat) font-normal text-lg'>Sistema para Gerenciamento de livros e trocas</h3>
                </div>
            </div>
            <div className='flex h-30 w-1/2 items-center justify-end p-10'>
                <Link to={'/'}>
                    <div className='flex items-center justify-center gap-3'>
                        <h1 className='text-white font-(montserrat) mb-1.5 font-medium text-2xl'>Sair</h1>
                        <CiLogout className='text-white text-2xl' />
                    </div>
                </Link>
            </div>
        </div >
    )
}
