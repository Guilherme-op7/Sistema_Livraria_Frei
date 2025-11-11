import api from '../../api.js';
import Header from '../../components/Header';
import Navegacao from '../../components/Navegacao';
import Bloco from '../../components/LivroBloco';
import ModalRegistrarLivro from '../../components/LivroModal';
import EditarLivroModal from '../../components/LivroEditarModal';
import ModalExcluirLivro from '../../components/LivroExcluirModal';
import { useState, useEffect } from 'react';

function HomePage() {
  const [arr, setArr] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [status, setStatus] = useState('todos')
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [excluir, setExcluir] = useState(false);
  const [selecionado, setSelecionado] = useState('');

  async function CarregarLivros() {
    try {
      const resp = await api.get('/livros');
      setArr(resp.data.Lista);
    } catch (err) {
      console.error('Erro ao carregar livros:', err);
    }
  }

  useEffect(() => {
    CarregarLivros();
  }, []);

  async function FiltrarLivros() {
    try {
      const resp = await api.get('/filtrar/livros', { params: { filtro } });
      setArr(resp.data.Lista);
    }

    catch (err) {
      console.error('Erro ao filtrar livros:', err);
    }
  }

  useEffect(() => {
    FiltrarLivros();
  }, [filtro]);

  async function AdicionarLivro(novoLivro) {
    await api.post('/livros', novoLivro);

    await CarregarLivros();
  }

  async function ExcluirLivro(id) {
    try {
      await api.delete(`/livros/${id}`);

      CarregarLivros();
    }

    catch (err) {
      console.log(err);

      return;
    }
  }

  async function EditarLivro(dados, id) {
    try {
      await api.put(`/livros/${id}`, dados);

      await CarregarLivros();

      setEditando(false);
    }

    catch (err) {
      alert(err.message);
    }
  }

  async function AbrirModal(dados) {
    setSelecionado(dados);
    setEditando(true);
  }

  async function AbrirModalExcluir(id) {
    setSelecionado(id);
    setExcluir(true);
  }

  function AlterarStatus() {
    if (status === "todos") setStatus("disponível");
    else if (status === "disponível") setStatus("emprestado");
    else if (status === "emprestado") setStatus("indisponível");
    else setStatus("todos");
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex w-full flex-col gap-15 h-screen p-15">
        <Navegacao />

        <div className="flex w-full h-20 shadow-2xl gap-10 bg-white items-center p-5 rounded-xl">
          <div className="flex w-3/4">
            <input
              value={filtro}
              onChange={e => setFiltro(e.target.value)}
              type="text"
              placeholder="Buscar por título, autor ou gênero..."
              className="border p-4 placeholder:text-gray-500 border-black/20 w-full outline-none h-10 rounded-md"
            />
          </div>
          <div className="flex w-1/4 justify-end gap-5">
            <button
              onClick={AlterarStatus}
              className="flex cursor-pointer w-1/2 gap-2 text-black border border-black/20 transition-all bg-white justify-center items-center h-10 rounded-md"
            >
              {status === "todos"
                ? "Todos os Status"
                : status[0].toUpperCase() + status.substring(1)}
            </button>
            <button
              onClick={() => setModal(true)}
              className="flex cursor-pointer w-1/2 gap-2 text-white hover:bg-blue-500 transition-all bg-blue-600 justify-center items-center h-10 rounded-md"
            >
              Adicionar Livro
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 self-center gap-5 pb-25">
          {arr
            .filter(livro =>
              status === "todos"
                ? true
                : livro.status.toLowerCase() === status
            )
            .map(livro => (
              <Bloco
                key={livro.id}
                id={livro.id}
                titulo={livro.titulo}
                genero={livro.genero}
                imagem={livro.url_capa}
                ano={livro.ano_publicacao.split("T")[0]}
                autor={livro.autor}
                status={livro.status}
                deletar={() => AbrirModalExcluir(livro.id)}
                editar={() => AbrirModal(livro)}
              />
            ))}
        </div>
      </div>

      <ModalRegistrarLivro
        aberto={modal}
        salvar={AdicionarLivro}
        fechado={() => setModal(false)}
      />

      <EditarLivroModal
        aberto={editando}
        salvar={EditarLivro}
        livro={selecionado}
        fechado={() => setEditando(false)}
      />

      <ModalExcluirLivro
        aberto={excluir}
        salvar={ExcluirLivro}
        id={selecionado}
        fechado={() => setExcluir(false)}
      />
    </div>
  );
}

export default HomePage;
