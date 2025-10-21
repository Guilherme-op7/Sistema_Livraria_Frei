import UsuarioController from './controllers/UsuarioController.js'
import LivrosController from './controllers/LivrosController.js'
import EmprestimosController from './controllers/EmprestimosController.js'
export function Roteamento(server) {
    server.use(UsuarioController)
    server.use(LivrosController)
    server.use(EmprestimosController)
}