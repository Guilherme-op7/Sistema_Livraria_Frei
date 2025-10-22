import frei from '../../assets/images/frei.png'
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    function Sair() {
        localStorage.removeItem("token");
        localStorage.removeItem("email");

        navigate('/')
    }

    return (
        <div className=' flex bg-blue-500 h-30 items-center w-full'>
            <div className='flex h-30 w-1/2 p-10 items-center'>
                <img src={frei} alt="" width={100} height={20} />

                <div>
                    <h1 className='text-white font-medium text-3xl'>Biblioteca do Frei</h1>
                    <h2 className='text-white font-normal text-lg'>Sistema para Gerenciamento de livros e trocas</h2>
                </div>
            </div>
                <div className='flex h-30 w-1/2 items-center justify-end p-10'>
                    <button onClick={Sair} className='text-white font-montserrat mb-1.5 font-medium text-2xl cursor-pointer'>
                        Sair
                    </button>
                    <CiLogout className='text-white text-2xl' />
                </div>
        </div>
    )
}
