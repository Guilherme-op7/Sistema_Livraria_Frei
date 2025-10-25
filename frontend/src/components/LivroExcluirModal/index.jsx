export default function ModalExcluirLivro({ aberto, fechado, salvar, id }) {
    async function Validacao() {
        try {
            await salvar(id)
            console.log(id)
            Cancelar()
        }

        catch (err) {
            console.log(err)
            Cancelar()
        }
    }

    function Cancelar() {
        fechado()
    }

    if (!aberto) return null

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 transform transition-all scale-100 hover:scale-[1.01] duration-200">

                <div className="bg-gray-600 text-white px-6 py-4 rounded-t-2xl shadow-md">
                    <h2 className="text-xl font-semibold">Excluir Livro</h2>
                </div>

                <div className="px-6 py-4 flex gap-3 justify-end bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={Cancelar}
                        className="px-6 py-2 border cursor-pointer border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={Validacao}
                        className="px-6 py-2 bg-red-600 cursor-pointer text-white rounded-md hover:bg-red-500 shadow-md hover:shadow-lg transition-all"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    )
}
