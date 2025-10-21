import { Router } from "express";
import { CriarCredenciais, validarCredenciais } from "../repository/UsuarioRepository.js";
import { generateToken, getAuthentication } from '../utils/jwt.js'

const endpoints = Router();

endpoints.post("/admin", async (req, res) => {
    try {
        let dados = req.body;

        let resposta = await CriarCredenciais(dados);
        let id = resposta.insertId;

        res.status(201).send({
            mensagem: "Administrador criado com sucesso!",
            id: id
        });
    }

    catch (err) {
        res.status(401).send({
            erro: err
        });
    }
});

endpoints.post("/admin/login", async (req, res) => {
    try {
        let email = req.body.email;
        let senha = req.body.senha;

        let resposta = await validarCredenciais(email, senha);

        if (!resposta) {
            throw "Credenciais inválidas.";
        }

        res.status(201).send({
            mensagem: "Login realizado com sucesso!",
            token: generateToken(resposta)
        });
    }

    catch (err) {
        res.status(401).send({
            erro: err
        });
    }
});

export default endpoints;
