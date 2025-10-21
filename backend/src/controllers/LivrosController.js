import { AtualizarLivro, CriarLivro, DeletarLivro, ListarLivros, ListarLivrosAutor, ListarLivrosGenero, ListarLivrosTitulo } from '../repository/LivrosRepository.js';
import { getAuthentication } from '../utils/jwt.js';

import { Router } from 'express';

const endpoints = Router();

const autenticador = getAuthentication();

endpoints.get('/livros', autenticador, async (req, res) => {
    try {
        let dados = req.body;

        let resposta = await ListarLivros(dados);


        res.status(200).send({
            Lista: resposta
        });
    }

    catch (err) {
        res.status(401).send({
            erro: err
        });
    }
})

endpoints.get('/filtrar/livros/titulo', autenticador, async (req, res) => {
    try {
        let titulo = req.query.titulo;

        let resposta = await ListarLivrosTitulo(titulo);

        res.status(200).send({
            Lista: resposta
        })
    }

    catch (err) {
        res.status(401).send({
            erro: err
        });
    }
})

endpoints.get('/filtrar/livros/autor', autenticador, async (req, res) => {
    try {
        let autor = req.query.autor;

        let resposta = await ListarLivrosAutor(autor);

        res.status(200).send({
            Lista: resposta
        })
    }

    catch (err) {
        res.status(401).send({
            erro: err
        });
    }
})

endpoints.get('/filtrar/livros/genero', autenticador, async (req, res) => {
    try {
        let genero = req.query.genero;

        let resposta = await ListarLivrosGenero(genero);

        res.status(200).send({
            Lista: resposta
        })
    }

    catch (err) {
        res.status(401).send({
            erro: err
        });
    }
})

endpoints.post('/livros', autenticador, async (req, res) => {
    try {
        let dados = req.body;

        let resposta = await CriarLivro(dados);

        let id = resposta.insertId;

        res.status(200).send({
            mensagem: "Livro Criado com Sucesso!",
            id: id
        })
    }

    catch (err) {
        res.status(401).send({
            erro: err
        });
    }
})

endpoints.put('/livros/:id', autenticador, async (req, res) => {
    try {
        let dados = req.body;
        let id = req.params.id;

        let resposta = await AtualizarLivro(dados, id);

        let LinhasAfetadas = resposta.affectedRows;

        res.status(200).send({
            mensagem: "Livro Atualizado com sucesso!",
            LinhasAfetadas: LinhasAfetadas
        })
    }

    catch (err) {
        res.status(401).send({
            erro: err
        });
    }
})

endpoints.delete('/livros/:id', autenticador, async (req, res) => {
    try {
        let id = req.params.id;

        let resposta = await DeletarLivro(id);

        let LinhasAfetadas = resposta.affectedRows;

        res.status(200).send({
            mensagem: "Livro Deletado com Sucesso!",
            LinhasAfetadas: LinhasAfetadas
        })
    }

    catch (err) {
        res.status(401).send({
            erro: err
        });
    }
})

export default endpoints;