import { Router } from "express";

import { getAuthentication } from "../utils/jwt.js";
import { ListarEmprestimos, InserirEmprestimo, MarcarComoDevolvido, DeletarTodosEmprestimos } from "../repository/EmprestimosRepository.js";

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.get('/emprestimos', autenticador, async (req, res) => {
    try {
        let filtro = req.query.filtro; 

        let resposta = await ListarEmprestimos(filtro);

        res.status(200).json({ resposta });
    }

    catch (err) {
        res.status(500).json({
            erro: err.message
        });
    }
});

endpoints.post('/emprestimos', autenticador, async (req, res) => {
    try {
        let resposta = await InserirEmprestimo(req.body);

        res.status(200).json(resposta);
    } 
    
    catch (err) {
        res.status(400).json({ erro: err.message });
    }
});


endpoints.put('/emprestimos/:id/devolvido', autenticador, async (req, res) => {
    try {
        let id = req.params.id;

        if (!id) {
            return res.status(400).send({ erro: "ID do empréstimo não informado." });
        }

        let resposta = await MarcarComoDevolvido(id);

        res.status(200).send({
            mensagem: "Empréstimo marcado como devolvido com sucesso!",
            resposta: resposta
        });
    } 
    
    catch (err) {
        res.status(400).send({
            erro: err.message
        });
    }
});

endpoints.delete('/emprestimos', autenticador, async (req, res) => {
    try {
        let resposta = await DeletarTodosEmprestimos();

        res.status(200).json({
            mensagem: "Todos os empréstimos foram excluídos com sucesso!",
            resposta
        });
    } 

    catch (err) {
        res.status(500).json({
            erro: err.message
        });
    }
});

export default endpoints;