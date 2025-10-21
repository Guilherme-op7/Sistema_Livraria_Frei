import { Router } from "express";

import { getAuthentication } from "../utils/jwt.js";
import { ListarEmprestimos, InserirEmprestimo, ListarEmprestimosAluno, ListarEmprestimosTitulo, MarcarComoDevolvido } from "../repository/EmprestimosRepository.js";

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.get('/emprestimos', autenticador, async (req, res) => {
    try {
        let dados = req.body;

        let resposta = await ListarEmprestimos(dados);

        res.status(200).send({
            resposta: resposta
        })
    }

    catch (err) {
        res.status(401).send({
            erro: err.message
        });
    }
})

endpoints.get('/emprestimos/titulo', autenticador, async (req, res) => {
    try {
        let titulo = req.query.titulo;

        let resposta = await ListarEmprestimosTitulo(titulo);

        res.status(200).send(resposta);
    }

    catch (err) {
        res.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/emprestimos/aluno', autenticador, async (req, res) => {
    try {
        let nome_aluno = req.query.nome_aluno;
        
        let resposta = await ListarEmprestimosAluno(nome_aluno);

        res.status(200).send(resposta);
    }

    catch (err) {
        res.status(400).send({
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