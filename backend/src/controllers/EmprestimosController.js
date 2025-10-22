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
        let dados = req.body;

        let resposta = await InserirEmprestimo(dados);

        res.status(201).send({
            mensagem: 'Empréstimo cadastrado com sucesso', resposta
        });
    }

    catch (err) {
        res.status(400).send({
            erro: err.message
        });
    }
});

endpoints.put('/emprestimos/:id/devolvido', autenticador, async (req, res) => {
    try {
        let id = req.params.id;

        let resposta = await MarcarComoDevolvido(id);

        res.status(200).send(resposta);
    }

    catch (err) {
        res.status(400).send({
            erro: err.message
        });
    }
});

export default endpoints;