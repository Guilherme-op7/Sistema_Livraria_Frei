import { useState } from "react";

export default function Bloco({ id, titulo, autor, ano, genero, status: statusInicial, nome_aluno, turma, data_emprestimo, data_prevista_devolucao, StatusClick }) {
  const [status, setStatus] = useState(statusInicial);

  async function StatusClique() {
    if (status === "em andamento" || status === "emprestado") {
      try {
        await StatusClick(id);
        
        setStatus("devolvido");
      } 
      
      catch (err) {
        alert("Erro ao atualizar status: " + err.message);
      }
    }
  }

  const dataEmprestimoFormatada = data_emprestimo
    ? new Date(data_emprestimo).toLocaleDateString("pt-BR")
    : "-";
  const dataDevolucaoFormatada = data_prevista_devolucao
    ? new Date(data_prevista_devolucao).toLocaleDateString("pt-BR")
    : "-";

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden m-12 p-6 flex items-center justify-between hover:shadow-3xl transition-all duration-200">

      <div className="flex flex-col w-3/4">
        <h1 className="font-semibold text-lg truncate text-gray-800">{titulo}</h1>

        <div className="flex gap-4 text-sm text-gray-600 mt-1">
          <span>{autor}</span>
          <span>{ano}</span>
          <span>{genero}</span>
        </div>

        <div className="flex flex-col gap-1 text-sm mt-3 text-gray-700">
          <span>
            <strong>Aluno:</strong> {nome_aluno}
          </span>
          <span>
            <strong>Turma:</strong> {turma}
          </span>
          <span>
            <strong>Data Empréstimo:</strong> {dataEmprestimoFormatada}
          </span>
          <span>
            <strong>Devolução Prevista:</strong> {dataDevolucaoFormatada}
          </span>
        </div>
      </div>

      <div className="flex justify-end w-1/4">
        <button
          onClick={StatusClique}
          disabled={status === "devolvido"}
          className={`px-6 py-3 rounded-md text-sm font-semibold cursor-pointer transition-all ${
            status === "em andamento" || status === "emprestado"
              ? "bg-yellow-400 hover:bg-yellow-500 text-white"
              : "bg-green-500 text-white cursor-not-allowed"
          }`}
        >
          {status === "em andamento" || status === "emprestado"
            ? "Em Andamento"
            : "Devolvido"}
        </button>
      </div>
    </div>
  );
}
