import { useState } from "react";

export default function Bloco({ id, titulo, autor, ano, genero, status: statusInicial, nome_aluno, turma, data_emprestimo, data_prevista_devolucao, StatusClick }) {
  const [status, setStatus] = useState(statusInicial);

  async function StatusClique() {
    if (status === "em andamento") {
      try {
        await StatusClick(id);
        setStatus("devolvido");
      } 
      
      catch (err) {
        alert("Erro ao atualizar status: " + err.message);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden m-12 p-6 flex items-center ">
      <div className="flex flex-col w-3/4">
        <h1 className="font-semibold text-lg truncate">{titulo}</h1>

        <div className="flex gap-4 text-sm text-gray-600 mt-1">
          <span>{autor}</span>
          <span>{ano}</span>
          <span>{genero}</span>
        </div>

        <div className="flex flex-col gap-1 text-sm mt-3">
          <span><strong>Aluno:</strong> {nome_aluno}</span>
          <span><strong>Turma:</strong> {turma}</span>
          <span><strong>Data Empréstimo:</strong> {data_emprestimo}</span>
          <span><strong>Devolução Prevista:</strong> {data_prevista_devolucao}</span>
        </div>
      </div>

      <div className="flex justify-end w-1/4">
        <button
          onClick={StatusClique}
          className={`px-6 py-3 rounded-md text-sm font-semibold cursor-pointer ${status === "em andamento"
              ? "bg-yellow-400 text-white"
              : "bg-green-500 text-white"
            }`}
        >
          {status}
        </button>
      </div>
    </div>
  );
}
