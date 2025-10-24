import { FaTrashAlt } from "react-icons/fa";

export default function index({ id, deletar, titulo, autor, ano, genero, status }) {
    return (
        <div className="flex flex-col w-70 h-80 rounded-xl shadow-2xl">
            <div className="flex w-all rounded-t-xl h-[50%] bg-gray-200">

            </div>
            <div className="´flex p-5">
                <h1 className="font-medium text-lg">{titulo}</h1>
                <div className="flex gap-4">
                    <h3 className="text-sm">{autor}</h3>
                    <h3 className="text-sm">{ano}</h3>
                </div>
                <div className="flex flex-col mt-3 gap-1 w-[30%]">
                    <button className="bg-green-500 text-white items-center justify-center rounded-md text-xs">{status}</button>
                    <button className="bg-gray-200 items-center justify-center rounded-md text-xs">{genero}</button>
                </div>
                <div className="flex gap-5 mt-3">
                    <button className="flex w-[50%] rounded-md cursor-pointer items-center justify-center bg-gray-200">Editar</button>
                    <button onClick={() => deletar(id)} className="flex w-[50%] rounded-md cursor-pointer items-center justify-center gap-1 text-white bg-red-500"><FaTrashAlt /> Deletar</button>
                </div>
            </div>

        </div>
    )
}
