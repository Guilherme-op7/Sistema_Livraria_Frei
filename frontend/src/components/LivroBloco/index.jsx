import { FaTrashAlt } from "react-icons/fa";

export default function LivroBloco({ id, editar, deletar, titulo, autor, ano, genero, status, imagem }) {
  return (
    <div className="flex flex-col w-72 h-80 rounded-xl shadow-xl bg-white hover:scale-105 transition-transform">

      <div className="flex w-full h-[50%] overflow-hidden rounded-t-xl bg-gray-100">
        <img
          src={imagem || "/placeholder.png"}
          alt={titulo}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col p-4 gap-2 flex-1">
        <h1 className="font-semibold text-lg truncate">{titulo}</h1>
        <div className="flex justify-between text-sm text-gray-700">
          <span>{autor}</span>
          <span>{ano}</span>
        </div>

        <div className="flex flex-col mt-2 gap-2">
          <span
            className="text-white text-center rounded-md text-sm py-1 font-medium"
            style={{
              backgroundColor:
                status === "disponível"
                  ? "#22c55e" 
                  : status === "emprestado"
                  ? "#eab308" 
                  : status === "indisponível"
                  ? "#ef4444" 
                  : "#9ca3af", 
            }}
          >
            {status}
          </span>

          <span className="bg-gray-200 text-center rounded-md text-xs py-1 text-gray-800">
            {genero}
          </span>
        </div>

        <div className="flex gap-3 mt-auto">
          <button
            onClick={() =>
              editar({
                id,
                titulo,
                autor,
                genero,
                ano_publicacao: ano,
                status,
              })
            }
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-sm py-1 rounded-md"
          >
            Editar
          </button>

          <button
            onClick={() => deletar(id)}
            className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded-md"
          >
            <FaTrashAlt /> Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
