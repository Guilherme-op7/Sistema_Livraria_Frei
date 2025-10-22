import frei from '../../assets/images/frei.png'
import { CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function index() {
    const navigate = useNavigate();
    
    function sair() {
        localStorage.removeItem("email");
        localStorage.removeItem("token");

        navigate('/')
    }


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
                <button onClick={sair} className='text-white font-montserrat mb-1.5 font-medium text-2xl cursor-pointer'>
                    Sair
                </button>
                <CiLogout className='text-white text-2xl' />
            </div>
        </div >
    )
}
