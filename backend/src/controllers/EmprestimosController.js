import { Router } from "express";

import { getAuthentication } from "../utils/jwt.js";
import { ListarEmprestimos, InserirEmprestimo, MarcarComoDevolvido } from "../repository/EmprestimosRepository.js";

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.get('/emprestimos', autenticador, async (req, res) => {
    try {
        const filtro = req.query.filtro; 
        const resposta = await ListarEmprestimos(filtro);

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
        const resposta = await RegistrarEmprestimo(req.body);
        res.status(200).send(resposta);
    } 
    
    catch (err) {
        res.status(400).send({ erro: err.message });
    }
});


endpoints.put('/emprestimos/:id/devolvido', autenticador, async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({ erro: "ID do empréstimo não informado." });
        }

        const resposta = await MarcarComoDevolvido(id);

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

export default endpoints;